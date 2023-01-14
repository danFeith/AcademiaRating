import { hashSync, compareSync } from "bcrypt";
import { Request, Response, NextFunction } from "express"
import { sign } from "jsonwebtoken";
import { roles, users } from "../db/entities/index";
import { ISignUpDetails, ISignInDetails } from "../interfaces/auth.interfaces";
import authConfig from "../config/auth.config";
import refreshTokenRepository from "../repositories/refreshToken.repository";
import userRepository from "../repositories/user.repository";
import roleRepository from "../repositories/role.repository";


export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const signUpDetails: ISignUpDetails = req.body
        const user = userRepository.create(signUpDetails.username, signUpDetails.email, hashSync(signUpDetails.password, 8))

        if (signUpDetails.roles && signUpDetails.roles.length > 0) {
            const selectedRoles = await roleRepository.findByNames(signUpDetails.roles)
            user.roles = selectedRoles
        } else {
            user.roles = await roleRepository.findById(1)
        }
        await userRepository.save(user)
        res.status(200).send({ message: "User was registered successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const signInDetails: ISignInDetails = req.body

        const user = await userRepository.findByUsername(signInDetails.username)
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        if (!compareSync(signInDetails.password, user.password)) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token: string = sign({ id: user.id }, authConfig.secret, {
            expiresIn: authConfig.jwtExpiration,
        });

        const newRefreshToken = await refreshTokenRepository.createToken(user)
        var authorities: string[] = user.roles.map((role: roles) => "ROLE_" + role.name.toUpperCase());

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
            refreshToken: newRefreshToken
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken: requestToken }: { refreshToken: string } = req.body;

    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    const refreshToken = await refreshTokenRepository.getRefreshToken(requestToken)

    if (!refreshToken) {
        return res.status(403).json({ message: "Refresh token is not in database!" });
    }

    if (refreshTokenRepository.verifyExpiration(refreshToken)) {
        refreshTokenRepository.deleteById(refreshToken.id)

        return res.status(403).json({
            message: "Refresh token was expired. Please make a new signin request",
        });
    }

    const user: users = refreshToken.user;
    let newAccessToken = sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.jwtExpiration,
    });

    res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
    });
}
import { TokenExpiredError, verify } from "jsonwebtoken";
import authConfig from "../config/auth.config";
import { Request, Response, NextFunction } from 'express'
import userRepository from "../repositories/user.repository";

const catchTokenError = (err: Error, res: Response) => {

    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }

    res.sendStatus(401).send({ message: "Unauthorized!" });
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers["x-access-token"] as string;

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return catchTokenError(err, res)
        }
        req["userId"] = decoded["id"] //decoded.id;
        next();
    });
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = await userRepository.findById(req["userId"]);

    for (let i = 0; i < user.roles.length; i++) {
        if (user.roles[i].name === "admin") {
            next();
            return
        }
    }

    res.status(403).send({
        message: "Require Admin Role!"
    });
};

const isModerator = async (req: Request, res: Response, next: NextFunction) => {
    const user = await userRepository.findById(req["userId"]);

    for (let i = 0; i < user.roles.length; i++) {
        if (user.roles[i].name === "moderator") {
            next();
            return
        }
    }

    res.status(403).send({
        message: "Require Moderator Role!"
    });
};

const isModeratorOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = await userRepository.findById(req["userId"]);

    for (let i = 0; i < user.roles.length; i++) {
        if (user.roles[i].name === "moderator" || user.roles[i].name === "admin") {
            next();
            return
        }
    }

    res.status(403).send({
        message: "Require Moderator or Admin Role!"
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};

export default authJwt;
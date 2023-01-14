import { Request, Response, NextFunction } from "express"
import userRepository from "../repositories/user.repository";
import { ISignUpDetails } from "../interfaces/auth.interfaces";
import roleRepository from "../repositories/role.repository";

export const checkDuplicateUsernameOrEmail = async (req: Request, res: Response, next: NextFunction) => {
    const signUpDetails: ISignUpDetails = req.body
    if (await userRepository.findByUsername(signUpDetails.username)) {
        return res.status(400).send({
            message: "Failed! Username is already in use!"
        });
    }
    if (await userRepository.findByEmail(signUpDetails.email)) {
        return res.status(400).send({
            message: "Failed! Email is already in use!"
        });
    }
    next()
}

export const checkRolesExisted = async (req: Request, res: Response, next: NextFunction) => {
    let allRolesExists: boolean = true;
    const signUpDetails: ISignUpDetails = req.body
    const requestedRoles: string[] = req.body.roles
    if (signUpDetails.roles) {
        const existingRoleNames: string[] = (await roleRepository.getAllRolesNames()).map(role => role.name)
        for (let i: number = 0; i < requestedRoles.length; i++) {
            if (!existingRoleNames.includes(requestedRoles[i])) {
                allRolesExists = false
                return res.status(400).send({
                    message: "Failed! Role does not exist = " + requestedRoles[i]
                });
            }
        }
    }

    if (allRolesExists) next();
}
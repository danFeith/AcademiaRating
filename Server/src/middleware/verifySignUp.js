import db from "../models/index.js";
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!"
            });
            return;
        }

        // Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use!"
                });
                return;
            }

            next();
        });
    });
};

const checkRolesExisted = async (req, res, next) => {
    let isUnvalidRolesExisted = false;

    if (req.body.roles) {
        await db.role.findAll({ raw: true }).then(roles => {
            const rolesNames = roles.map(r => r.name)
            req.body.roles.forEach(role => {
                if (!rolesNames.includes(role)) {
                    isUnvalidRolesExisted = true
                    res.status(400).send({
                        message: "Failed! Role does not exist = " + role
                    });
                    return
                }
            })
        })
    }

    if (!isUnvalidRolesExisted) next();

};

export default {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};
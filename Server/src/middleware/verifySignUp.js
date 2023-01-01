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
    let allRolesExists = true;

    if (req.body.roles) {
        await db.role.findAll({ raw: true }).then(roles => {
            const rolesNames = roles.map(r => r.name)
            for (let i = 0; i < req.body.roles.length; i++) {
                if (!rolesNames.includes(req.body.roles[i])) {
                    allRolesExists = false
                    res.status(400).send({
                        message: "Failed! Role does not exist = " + req.body.roles[i]
                    });

                }
            }
        })
    }

    if (allRolesExists) next();

};

export default {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};
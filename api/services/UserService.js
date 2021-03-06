const User = require('../models/UserModel');

class UserService {
    // Do not test the middleware
    static async allowUser(req, res, next) {
        const username = req.headers['username'];

        await User.findOne()
            .where("username", username)
            .exec()
            .then(doc => {
                console.log(doc)
                if (!doc) {
                    res.sendStatus(401)
                } else {
                    next();
                }
            })
            .catch(err => {
                res.status(500).json({ "error": err.message })
            });
    }


    // Do not test the middleware
    static async allowAdmin(req, res, next) {
        const username = req.headers['username'];

        await User.findOne()
            .where("username", username)
            .exec()
            .then(doc => {
                console.log(doc)
                if (!doc || doc.role !== "Admin") {
                    res.sendStatus(401)
                } else {
                    next();
                }
            })
            .catch(err => {
                res.status(500).json({ "error": err.message })
            });
    }


    // Do not test the middleware
    static async allowTrainer(req, res, next) {
        const username = req.headers['username'];
        await User.findOne()
            .where("username", username)
            .exec()
            .then(doc => {
                console.log(doc)
                if (!doc || doc.role !== "Trainer") {
                    res.sendStatus(401)
                } else {
                    next();
                }
            })
            .catch(err => {
                res.status(500).json({ "error": err.message })
            });
    }


    // Do not test the middleware
    static async allowLearner(req, res, next) {
        const username = req.headers['username'];
        await User.findOne()
            .where("username", username)
            .exec()
            .then(doc => {
                console.log(doc)
                if (!doc || doc.role !== "Learner") {
                    res.sendStatus(401)
                } else {
                    next();
                }
            })
            .catch(err => {
                res.status(500).json({ "error": err.message })
            });
    }


    static async getUser(username) {
        let success = true;

        try {
            const result = await User.findOne()
                .where("username", username)
                .exec()

            return {
                success,
                result
            }
        } catch (error) {
            console.error(error);
            const result = {
                "error": error.message
            }

            success = false;

            return {
                success,
                result
            };
        }
    }
}

module.exports = UserService;
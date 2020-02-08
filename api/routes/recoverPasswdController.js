'use strict';

const UserModel = require('../models/User');
const moment = require('moment');

// Recovers password by email. Generates email whith link to reset it

class recoverPasswdController {
    
    async recover(req, res, next) {

        try {

            const { email } = req.body;
            const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const user = await UserModel.findOne({ email });
            
            if (!user) {
                res.json({ success: false, error: 'Invalid credentials', });
                return;
            }
            
            const forgotten_password = {
                code: hash,
                time: moment().format()
            }
            user.forgotten_password = forgotten_password;

            const updatedUser = UserModel.update(user);

            const link = `${process.env.APP_ROOT}:${process.env.PORT}/recoverpasswd/${forgotten_password.code}`;
            const recoverPasswdLink = `<br><br><br>To reset your Wallaclone password <a href="${link}">click here</a>`;

            const recoverPasswdEmail = await UserModel.sendEmail(process.env.APP_EMAIL, email, 'Wallaclone recover password', recoverPasswdLink);
            res.json({ success: true });


            // return void
        } catch (err) {
            console.log(err);
            
            next(err);
        }
    }
}

module.exports = new recoverPasswdController();
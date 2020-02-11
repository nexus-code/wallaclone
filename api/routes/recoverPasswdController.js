'use strict';

/**
 * Recovers password by email:
 *  recover: Generates email whith link to reset it
 *  reset: valid key to reset pw and do login
 * That link contains { email, secretStr }
 */ 

const UserModel = require('../models/User');
const moment = require('moment');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';


function encrypt(str) {

    const key = crypto.createCipher(algorithm, process.env.JWT_SECRET);
    let encryptedStr = key.update(str, 'utf8', 'hex')
    encryptedStr += key.final('hex');

    return encryptedStr;
}

function decrypt(str){

    const key = crypto.createDecipher(algorithm, process.env.PW_RECOVER_SECRET);
    let decryptedStr = key.update(str, 'hex', 'utf8')
    decryptedStr += key.final('utf8');
    
    return decryptedStr;
}

function getHash(){
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

class RecoverPasswdController {
    
    async recover(req, res, next) {

        try {

            const { email } = req.body;
            const hash = getHash();
            const user = await UserModel.findOne({ email });
            
            if (!user) {
                res.json({ success: false, error: 'Invalid credentials', });
                return;
            }
            
            const forgotten_password = {
                code: hash,
                time: moment()
            }
            user.forgotten_password = forgotten_password;

            const updatedUser = UserModel.update(user);

            let strLink = JSON.stringify({ email, hash});
            // console.log('\r\n\r\n1', strLink);
            strLink = encrypt(strLink);
            // console.log('\r\n\r\n2', strLink);

            strLink = `${process.env.CLIENT_ROOT}/resetpasswd/${strLink}`;
            // console.log('\r\n\r\n3', strLink);

            strLink = `<br><br><br>To reset your Wallaclone password <a href="${strLink}">click here</a>`;
            console.log('\r\n\r\n4', strLink);

            const recoverPasswdEmail = await UserModel.sendEmail(process.env.APP_EMAIL, email, 'Wallaclone recover password', strLink);
            res.json({ success: true });

            // return void
        } catch (err) {
            console.log(err);
            
            next(err);
        }
    }

    async reset(req, res, next) {

        // console.log('starts RecoverPasswdController.reset', req.body)


        try {

            const { password, recoverKey } = req.body;

            if (!password || !recoverKey){
                // console.log('params error: ', password, recoverKey);
                res.json({ success: false, error: 'Invalid credentials', });
                return;
            }

            const dcrypt = decrypt(recoverKey);

            const recoverObj = JSON.parse(dcrypt)
            if (!recoverObj){
                // console.log('error recoverObj: ', recoverObj);
                res.json({ success: false, error: 'Invalid credentials', });
                return;
            }

            const { email, hash } = recoverObj;

            const user = await UserModel.findOne({ email });

            if (!user || user.forgotten_password.code === '' ) {
                console.log('No user ');
                res.json({ success: false, error: 'Invalid credentials', });
                return;
            }


            // key expires in PW_RECOVER_EXPIRES days
            const _now = moment();          
            if (user.forgotten_password.code !== hash || _now.diff(user.forgotten_password.time, 'days') > process.env.PW_RECOVER_EXPIRES ) {
                console.log('Invalid has or time expired');
                res.json({ success: false, error: 'Invalid credentials', });
                return;
            }

            // all right!!
            user.password = password;
            const updatedUser = UserModel.updateUserPasswd(user);

            // do login:
            const packData = user.packData(updatedUser);
            res.json({ success: true, token: packData.token, result: packData });

            // return void
        } catch (err) {
            console.log(err);
            res.json({ success: false, error: 'Invalid credentials', });

            next(err);
        }
    }
}

module.exports = new RecoverPasswdController();
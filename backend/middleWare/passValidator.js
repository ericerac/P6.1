const passwordValidator = require('password-validator');
const { response } = require('../app');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)
.is().max(15)
.has().uppercase(1)
.has().lowercase()
.has().digits(1)
.has().not().space()
.has().not().symbols()

module.exports = (req, res, next) => {
    if (!passwordSchema.validated){
        return response.json({
        message : "le mot de passe doit contenir entre 8 et 15 caractères dont 1 chiffre et 1 majuscule"
        })
    } else{
        next();
    }

};
const passwordValidator = require('password-validator');
const { response } = require('../app');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)
.is().max(15)
.has().uppercase(1)
.has().lowercase()
.has().digits(1)
.has().not().spaces()
.has().not().symbols()

module.exports = (req, res, next) => {
    if (passwordSchema.validate (req.body.password)){ 
        next()
    }
    else {
        res.status(400).json({
            message: "Le mot de passe doit contenir entre 8 et 20 caractères, dont une majuscule et un chiffre, mais pas de cractères spéciaux"
          });
        
        }
     

};
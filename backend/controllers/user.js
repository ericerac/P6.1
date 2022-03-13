
const bcrypt = require('bcrypt');
const crypto = require('crypto-js');


const User = require('../models/user')
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
    console.log(req.body);
    //const cryptoEmail = crypto.HmacSHA256(req.body.email, `${process.env.CLE_CRYPTO_EMAIL}`).toString();
    bcrypt.hash(req.body.password, 8)  // 8 boucle de hash du password
        .then(hash =>{
            const user = new User({     // schema des données
                email: req.body.email,    // récupère l'email
                password: hash         // encode le password hashage 8 fois
            }); 
            user.save()
            .then(() => res.status(201).json({ message: 'Compte utilisateur crée' }))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


//exports.signup = (req, res, next) => {
//    console.log("controle");
//    bcrypt.hash(req.body.password, 8) // fonction de hachage async, "8" est le nombre de hachage
//      .then(hash => {               // récuprère le hachage
//        const user = new User({     // schema des données
//          email: req.body.email,    // récupère l'email
//          password: hash            // récupère le hachage
//        });
//        user.save()    // sauvegarde la const "user" schema des données
//          .then(() => res.status(201).json({ message: 'Compte utilisateur crée' }))
//          .catch(error => res.status(400).json({ error }));
//      })
//      .catch(error => res.status(500).json({ error }));
//  };



  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // cherche l'utilisateur dans la BDD
      .then(user => {
        if (!user) {                        // si il n'existe pas renvoi l'erreur 401
          return res.status(401).json({ error: ' Compte utilisateur non trouvé !' });
        }
        // bcrypt compare les hash de la requête "1º argument" et de la BDD "2º argument"
        bcrypt.compare(req.body.password, user.password) // boolean
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                  { userId: user._id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '12h' }
                )
              });
          })
          .catch(error => res.status(500).json({ error }));

      })
      .catch(error => res.status(500).json({ error })); // problème de serveur
  };
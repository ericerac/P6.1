
const Sauce = require('../models/sauces');
const fs = require('fs');


exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); // extrait 
    console.log(sauceObject);
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      // génère l'URL de l'image (Http: server images nom)
    });
    console.log(sauce);
    sauce.save()
      .then(() => res.status(201).json({ message: 'Votre sauce a bien été enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauces),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: ' sauce  modifiée '}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) 
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1]; // Pour récuprer le nom du fichier
        // 1-trouver l'URL du fichier 2- sectionner l'Url en deux autour du mot /image/ que contient l'Url
        // 3- Retourne un tableau de deux éléments, avec [1] on garde le deuxième qui est le nom
        fs.unlink(`images/${filename}`, () => { // fonction du pakage fs qui supprime le fichier
          // 1º argument Nom du fichier 2º callback qui supprime l'objet de la BDD
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Votre sauce a été supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };
  
  exports.getAllSauce =(req, res, next) => {
   Sauce.find(req.params.userId)
      .then(salsa => res.status(200).json(salsa))
      .catch(error => res.status(400).json({ error }));
  };

  exports.getOneSauce = (req, res, next) => { // cherche l'id de l'objet dans l'URL
    Sauce.findOne({_id: req.params.id}) // _id =  dans la base de données
                                       // req.params.Id = id de l'URL
      .then(salsa => {
          res.status(200).json(salsa);
        console.log(salsa);
    })
      .catch(error => res.status(404).json({ error }));
  };


 exports.likeSauce =(req, res, next) => {
     console.log("likeSewa");
     
     Sauce.findOne({_id : req.params.id})
     
     .then(salsa =>{
      console.log(req.body.userId)
        let user = req.body.userId;
        let like = (req.body.like);
        let likes = salsa.likes;
        console.log(like);
        console.log(user);
        let UsersLiked = salsa.usersLiked;   //  [salsa.usersLiked] 
        let UsersDisliked = salsa.usersDisliked;  //  [salsa.usersDisliked] 
         
         let usersLiker = UsersLiked.find((l)=> l == user);  // cherche l'user dans le tableau [salsa.usersLiked] 
         let usersDisliker = UsersDisliked.find((d)=> d == user);  // cherche l'user dans le tableau [salsa.usersDisliked] 

         console.log(usersLiker);
         //console.log(usersDisliker);

         if ( like == 1) {   
           if ( usersLiker != undefined){      // si l'user est présent dans le tableau [salsa.usersLiked] 
                                              // ne modifie rien
         } else {  
          salsa.likes ++;                      // si l'user n'est pas présent dans le tableau [salsa.usersLiked] 
          salsa.usersLiked.push(req.body.userId);      // ajoute l'user au tableau [salsa.usersLiked] 
         
         // salsa.UsersLiked = UsersLiked;
         }}

        if ( like == 0)  {
          
          if(usersLiker != undefined){
            usersLiker = UsersLiked.filter((l)=> l != user);         // l'extrait du taleau [salsa.usersLiked]      
            salsa.usersLiked = usersLiker; 
            salsa.likes --;      
          }else{

          };
          if(usersDisliker != undefined){
            usersDisliker = UsersLiked.filter((l)=> l != user);         // l'extrait du taleau [salsa.usersLiked]                  
            salsa.usersDisliked = usersDisliker;                  // redéfini le tableau [salsa.usersLiked] 
            salsa.disliked -- ;                                  // décrémente disliked
          }
        }

        if ( like == -1) {
            
          if ( usersDisliker != undefined){      // si l'user est présent dans le tableau [salsa.usersLiked] 
                                                 // ne modifie rien
        } else {  
                           // si l'user n'est pas présent dans le tableau [salsa.usersLiked] 
         salsa.usersDisliked.push(req.body.userId);      // ajoute l'user au tableau [salsa.usersLiked] 
         salsa.disliked ++;                            // incrémente disliked
        
        }}
     
       console.log(salsa.likes);
       console.log((salsa));
       salsa.save()
       
       res.status(200).json();
     })
     
      .catch(error => res.status(405).json({ error }));
  }

  const liked = ((a,b) => {
return a+b;
  })
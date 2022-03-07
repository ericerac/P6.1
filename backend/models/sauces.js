const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type:String, required:true},
    name:{ type:String, required:true},
    manufacturer:{ type:String, required:true},
    description: { type:String, required:true},
    mainPepper:{ type:String, required:true},
    imageUrl: { type:String, },
    heat:{ type: Number, required:true},
    likes:{type: Number, },
    dislikes:{type: Number},
    usersLiked: [{ type:String}], //<usersId>, tableau des id des utilisateurs qui ont liked
    usersDislaked: [{ type:String}], //<usersId>, tableau des id des utilisateurs qui ont disliked
})

module.exports = mongoose.model('sauces', sauceSchema);
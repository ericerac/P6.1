const dotenv = require('dotenv').config({path:'../../.env'});

const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const passValidator = ('./middleware.passValidator')
const cors = require('cors');
const uuid4 = require('uuid').v4;




// const MY = process.env.DB_EMAIL;
// process.env.DB_PASSWORD = 4;
//  const dbPassWord = process.env.DB_PASSWORD;
//  console.log(dbPassWord,MY);

var corsOptions = {
    origin: 'http://localhost:8081',
    optionsSuccessStatus: 200 
  }

mongoose.connect('mongodb+srv://ericerac:mongoAgogo1@cluster0.quq8c.mongodb.net/hotTakes?retryWrites=true&w=majority',
    {   
    useNewUrlParser: true,
    useUnifiedTopology: true })

  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  

    
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
app.use(cors(corsOptions));

app.use('/images', express.static('images'));
app.use(express.static('images'));


app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes) ;

module.exports = app;
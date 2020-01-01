const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const keys = require('./config/keys.js');

const PORT = process.env.PORT || 5000;

require('./services/mongoDBConnect.js');
require('./models/users.js');
require('./services/passport.js');


const app = express();

// bodyParser middle ware to parse body of model passed to post, put request.
app.use(bodyParser.json());

// middleware to handle cookies
app.use(cookieSession({	maxAge: 30 * 24 * 60 * 60 * 1000, keys: [keys.cookieKey]}));

//User login and authentication
app.use(passport.initialize());
app.use(passport.session());

//Routing logic for our server
require('./routes/authRoutes.js')(app);
require('./routes/billingRoutes.js')(app);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    
    const path = require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

app.listen(PORT)

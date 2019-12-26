const express = require('express');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys.js');
require('./services/mongoDBConnect.js');
require('./models/users.js');
require('./services/passport.js');


const app = express();



app.use(cookieSession({
	maxAge: 30 * 24 * 60 * 60 * 1000,
	keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes.js')(app);

app.listen(PORT)

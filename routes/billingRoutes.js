const keys = require('../config/keys.js');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin.js')


module.exports = (app) =>{ 
    

    app.post('/api/stripe', requireLogin, async (req,res)=>{
        stripe.charges.create({ 
                                amount : 500, 
                                currency : 'usd', 
                                description : 'payment to get 5 credits',
                                shipping: {
                                    name: 'Rahul Singh',
                                    address: {
                                      line1: '510 Townsend St',
                                      postal_code: '234554',
                                      city: 'Chennai',
                                      state: 'TN',
                                      country: 'IND',
                                    }
                                  },
                                source : req.body.id 
                               },
                        async (err,charge)=>{
                            req.user.credits += 5;
                            const user = await req.user.save();
                            res.send(user);
                        });                               
         
        
    });
}


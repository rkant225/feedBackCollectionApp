const requireLogin = require('../middlewares/requireLogin.js');
const requireCredit = require('../middlewares/requireCredit.js');
const mongoose = require('mongoose');
const Mailer = require('../services/mailer.js')
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate.js');

module.exports = (app) => {
    
    app.get('/api/surveys/thanks',(req,res)=>{
        res.send("Thanks for your valuable time and response :)");
    })
    // This routeHandler will send detailes to mailler and if it succeds then it will save survey to DB.
    app.post('/api/surveys', requireLogin, requireCredit, async (req,res)=>{
        const {title, subject, body, emails} = req.body;
        // Crease a survey model
        const survey = new Survey({
            title,
            subject,
            body,
            recipients : emails.split(',').map(email => {return {email : email.trim(), responded : false}}),
            _user : req.user.id,
            dateSent : Date.now()
        });
        
        //Try to send mail
        const template = surveyTemplate(survey);
        const mailer = new Mailer(survey, template);
        try{
            const mailerResponse = await mailer.send();       
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save()        ;
            res.send(user);      
        }
        catch(err){
            res.status(422).send(err);
        }
    });
}

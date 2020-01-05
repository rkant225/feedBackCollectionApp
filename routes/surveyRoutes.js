const _ = require('lodash');
const {Path} = require('path-parser');
const {URL} = require('url');

const requireLogin = require('../middlewares/requireLogin.js');
const requireCredit = require('../middlewares/requireCredit.js');
const mongoose = require('mongoose');
const Mailer = require('../services/mailer.js')
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate.js');

module.exports = (app) => {
    
    // Thanks message to user who responded to our mail
    app.get('/api/surveys/:surveyId/:choice',(req,res)=>{
        res.send("Thanks for your valuable time and response :)");
    })
    
    app.get('/api/surveys', requireLogin, async (req,res)=>{
        const surveys = await Survey.find({ _user : req.user.id })
        .select({ recipients : false})
        
        res.send(surveys);
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
    
    // handle webHook and save click response to db
    app.post('/api/surveys/webhooks', (req,res)=>{
        const P = new Path('/api/surveys/:surveyId/:choice');
        
        _.chain(req.body)
        .map(event =>{
            if(event && event.url){
                const pathName = new URL(event.url).pathname;            
                const matchh = P.test(pathName);
                if(matchh){
                    return {email : event.email, surveyId : matchh.surveyId, choice : matchh.choice};
                }
            }
        })
        .compact()
        .uniqBy('email', 'surveyId')
        .each(event =>{                   
            Survey.updateOne({
                _id : event.surveyId,
                recipients : {
                    $elemMatch :{email : event.email, responded : false}
                }
            }, {
                // new fields
                $inc : { [event.choice] : 1},
                $set : {'recipients.$.responded' : true},
                lastResponded : new Date()
            }).exec()
                    
        })
        .value();
        
        // -- evevts---
        //[{
        //     email: 'rkant225@gmail.com',
        //     surveyId: '5e1204625c11870dcb45469e',
        //     choice: 'yes'
        // }]
        
        
        //now we have to incriment YES or NO property
        //of survey Model, which have above mail and RESPONDED property
        //as false.
        
        res.send({});
        
    })
}





















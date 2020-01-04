const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys.js');

class Mailer extends helper.Mail{
    constructor(survey,template){
        super();
        
        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@organization.com');
        this.subject = survey.subject;
        this.body = new helper.Content('text/html',template);
        this.recipients = this.formatEmailAddresses(survey.recipients); // now recipients will become helper object.
        
        //Adding content to body 
        this.addContent(this.body); // provided by sendGrid.
        
        // Enabling click tracking
        this.addClickTracking(); // helper method we defined
        
        // Adding recipients
        this.addRecipients(); // helper method we defined
    }
    
    
    formatEmailAddresses(recipients){
        return recipients.map(recipient => new helper.Email(recipient.email));
    }
    
    
    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true,true);
        
        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);        
    }
    
    
    addRecipients(){
        const personalize = new helper.Personalization();
        
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }
    
    async send(){
        const request = this.sgApi.emptyRequest({
            method : 'POST',
            path : '/v3/mail/send',
            body : this.toJSON()
        });
        
        const response =await this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;

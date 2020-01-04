// this will return some <html> data to caller.

const keys = require('../../config/keys.js');

module.exports = (survey) => {
    return `
        <html>
            <body>
                 <div style="text-align : center;">
                    <h3>We wanted some input from your end.</h3>
                    <p>${survey.body}</p>                    
                    <div>
                       <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
                    </div>
                    <div>
                       <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
                    </div>
                 </div>
            </body>
        </html>
    `;
}

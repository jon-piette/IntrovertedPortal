const moment = require('moment');

function formatMessage(firstName, text) {
    return{
        firstName,
        text,
        time: moment().format('h:mm a')
    };
}

module.exports = formatMessage;
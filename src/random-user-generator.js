const rp = require('request-promise');
const _s = require('underscore.string');

async function getRandomUserInfo() {
    try {
        let response = await rp.get({
            method: 'GET',
            uri: 'https://randomuser.me/api/',
            json: true
        });
        
        return response.results[0];
    } catch (error) {
        console.error(error);
    }
}

function capitalize(str) {
    return _s(str).trim().capitalize().value();
}

async function getParsedRandomUser() {
    try {
        let randomUserInfo = await getRandomUserInfo();
        if (randomUserInfo) {
            let { email } = randomUserInfo;
            let { first: firstName, last: lastName } = randomUserInfo.name;
            let { age } = randomUserInfo.dob;
            return { firstName: capitalize(firstName),
                     lastName: capitalize(lastName), 
                     email, 
                     age };
        }
        else {
            return null;
        }
    } catch (error) {
        console.error(error);   
    }
}

module.exports = {
    getParsedRandomUser
}
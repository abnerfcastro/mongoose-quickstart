const mongoose = require('mongoose');
const generator = require('./random-user-generator');

function onMongooseConnectionError(err) {
    if (err) console.error(err);
    else console.log('Connected to mongodb ')
}

mongoose.connect('mongodb://localhost:27017/mongoose-person-test', { useNewUrlParser: true }, onMongooseConnectionError);

// Creating a Schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number
});

userSchema.methods.greet = function () {
    let greeting = `Hi, my name is ${this.firstName} ${this.lastName}. I am ${this.age} years old. Nice to meet you.`;
    console.log(greeting);
}

const User = mongoose.model('User', userSchema);
// -------------------

async function saveOnMongoDatabase(instance) {
    return await instance.save();
}

(async function () {
    try {
        let userInfo = await generator.getParsedRandomUser();
        if (userInfo) {            
            let savedUser = await saveOnMongoDatabase(new User(userInfo));
            savedUser.greet();
        }
    } catch (error) {
        console.error(error);        
    } finally {
        console.log('Exiting...');
        process.exit();
    }
})();

process.on('exit', () => {
    mongoose.connection.close(err => {
        if (err) console.log(err);
        console.log('Connection closed.');
    });
});

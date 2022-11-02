const mongoose = require('mongoose');

const user_shcema = new mongoose.Schema({
    username: String,
    password: String,
    highscore: Number,
    image: String,
});

user_shcema.methods.toScoreJSON = function(){
    return {
        higscore: this.higscore,
    };
};

mongoose.model('User', user_shcema);
const users_db = require('../config/config_db.js')

exports.login = async (req, res) => {
    try {
        const confirm_user = users_db.find(user => {
            return user.username == JSON.parse(req.params.name) && user.password == JSON.parse(req.params.password)
        });
        if (confirm_user != undefined) {
            // console.log(confirm_user.image);
            // console.log(JSON.parse(confirm_user.highscore));
            res.json({user: confirm_user.username, image: confirm_user.image});
        } else {
            res.json("Error");
        }
    } catch (error) {
        res.status(500).send({message: "An error has ocurred"});
    }
}

exports.create_user = async (req, res) => {
    try {
        const confirm_user = users_db.find(user => {
            return user.username == req.body.input_username
        });

        if (confirm_user == undefined) {
            users_db.push({ username: req.body.input_username, password: req.body.input_password, highscore: 0, image: "https://avatars.dicebear.com/api/pixel-art/" + req.body.input_username + ".svg" });
            res.json('success');
        }else{
            res.json('Error');
        }
    } catch {
        res.status(500).send({message: "An error has ocurred"});
    }
}

exports.get_user_score = async (req, res) => {
    try {
        const confirm_user = users_db.find(user => {
            return user.username == req.params.username
        });
        if (confirm_user != undefined) {
            // console.log(confirm_user);
            res.json(JSON.parse(confirm_user.highscore));
        } else {
            res.json("Error");
        }
    } catch (error) {
        res.status(500).send({message: "An error has ocurred"});
    }
}

exports.update_score = async (req, res) => { 
    let msg = "success"; 
    try {
        const id = JSON.parse(req.body.user);
        const user_index = users_db.findIndex(e => e.username === id);
        if (user_index !== -1) {
            if (req.body.user_score) {
                users_db[user_index].highscore = req.body.user_score;
            }
            res.json(msg);
        } else {
            res.json('Error');
        }
    } catch {
        res.status(500).send({message: "An error has ocurred"});
    }
}

exports.get_scores = async (req, res) => {
    let max = 5;
    if (max >= users_db.length) { max = users_db.length };
    const scores = users_db.map(i => { return { username: i.username, score: i.highscore }; }).sort((a, b) => b.score - a.score).splice(0, max);
    res.json(scores);
}
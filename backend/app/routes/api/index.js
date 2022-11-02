const router = require('express').Router();

const user = require('../../controllers/user.controller');

//api
router.post('/user/', user.create_user);
router.get('/user/:name/:password', user.login);
router.get('/score/:username', user.get_user_score);
router.get('/scores', user.get_scores);
router.put('/user', user.update_score);

module.exports = router;
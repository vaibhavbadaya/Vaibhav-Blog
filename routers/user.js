const {Router} = require('express');
const router = Router();
const User = require('../models/user');

router.get('/signin', (req, res) => {
    return res.render('signin');
});

router.get('/signup', (req, res) => {
    return res.render('signup');
})

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.matchPassword(email, password);
    if (!user) {
        return res.render('signin', {error: 'Invalid email or password'});
    }
    return res.redirect('/');
});

router.post('/signup', async (req, res) => {
    const {fullName, email, password} = req.body;

    const user = await User.create(
        {fullName, email, password});

    return res.redirect('/');
});







module.exports = router;
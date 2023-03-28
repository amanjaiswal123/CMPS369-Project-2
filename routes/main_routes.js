const express = require('express')
const pug = require("pug");
const bcrypt = require('bcrypt')
const router = express.Router();


router.get('/', async (req, res) => {
    const result = await req.db.get_all_rows('contacts');
    res.render('home', {title: "Home", data: result})
})
router.get('/login', (req, res) => res.render('login', {title: "Login"}))
router.get('/signup', (req, res) => res.render('signup', {title: "Sign Up"}))
router.get('/create', (req, res) => res.render('create', {title: "Create"}))
router.post('/create', function(req, res) {
    const { first, last, phone, email, street, city, state, zip, country, contact_by_phone, contact_by_email, contact_by_mail} = req.body;
    const contact_by_phone_num = contact_by_phone === "on" ? 1 : 0;
    const contact_by_email_num = contact_by_email === "on" ? 1 : 0;
    const contact_by_mail_num = contact_by_mail === "on" ? 1 : 0;




    // Call the add_contact function with the input values
    req.db.add_contact(first, last, phone, email, street, city, state, zip, country, contact_by_email_num, contact_by_phone_num, contact_by_mail_num);

    // Send a response to the client
    res.redirect('/')
});

router.post('/signup',  async function (req, res) {
    const {first, last, username, password, c_password} = req.body;
    if (password != c_password){
        res.render('signup.pug', {message:'Passwords do not match'})
        return
    }
    const same_user = await req.db.find_records('users',{'username':username})
    if (same_user.length > 0){
        res.render('signup.pug', {message:'Username Already Taken'})
        return
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const id = req.db.create_user(first, last, username, hash);
    res.redirect('/login');
});
router.get('/signout',  async function (req, res) {
    req.session.destroy();
    res.redirect('/');
});
router.post('/login', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const users = await req.db.find_records('users', {'username': username});
    if (users.length === 0) {
        res.render('login.pug', {message: 'Invalid username or password'});
        return;
    }
    const user = users[0];
    if (bcrypt.compareSync(password,user.password)) {
        req.session.user = user;
        res.redirect('/');
    } else {
        res.render('login.pug', {message: 'Invalid Username or Password'});
    }
});
router.get('/:id', async (req, res) => {

    const result = await req.db.find_records('contacts',{'id':req.params.id});
    res.render('id', {title: "ID", data: result[0]})
})



router.get('/:id/delete', async (req, res) => {
    if (req.session.user){
        const result = await req.db.find_records('contacts', {'id': req.params.id});
        res.render('id_delete', {title: "ID", data: result[0]});
    }
    else{
        res.render('not_authorized.pug')
    }


})

router.post('/:id/delete', async function (req, res) {
    const {delete_} = req.body;
    await req.db.delete_row('contacts', req.params.id)
    res.redirect('/');
});
router.get('/:id/edit', async (req, res) => {
    if (req.session.user) {
        const result = await req.db.find_records('contacts', {'id': req.params.id});
        res.render('id_edit', {title: "ID", data: result[0]})
    }
    else{
        res.render('not_authorized.pug')
    }
})

router.post('/:id/edit', function(req, res) {
    const { first, last, phone, email, street, city, state, zip, country, contact_by_phone, contact_by_email, contact_by_mail} = req.body;
    const contact_by_phone_num = contact_by_phone === "on" ? 1 : 0;
    const contact_by_email_num = contact_by_email === "on" ? 1 : 0;
    const contact_by_mail_num = contact_by_mail === "on" ? 1 : 0;

    // Call the add_contact function with the input values
    req.db.edit_contact(req.params.id, first, last, phone, email, street, city, state, zip, country, contact_by_email_num, contact_by_phone_num, contact_by_mail_num);

    res.redirect('/'+req.params.id)
});
module.exports = router;
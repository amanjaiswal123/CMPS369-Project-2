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

    console.log(contact_by_mail);
    console.log(contact_by_mail_num);



    // Call the add_contact function with the input values
    req.db.add_contact(first, last, phone, email, street, city, state, zip, country, contact_by_email_num, contact_by_phone_num, contact_by_mail_num);

    // Send a response to the client
    res.send('Contact added successfully');
});

router.post('/signup',  async function (req, res) {
    const {first, last, username, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    console.log(salt)
    console.log(password);
    const hash = bcrypt.hashSync(password, salt);
    const id = req.db.create_user(first, last, username, hash);
    req.session.user = await req.db.find_records('users', {'id': id});
    res.redirect('/');
});
router.post('/login', function(req, res) {
    const salt = bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(p1, salt)
//    await req.db.createuser(email,hash);
});
router.get('/:id', async (req, res) => {

    const result = await req.db.find_records('contacts',{'id':req.params.id});
    res.render('id', {title: "ID", data: result[0]})
})



router.get('/:id/edit', (req, res) => res.render('id_edit', {title: "Edit ID"}))
router.get('/:id/delete', (req, res) => res.render('id_delete', {title: "Delete ID"}))


module.exports = router;
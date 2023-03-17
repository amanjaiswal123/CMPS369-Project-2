const express = require('express')
const pug = require("pug");
const router = express.Router();


router.get('/', async (req, res) => {

    const result = await req.db.get_all_rows('contacts');

    res.render('home', {title: "Home", data: result})
})
router.get('/login', (req, res) => res.render('login', {title: "Login"}))
router.get('/signup', (req, res) => res.render('signup', {title: "Sign Up"}))
router.get('/create', (req, res) => res.render('create', {title: "Create"}))
router.post('/create', function(req, res) {
    const { first, last, phone, email, street, city, state, zip, country, contact_by_phone, contact_by_email, contact_by_mail } = req.body;

    // Call the add_contact function with the input values
    req.db.add_contact(first, last, phone, email, street, city, state, zip, country, contact_by_phone, contact_by_email, contact_by_mail);

    // Send a response to the client
    res.send('Contact added successfully');
});
router.get('/:id', (req, res) => res.render('id', {title: "ID"}))
router.get('/:id/edit', (req, res) => res.render('id_edit', {title: "Edit ID"}))
router.get('/:id/delete', (req, res) => res.render('id_delete', {title: "Delete ID"}))


module.exports = router;
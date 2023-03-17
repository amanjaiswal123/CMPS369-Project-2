const express = require('express')
const pug = require("pug");
const router = express.Router();


router.get('/', (req, res) => res.render('home', {title: "Home"}))
router.get('/login', (req, res) => res.render('login', {title: "Login"}))
router.get('/signup', (req, res) => res.render('signup', {title: "Sign Up"}))
router.get('/create', (req, res) => res.render('create', {title: "Create"}))
router.get('/:id', (req, res) => res.render('id', {title: "ID"}))
router.get('/:id/edit', (req, res) => res.render('id_edit', {title: "Edit ID"}))
router.get('/:id/delete', (req, res) => res.render('id_delete', {title: "Delete ID"}))


module.exports = router;
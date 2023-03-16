const express = require('express')
const pug = require("pug");
const router = express.Router();


router.get('/', (req, res) => res.render('home'))
router.get('/login', (req, res) => res.render('login'))
router.get('/signup', (req, res) => res.render('signup'))
router.get('/create', (req, res) => res.render('create'))
router.get('/:id', (req, res) => res.render('id'))
router.get('/:id/edit', (req, res) => res.render('id_edit'))
router.get('/:id/delete', (req, res) => res.render('id_delete'))


module.exports = router;
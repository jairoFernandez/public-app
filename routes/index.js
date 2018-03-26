var express = require('express');
var router = express.Router();
var fs = require('fs');
var models = require('../models');

/* GET home page. */
router.get('/', async (req, res, next) => {
  var prueba = "/";
  var directory = [];

  var rows = await models.Project.findAll({
    attributes: ['id', 'title', 'description']
  });

  directory = fs.readdirSync(prueba, null);
  res.render('index', { title: 'Actualizador', projects: rows, directories: directory });
});

module.exports = router; 

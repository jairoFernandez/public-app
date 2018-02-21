var express = require('express');
var router = express.Router();
var fs = require('fs');
var models = require('../models');

/* GET home page. */
router.get('/', function (req, res, next) {  
  var prueba = "C:\\Users\\jairo\\Proyectos\\Instalaciones";
  var directory = [];
  
  models.Project.findAll({
    attributes: ['id','title', 'description']
  }).then((rows)=>{
    directory = fs.readdirSync(prueba, null);
    res.render('index', { title: 'Actualizador', projects: rows, directories: directory });  
  });
 
});

module.exports = router; 

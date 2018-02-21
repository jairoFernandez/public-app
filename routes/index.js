var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  var prueba = "\\\\CUMBAL\\Aplicaciones\\SINCOok\\V3\\ABR\\FACTURACION_ELECTRONICA_PUBLICACIONES\\final\\";
  var directory = [];
  directory = fs.readdirSync(prueba, null);

  db.collection('clientes').find().toArray(function (err, results) {  
    
    res.render('index', { title: 'Facturación electrónica', clientes: results, directories: directory });
  });  
});

module.exports = router; 

var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/detail/:id?', function(req, res, next) {
  //res.send('respond with a resource' + req.params.id);
  models.Project.findAll({
      where:{
          id: req.params.id
      },
      limit: 1
  }).then(project => {
      res.render('project-detail', { title: 'Detalle proyecto', project: project[0] }); 
  })
   
});


router.post('/create', function(req, res, next){
    var body = req.body;
    models.Project.create(body).then((project)=>{
        console.log(project)
        res.redirect('/projects/detail/' + project.dataValues.id);
    });
})

module.exports = router;
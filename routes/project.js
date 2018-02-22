var express = require('express');
var router = express.Router();
var models = require('../models');

router.post('/create', function (req, res, next) {
    var body = req.body;
    models.Project.create(body).then((project) => {
        console.log(project)
        res.redirect('/projects/detail/' + project.dataValues.id);
    });
})

router.get('/detail/:id?', function (req, res, next) {
    var projectInfo = {};
    var implementation = [];

    models.Project.findAll({
        where: {
            id: req.params.id
        },
        limit: 1
    }).then(project => {
        projectInfo = project[0];
        models.Implementation.findAll({
            where: {
                idProject: projectInfo.dataValues.id
            }
        }).then((rows) => {
            res.render('project-detail', { title: 'Detalle proyecto', project: projectInfo, implementations: rows });
        });
    });
});

router.post('/implementation-create', function(req, res, next){
    var body = req.body;
    models.Implementation.create(body).then((implementation)=>{
        res.redirect('/projects/detail/' + implementation.dataValues.idProject);
    });
});

router.get('/implementation/:id?', function (req, res, next) {
    var idImplementation = req.params.id;
    var implementation = {};
    var project = {};
   
    models.Implementation.findById(idImplementation).then((imp)=>{
        var implementation = imp;
        models.Project.findById(imp.dataValues.idProject).then((project)=>{
            project = project;
            models.StepsImplementation.findAll({
                where:{
                    implementationId: implementation.dataValues.id
                }
            }).then((steps)=>{                
                var total = steps.length;
                var completed = 0;

                steps.forEach((value, index)=>{
                    if(value.dataValues.status){
                        completed = completed + 1;
                    }
                });

                if(total == 0){
                    total = 1;
                }

                var percentage = completed / total;
                models.Implementation.update({
                    percentage: percentage
                },{
                    where: {
                        id: idImplementation
                    }
                });

                res.render('project-implementation',{ implementation: implementation, project: project, steps: steps });
            })
        });
    });
});

router.post('/implementation/step-create', function (req, res, next) {
    var body = req.body;
    models.StepsImplementation.create(body).then((step) => {
        res.redirect('/projects/implementation/' + step.dataValues.implementationId);
    });
})

module.exports = router;
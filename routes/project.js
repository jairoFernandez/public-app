var express = require('express');
var router = express.Router();
var models = require('../models');
var Sequelize = require("sequelize");

router.post('/create', function(req, res, next) {
    var body = req.body;
    models.Project.create(body).then((project) => {
        console.log(project)
        res.redirect('/projects/detail/' + project.dataValues.id);
    });
})

router.get('/detail/:id?', function(req, res, next) {
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

router.post('/implementation-create', function(req, res, next) {
    var body = req.body;
    console.log("Crear implementation", body);
    models.Implementation.create(body).then((implementation) => {
        res.redirect('/projects/detail/' + implementation.dataValues.idProject);
    });
});

router.get('/implementation/:id?', function(req, res, next) {
    var idImplementation = req.params.id;
    var implementation = {};
    var project = {};

    models.Implementation.findById(idImplementation).then((imp) => {
        var implementation = imp;
        models.Project.findById(imp.dataValues.idProject).then((project) => {
            project = project;
            models.StepsImplementation.findAll({
                where: {
                    implementationId: implementation.dataValues.id
                },
                order: [
                    Sequelize.col('orderStep')
                ]
            }).then((steps) => {
                var total = steps.length;
                var completed = 0;

                steps.forEach((value, index) => {
                    if (value.dataValues.status) {
                        completed = completed + 1;
                    }
                });

                if (total == 0) {
                    total = 1;
                }

                var percentage = completed / total;
                models.Implementation.update({
                    percentage: percentage
                }, {
                    where: {
                        id: idImplementation
                    }
                });

                models.Template.findAll().then((rows) => {
                    res.render('project-implementation', { implementation: implementation, project: project, steps: steps, templates: rows });
                });
            })
        });
    });
});

router.post('/implementation/step-create', function(req, res, next) {
    var body = req.body;
    console.log("Creacion de paso", body);
    models.StepsImplementation.create(body).then((step) => {
        res.redirect('/projects/implementation/' + step.dataValues.implementationId);
    });
})

router.post('/implementation/step-update', function(req, res, next) {
    var body = req.body;

    if (body.status == 'on') {
        body.status = 'true';
    }
    else {
        body.status = 'false';
    }

    console.log("-- Implementation step --", body);
    var implementationStepId = body.id;
    models.StepsImplementation.update(body, { where: { id: implementationStepId } }).then((step) => {

    });

    res.redirect('/projects/implementation/' + body.implementationId);
});


router.post('/implementation/import-steps', function(req, res, next) {
    var body = req.body;

    models.TemplateTask.findAll({
        where: {
            templateId: body.templates
        }
    }).then((template) => {
        template.forEach((value) => {
            var steps = {
                type: value.dataValues.type,
                title: value.dataValues.title,
                date: value.dataValues.date,
                description: value.dataValues.description,
                typeResponsable: value.dataValues.typeResponsable,
                responsable: value.dataValues.responsable,
                duration: value.dataValues.duration,
                status: value.dataValues.status,
                implementationId: body.idImplementation,
                orderStep: value.dataValues.orderStep
            };
            
            models.StepsImplementation.create(steps);
                    
            res.redirect('/projects/implementation/' + body.idImplementation);
        });
    });
});

module.exports = router;

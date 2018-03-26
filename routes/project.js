var express = require('express');
var router = express.Router();
var models = require('../models');
var Sequelize = require("sequelize");

router.post('/create', async (req, res, next) => {
    var body = req.body;
    var project = await models.Project.create(body);
    res.redirect('/projects/detail/' + project.dataValues.id);
})

router.get('/detail/:id?', async (req, res, next) => {
    var projectInfo = {};
    var implementation = [];

    var project = await models.Project.findAll({
        where: {
            id: req.params.id
        },
        limit: 1
    })

    projectInfo = project[0];
    var rows = await models.Implementation.findAll({
        where: {
            idProject: projectInfo.dataValues.id
        }
    });

    res.render('project-detail', { title: 'Detalle proyecto', project: projectInfo, implementations: rows });
});

router.post('/implementation-create', async (req, res, next) => {
    var body = req.body;
    var implementation = await models.Implementation.create(body);
    res.redirect('/projects/detail/' + implementation.dataValues.idProject);
});

router.get('/implementation/:id?', async (req, res, next) => {
    var idImplementation = req.params.id;
    var implementation = {};
    var project = {};

    implementation = await models.Implementation.findById(idImplementation);
    project = await models.Project.findById(implementation.dataValues.idProject);
    var steps = await models.StepsImplementation.findAll({ where: { implementationId: implementation.dataValues.id }, order: [Sequelize.col('orderStep')] });
    var total = steps.length;
    var completed = 0;

    steps.forEach((value, index) => { if (value.dataValues.status) completed = completed + 1; });

    if (total == 0) total = 1;

    var percentage = completed / total;
    var updateImplementation = await models.Implementation.update({ percentage: percentage }, { where: { id: idImplementation } });

    var rows = await models.Template.findAll();

    res.render('project-implementation', {
        implementation: implementation,
        project: project,
        steps: steps,
        templates: rows
    });
});

router.post('/implementation/step-create', async (req, res, next) => {
    var body = req.body;
    var step = await models.StepsImplementation.create(body);
    res.redirect('/projects/implementation/' + step.dataValues.implementationId);
})

router.post('/implementation/step-update', async (req, res, next) => {
    var body = req.body;

    if (body.status == 'on') {
        body.status = 'true';
    }
    else {
        body.status = 'false';
    }

    var implementationStepId = body.id;
    var updateImplementation = await models.StepsImplementation.update(body, { where: { id: implementationStepId } });

    res.redirect('/projects/implementation/' + body.implementationId);
});

router.post('/implementation/import-steps', async (req, res, next) => {
    var body = req.body;

    var template = await models.TemplateTask.findAll({
        where: {
            templateId: body.templates
        }
    });

    var created = await template.forEach((value) => {
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
    });

    res.redirect('/projects/implementation/' + body.idImplementation);
});

module.exports = router;

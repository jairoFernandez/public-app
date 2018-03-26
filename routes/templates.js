var express = require('express');
var router = express.Router();
var models = require('../models');
const Sequelize = require("sequelize");

/* GET users listing. */
router.get('/:id?', async (req, res, next) => {
    var id = req.params.id != undefined ? req.params.id : 0;
    var templates = await models.Template.findAll({});
    var templateTask = {};
    
    if(id > 0){
        templateTask = await models.TemplateTask.findAll({
            where: {
                templateId: id
            },
            order: [
                Sequelize.col('orderStep')
            ]
        })
    }    

    res.render('templates/index-template',
        { title: 'Plantillas', templates: templates, templateActive: id, templatesTask: templateTask }
    );
});

router.post('/create', async (req, res, next) => {
    var body = req.body;
    var row = await models.Template.create(body);
    res.redirect('/templates/' + row.dataValues.id);
});

router.post('/update', async (req, res, next) => {
    var body = req.body;
    var row = await models.Template.update(body, {
        where: {
            id: body.id
        }
    });
    res.redirect('/templates/' + body.id);
});

router.post('/create-task', async (req, res, next) => {
    var body = req.body;
    var row = await models.TemplateTask.create(body);
    res.redirect('/templates/' + row.dataValues.templateId);
});

router.post('/update-task', async (req, res, next) => {
    var body = req.body;
    let templetaUpdate = await models.TemplateTask.update(body,
        {
            where: { id: body.id }
        });
    res.redirect('/templates/' + body.templateId);
});

module.exports = router;
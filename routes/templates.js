var express = require('express');
var router = express.Router();
var models = require('../models');
const Sequelize = require("sequelize");

/* GET users listing. */
router.get('/:id?', function (req, res, next) {
    models.Template.findAll({
      
    }).then((templates) => {

        /*console.log("All templates", templates);
        res.render('templates/index-template',
                 { title: 'Plantillas', templates: templates, templateActive: req.params.id }
        );*/

        models.TemplateTask.findAll({
            where: {
                templateId: req.params.id
            },
            order: [
                Sequelize.col('orderStep')
            ]
        }).then((templatesTask) => {
            res.render('templates/index-template',
                { title: 'Plantillas', templates: templates, templateActive: req.params.id, templatesTask: templatesTask }
            );
        })
    })

});

router.post('/create', function (req, res, next) {
    var body = req.body;

    models.Template.create(body).then((row) => {
        res.redirect('/templates/' + row.dataValues.id);
    });
});

router.post('/update', function (req, res, next) {
    var body = req.body;

    models.Template.update(body, {
        where: {
            id: body.id
        }
    }).then((row) => {
        res.redirect('/templates/' + body.id);
    });
});

router.post('/create-task', function (req, res, next) {
    var body = req.body;

    models.TemplateTask.create(body).then((row) => {
        res.redirect('/templates/' + row.dataValues.templateId);
    });
});

router.post('/update-task', function (req, res, next) {
    var body = req.body;
    console.log("Update task", body);
    models.TemplateTask.update(body, { where: { id: body.id } }).then((row) => {

    });
    res.redirect('/templates/' + body.templateId);
});


module.exports = router;
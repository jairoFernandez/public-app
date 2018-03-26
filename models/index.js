const path = require('path');
const Sequelize = require('sequelize');

const database_name = process.env.DATABASE_NAME || 'database.sqlite'

const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './' + database_name
});

var Project = sequelize.import('./project');

var Implementation = sequelize.import('./implementation.js');

var StepsImplementation = sequelize.import('./steps_implementation.js')

var Template = sequelize.import('./template');

var TemplateTask = sequelize.import('./template-task.js');

//TemplateTask.belongsTo(Template, { foreignKey: 'templateId', targetKey: 'id'});

sequelize.sync({
    force: false,
    logging: console.log
}).then(()=>{
    // Project.count().then((count)=>{
    //     if(count === 0){
    //         Project.create({
    //             title: "EJEMPLO",
    //             description: "Proyecto de integración"
    //         })
    //     }
    // })
    console.log("Inicializamos la base de datos");
})

module.exports = {
    Project,
    Implementation,
    StepsImplementation,
    Template,
    TemplateTask
}
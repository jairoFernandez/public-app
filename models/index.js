const path = require('path');
const Sequelize = require('sequelize');

const database_name = process.env.DATABASE_NAME || 'database.sqlite'

const connection = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './' + database_name
});

var Clients = connection.define('clients')

var Project = connection.define('project', {
    title: Sequelize.STRING,
    description: {
        type: Sequelize.TEXT,
        defaultValue: 'My own description by default'
    }
},
{
    timestamps: false,
    freezeTableName: false
});

var Implementation = connection.define('implementation', {
    idProject: Sequelize.INTEGER,
    nameClient: {
        type: Sequelize.TEXT
    },
    dateImplementation: {
        type: Sequelize.DATE
    },
    percentage: {
        type: Sequelize.TINYINT
    }
});

var StepsImplementation = connection.define('steps_implementation',{
    type: Sequelize.STRING,
    title: Sequelize.STRING,
    date: Sequelize.DATE,
    description: Sequelize.STRING,
    typeResponsable:Sequelize.STRING,
    responsable: Sequelize.STRING,
    duration: Sequelize.INTEGER,
    status: Sequelize.BOOLEAN,
    implementationId: Sequelize.INTEGER,
    orderStep: Sequelize.INTEGER
});

var Template = connection.define('template', {
    name: Sequelize.STRING,
    description: Sequelize.STRING
});

var TemplateTask = connection.define('template-task', {
    type: Sequelize.STRING,
    title: Sequelize.STRING,
    date: Sequelize.DATE,
    description: Sequelize.STRING,
    typeResponsable:Sequelize.STRING,
    responsable: Sequelize.STRING,
    duration: Sequelize.INTEGER,
    status: Sequelize.BOOLEAN,
    orderStep: Sequelize.INTEGER,
    templateId: Sequelize.INTEGER
});

connection.sync({
    force: false,
    logging: console.log
}).then(()=>{
    Project.count().then((count)=>{
        if(count === 0){
            Project.create({
                title: "EJEMPLO",
                description: "Proyecto de integración"
            })
        }
    })
    console.log("Inicializamos la base de datos");
})

module.exports = {
    Project,
    Implementation,
    Clients,
    StepsImplementation,
    Template,
    TemplateTask
}


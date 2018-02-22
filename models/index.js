const path = require('path');
const Sequelize = require('sequelize');

const connection = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './database.sqlite'
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
    implementationId: Sequelize.INTEGER
});

connection.sync({
    force: false,
    logging: console.log
}).then(()=>{
    Project.count().then((count)=>{
        if(count === 0){
            Project.create({
                title: "Facturación electrónica",
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
    StepsImplementation
}


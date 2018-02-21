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
    Project
}


module.exports = (sequelize, DataTypes) => {
    return sequelize.define('template-task', {
        type: DataTypes.STRING,
        title: DataTypes.STRING,
        date: DataTypes.DATE,
        description: DataTypes.STRING,
        typeResponsable:DataTypes.STRING,
        responsable: DataTypes.STRING,
        duration: DataTypes.INTEGER,
        status: DataTypes.BOOLEAN,
        orderStep: DataTypes.INTEGER,
        templateId: DataTypes.INTEGER
    });
};
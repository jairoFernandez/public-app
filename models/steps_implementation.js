module.exports = (sequelize, DataTypes) => {
    return sequelize.define('steps_implementation',{
        type: DataTypes.STRING,
        title: DataTypes.STRING,
        date: DataTypes.DATE,
        description: DataTypes.STRING,
        typeResponsable:DataTypes.STRING,
        responsable: DataTypes.STRING,
        duration: DataTypes.INTEGER,
        status: DataTypes.BOOLEAN,
        implementationId: DataTypes.INTEGER,
        orderStep: DataTypes.INTEGER
    });
}
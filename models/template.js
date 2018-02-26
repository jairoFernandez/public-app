module.exports = (sequelize, DataTypes) => {
    const Template = sequelize.define('Template', {
            name: DataTypes.STRING,
            description: DataTypes.STRING
        }
    );

    //Template.hasMany(TemplateTask, {foreignKey: 'templateId', sourceKey: 'id'});

    return Template;
};
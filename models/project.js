module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Project', {
        title: DataTypes.STRING,
        description: {
            type: DataTypes.TEXT,
            defaultValue: 'My own description by default'
        }
    }
    );

    //Template.hasMany(TemplateTask, {foreignKey: 'templateId', sourceKey: 'id'});
};
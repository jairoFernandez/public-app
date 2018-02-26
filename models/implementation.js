module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Implementation', {
        idProject: DataTypes.INTEGER,
        nameClient: {
            type: DataTypes.TEXT
        },
        dateImplementation: {
            type: DataTypes.DATE
        },
        percentage: {
            type: DataTypes.TINYINT
        }
    })
}
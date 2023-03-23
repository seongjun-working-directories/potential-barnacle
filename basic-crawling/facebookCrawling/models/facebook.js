module.exports = (sequelize, Sequelize)=>{
    return sequelize.define('facebook', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        media: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        writer: {
            type: Sequelize.STRING(50),
            allowNull: false
        }
    });
}
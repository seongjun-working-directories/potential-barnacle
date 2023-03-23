module.exports = (sequelize, Sequelize)=>{
    return sequelize.define('instagram', {
        postId: {
            type: Sequelize.STRING(50),
            primaryKey: true
        },
        writer: {
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        media: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    });
};
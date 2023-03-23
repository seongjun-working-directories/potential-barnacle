module.exports = (sequelize, Sequelize) => {
    return sequelize.define('proxy', {
        ip: {
            type: Sequelize.STRING(50),
            allowNull: false
            // unique 속성을 true로 주고자 한다면,
            // index.js에서 db.Proxy.create이 아닌 db.Proxy.upsert를 사용해야 함
        },
        type: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        latency: {
            type: Sequelize.FLOAT.UNSIGNED,
            allowNull: false
        }
    });
};
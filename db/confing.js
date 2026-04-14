const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB conectada correctamente');
    } catch (error) {
        console.error('Error en DB:', error);
        throw error;
    }
};

module.exports = {
    sequelize,
    dbConnection
};
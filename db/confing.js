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

//TODO Delete this functions, its only a test
//There is a proble with de db connection
async function debugDB() {
    const [db] = await sequelize.query('SELECT current_database();');
console.log('DB:', db);
const [info] = await sequelize.query(`
  SELECT inet_server_addr(), inet_server_port();
`);
console.log(info);

const [tables] = await sequelize.query(`
  SELECT table_schema, table_name
  FROM information_schema.tables
  WHERE table_name = 'users';
`);
console.log('users:', tables);
}

debugDB();

module.exports = { 
    sequelize,
    dbConnection
};
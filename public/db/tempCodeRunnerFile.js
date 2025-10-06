const { Sequelize } = require('sequelize');
require('dotenv').config();

 
// Configuração da conexão com o banco de dados
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: console.log, // Mostra as queries SQL no console
  define: {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
    underscored: false, // Usa camelCase ao invés de snake_case
  },
  pool: {
    max: 10, // Máximo de conexões simultâneas
    min: 0,  // Mínimo de conexões
    acquire: 30000, // Tempo máximo para obter conexão (30s)
    idle: 10000, // Tempo máximo que uma conexão pode ficar inativa (10s)
  },
});
 
// Função para testar a conexão
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com MySQL estabelecida com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error.message);
  }
}
 
testConnection();
 
module.exports = sequelize;
 
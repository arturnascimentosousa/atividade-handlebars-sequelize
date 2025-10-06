const path = require('path');
const { Sequelize } = require('sequelize');

// Força o dotenv a carregar o .env da raiz do projeto
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Debug rápido para conferir se as variáveis estão corretas
console.log('🔍 Conexão MySQL usando:', {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD ? '✅ ok' : '❌ vazio',
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT), // ⚠️ converter string para número
    dialect: 'mysql',
    logging: console.log,
    define: { timestamps: true, underscored: false },
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
  }
);

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

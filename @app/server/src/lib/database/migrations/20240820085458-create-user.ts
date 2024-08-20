const { DataTypes, QueryInterface } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: typeof QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
  },
  async down(
    queryInterface: typeof QueryInterface,
    _Sequelize: typeof DataTypes
  ) {
    await queryInterface.dropTable('User');
  }
};

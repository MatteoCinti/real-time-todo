/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: typeof QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface
      .createTable('Board', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        title: {
          type: Sequelize.STRING
        },
        owner: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'User',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      })
      .then(() =>
        queryInterface.addConstraint('Board', {
          type: 'FOREIGN KEY',
          name: 'FK_user_board',
          fields: ['owner'],
          references: {
            table: 'User',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        })
      );
  },
  async down(
    queryInterface: typeof QueryInterface,
    _Sequelize: typeof DataTypes
  ) {
    await queryInterface.dropTable('Board');
  }
};

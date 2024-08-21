/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: typeof QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface
      .createTable('Todo', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        title: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.TEXT
        },
        isDone: {
          type: Sequelize.BOOLEAN
        },
        board: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Board', // This references the Users table
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      })
      .then(() =>
        queryInterface.addConstraint('Todo', {
          type: 'FOREIGN KEY',
          name: 'FK_board_todo',
          fields: ['board'],
          references: {
            table: 'Board',
            field: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        })
      );
  },
  async down(
    queryInterface: typeof QueryInterface,
    _Sequelize: typeof DataTypes
  ) {
    await queryInterface.dropTable('Todo');
  }
};

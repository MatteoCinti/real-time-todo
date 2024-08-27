const { DataTypes, QueryInterface } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: typeof QueryInterface, Sequelize: typeof DataTypes) {
    // Add parentId column to support subtasks
    await queryInterface.addColumn('Todo', 'parentId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Todo',
        key: 'id'
      },
      defaultValue: null,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Add order column to maintain task order
    await queryInterface.addColumn('Todo', 'order', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  },

  async down(
    queryInterface: typeof QueryInterface,
    _Sequelize: typeof DataTypes
  ) {
    await queryInterface.removeColumn('Todo', 'parentId');
    await queryInterface.removeColumn('Todo', 'order');
  }
};

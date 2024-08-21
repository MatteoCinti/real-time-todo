import Board from './board';
import Todo from './todo';
import User from './user';

Board.belongsTo(User, {
  targetKey: 'id',
  as: 'board',
  foreignKey: {
    name: 'owner',
    allowNull: false
  },
  foreignKeyConstraint: true
});

User.hasMany(Board, {
  sourceKey: 'id',
  as: 'board',
  foreignKey: {
    name: 'owner',
    allowNull: false
  }
});

Todo.belongsTo(Board, {
  as: 'todo',
  targetKey: 'id',
  foreignKey: {
    name: 'board',
    allowNull: false
  },
  foreignKeyConstraint: true
});

Board.hasMany(Todo, {
  sourceKey: 'id',
  as: 'todo',
  foreignKey: {
    name: 'board',
    allowNull: false
  }
});

export { Board, Todo, User };

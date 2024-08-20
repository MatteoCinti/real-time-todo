import { DataTypes, Model } from 'sequelize';
import connection from '../connection';
import Board from './board';

type TodoAttributes = {
  id?: number;
  title: string;
  isDone: boolean;
  board: string;
};

class Todo extends Model<TodoAttributes> implements TodoAttributes {
  public id!: number;
  public title!: string;
  public board!: string;
  public isDone!: boolean;
}

Todo.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    board: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize: connection,
    modelName: 'Todo'
  }
);

Todo.belongsTo(Board, {
  as: 'board',
  foreignKey: {
    name: 'id',
    allowNull: false
  },
  foreignKeyConstraint: true
});

export default Todo;

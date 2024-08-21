import { DataTypes, Model } from 'sequelize';
import connection from '../connection';

type TodoAttributes = {
  id?: number;
  title: string;
  board: number;
  description?: string;
  isDone?: boolean;
};

class Todo extends Model<TodoAttributes> implements TodoAttributes {
  public id!: number;
  public title!: string;
  public board!: number;
  public isDone!: boolean;
  public description!: string;
}

Todo.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    board: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize: connection,
    modelName: 'Todo',
    tableName: 'Todo',
    timestamps: false
  }
);

export default Todo;

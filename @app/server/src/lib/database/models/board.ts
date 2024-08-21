import { DataTypes, Model } from 'sequelize';
import connection from '../connection';

type BoardAttributes = {
  id?: number;
  title: string;
  owner: number;
};

class Board extends Model<BoardAttributes> implements BoardAttributes {
  public id!: number;

  public title!: string;

  public owner!: number;
}

Board.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER
    },
    title: DataTypes.STRING,
    owner: {
      allowNull: false,
      type: DataTypes.NUMBER
    }
  },
  {
    sequelize: connection,
    modelName: 'Board',
    tableName: 'Board',
    timestamps: false
  }
);

export default Board;

import { DataTypes, Model } from 'sequelize';
import connection from '../connection';

type UserAttributes = {
  id?: number;
  firstName: string;
  username: string;
  password: string;
};

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public username!: string;
  public password!: string;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
    sequelize: connection,
    modelName: 'User',
    tableName: 'User',
    timestamps: false
  }
);

export default User;

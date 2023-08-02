import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../database';

interface UserAttributes {
  userId: number;
  userName: string;
  email: string;
  password: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public userId!: number;
  public userName!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export { User };

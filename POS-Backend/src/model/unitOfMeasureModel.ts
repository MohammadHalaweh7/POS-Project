import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../database';

interface UnitOfMeasureAttributes {
  unitId: number;
  unitName: string;
  baseUnit: string;
  conversionFactor: number;
}

export interface UnitOfMeasureCreationAttributes extends Optional<UnitOfMeasureAttributes, 'unitId'> {}

class UnitOfMeasure extends Model<UnitOfMeasureAttributes, UnitOfMeasureCreationAttributes>
  implements UnitOfMeasureAttributes {
  public unitId!: number;
  public unitName!: string;
  public baseUnit!: string;
  public conversionFactor!: number;
}

UnitOfMeasure.init(
  {
    unitId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    unitName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    baseUnit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conversionFactor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UnitOfMeasure',
  }
);

export { UnitOfMeasure };

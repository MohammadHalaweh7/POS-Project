import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../database';

interface ProductCategoryAttributes {
  categoryId: number;
  categoryName: string;
  image:string;
}

export interface ProductCategoryCreationAttributes extends Optional<ProductCategoryAttributes, 'categoryId'> {}

class ProductCategory extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes>
  implements ProductCategoryAttributes {
  public categoryId!: number;
  public categoryName!: string;
  public image!: string;

}

ProductCategory.init(
  {
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'ProductCategory',
  }
);

export { ProductCategory };

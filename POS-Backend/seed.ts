import {
  ProductCategory,
  ProductCategoryCreationAttributes,
} from "./src/model/ProductCategoryModel";
import { Product, ProductCreationAttributes } from "./src/model/productModel";
import {
  UnitOfMeasure,
  UnitOfMeasureCreationAttributes,
} from "./src/model/unitOfMeasureModel";
const fs = require("fs");

interface Data {
  categories: ProductCategoryCreationAttributes[];
  unitsOfMeasure: UnitOfMeasureCreationAttributes[];
  products: ProductCreationAttributes[];
}
export async function seedDatabase() {
  console.log("Database is ready");
  const numberOfData = await Product.count();
  if (!numberOfData) {
    fs.readFile("./sample-data.json", "utf8", (err: any, data: string) => {
      if (err) {
        console.error("Error reading JSON file:", err);
        return;
      }
      const jsonData: Data = JSON.parse(data);
      addData(jsonData);
      console.log("Initial data added successfully to database");
    });
  }
}

async function addData(data: Data) {
  data.categories.map(async (category) => {
    await ProductCategory.create({ categoryName: category.categoryName ,image:category.image});
  });
  data.unitsOfMeasure.map(async (unit) => {
    await UnitOfMeasure.create({
      unitName: unit.unitName,
      baseUnit: unit.baseUnit,
      conversionFactor: unit.conversionFactor,
    });
  });
  data.products.map(async (product) => {
    await Product.create({
      name: product.name,
      code: product.code,
      quantity:product.quantity,
      image: product.image,
      price: product.price,
      categoryId: product.categoryId,
      unitId: product.unitId,
    });
  });
}

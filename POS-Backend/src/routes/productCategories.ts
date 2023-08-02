import { Router, Request, Response } from "express";
import {
  ProductCategory,
  ProductCategoryCreationAttributes,
} from "../model/ProductCategoryModel";
import { authenticateToken } from "../auth/auth";
const productCategoriesRouter = Router();

//Retrive all categories
productCategoriesRouter.get("/", authenticateToken,async (req: Request, res: Response) => {
  try {
    const categories = await ProductCategory.findAll();
    setTimeout(() => {
      res.json(categories);
      console.log("categories have been Retrived");
    }, 100);
  } catch (error) {
    setTimeout(() => {
      res.status(500).json({ error: "Server Error" });
    }, 100);
  }
});

//Bring a specific category based on category id
productCategoriesRouter.get(
  "/:categoryId",
  authenticateToken,
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    try {
      const category = await ProductCategory.findByPk(categoryId);
      if (category) {
        setTimeout(() => {
          res.json(category);
          console.log("Single category have been Retrived");
        }, 100);
      } else {
        setTimeout(() => {
          res.status(404).json({ error: "category not found" });
        }, 100);
      }
    } catch (error) {
      setTimeout(() => {
        res.status(500).json({ error: "Server Error" });
      }, 100);
    }
  }
);

//Post a new category
productCategoriesRouter.post("/", authenticateToken,async (req: Request, res: Response) => {
  const { categoryName,image }: ProductCategoryCreationAttributes = req.body;
  if (typeof categoryName !== "string" && typeof image !== "string") {
    setTimeout(() => {
      return res.status(400).json({ error: "Invalid data types" });
    }, 100);
  }
  try {
    const newCategory = await ProductCategory.create({ categoryName,image })
      .then(() => {
        setTimeout(() => {
          res
            .status(201)
            .json({ message: "Category added successfully", newCategory });
        }, 100);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    setTimeout(() => {
      res.status(500).json({ error: "Server Error" });
    }, 100);
  }
});

//Update a specific product based on product id
productCategoriesRouter.put(
  "/:categoryId",
  authenticateToken,
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const { categoryName,image }: ProductCategoryCreationAttributes = req.body;
    if (typeof categoryName !== "string") {
      setTimeout(() => {
        return res.status(400).json({ error: "Invalid data types" });
      }, 100);
    }
    try {
      const category = await ProductCategory.findByPk(categoryId);
      if (category) {
        category.categoryName = categoryName;
        category.image=image
        await category.save();
        setTimeout(() => {
          res.json({ message: "Category Updated successfully", category });
        }, 100);
      } else {
        setTimeout(() => {
          res.status(404).json({ error: "Category not found" });
        }, 100);
      }
    } catch (error) {
      setTimeout(() => {
        res.status(500).json({ error: "Server Error" });
      }, 100);
    }
  }
);

//Delete a specific product based on product id
productCategoriesRouter.delete(
  "/:categoryId",
  authenticateToken,
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;

    try {
      const category = await ProductCategory.findByPk(categoryId);
      if (category) {
        await category.destroy();
        setTimeout(() => {
          res.json({ message: "Category deleted successfully" });
        }, 100);
      } else {
        setTimeout(() => {
          res.status(404).json({ error: "Category not found" });
        }, 100);
      }
    } catch (error) {
      setTimeout(() => {
        res.status(500).json({ error: "Server Error" });
      }, 100);
    }
  }
);

export default productCategoriesRouter;

import * as Yup from "yup";

const CategorySchema = Yup.object({
  categoryName: Yup.string()
    .required("name is required")
    .min(3, "min is 3 char")
    .max(10, "max is 10 char"),
  image: Yup.string().required("Image is required"),
});

export default CategorySchema;
import * as Yup from "yup";

const ProductSchema = Yup.object({
  name: Yup.string()
    .required("name is required")
    .min(3, "min is 3 char")
    .max(15, "max is 15 char"),
  code: Yup.string().required("code is required"),
  quantity: Yup.number().required("quantity is required"),
  image: Yup.string().required("image is required"),
  price: Yup.number().required("price is required"),
  categoryId: Yup.number().required("categoryId is required"),
  unitId: Yup.number().required("unitId is required"),
});

export default ProductSchema;

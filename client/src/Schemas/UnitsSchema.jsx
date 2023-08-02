import * as Yup from "yup";

const UnitsSchema = Yup.object({
  unitName: Yup.string()
    .required("name is required")
    .min(3, "min is 3 char")
    .max(15, "max is 15 char"),
    baseUnit: Yup.string().required("Base Unit is required"),
    conversionFactor: Yup.number().required("Conversion Factor is required"),
});

export default UnitsSchema;
import * as Yup from "yup";

const LoginSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Not a valid email"),
  password: Yup.string().required("Password is required"),
});

export default LoginSchema;

import Joi from "joi";
import validation from "./schema-validation";
const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({ "string.empty": "Looks like you forgot your email" }),
  password: Joi.string()
    .required()
    .messages({ "string.empty": "Looks like you forgot your password" }),
});

const validateUserLogin = (input) => {
  return validation(loginSchema, input);
};
export default validateUserLogin;

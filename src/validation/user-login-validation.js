import Joi from "joi";
import validation from "./schema-validation";
const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({ "string.empty": "Looks like you forgot your email" }),
  password: Joi.string()
    .pattern(
      new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,})(?=.*[!@#$%^&*-_]).{8,}$/)
    )
    .min(8)
    .max(30)
    .required()
    .messages({
      "string.pattern.base":
        "The password must be at least 8 characters long and can contain a combination of uppercase letters, lowercase letters, digits, and a special character from !@#$%^&*-",
      "string.empty": "Looks like you forgot your password",
      "string.min": "Password must be at least 7 characters long",
    }),
});

const validateUserLogin = (input) => {
  return validation(loginSchema, input);
};
export default validateUserLogin;

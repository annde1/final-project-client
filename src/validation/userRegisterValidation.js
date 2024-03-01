import Joi from "joi";
import validation from "./schema-validation";

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(20).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters long",
  }),
  lastName: Joi.string().min(2).max(20).required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters long",
  }),
  userName: Joi.string().min(2).max(20).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 2 characters long",
  }),
  email: Joi.string().min(7).max(100).required().messages({
    "string.empty": "Email is required",
    "string.pattern.base": "Email must be valid email",
    "string.min": "Email must be at least 7 characters long",
  }),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d{4})(?=.*?[@!#$%^&*_-]+)([a-zA-Z0-9!@#$%^&*_-]{8,})$/
      )
    )
    .min(8)
    .max(30)
    .required()
    .messages({
      "string.pattern.base":
        "The password must be at least 8 characters long and can contain a combination of uppercase letters, lowercase letters, digits, and a special character from !@#$%^&*-",
      "string.empty": "Password is required",
      "string.min": "Password must be at least 7 characters long",
    }),
  age: Joi.number().min(1).max(120).optional().allow(""),
  weight: Joi.number().min(1).optional().allow(""),
  height: Joi.number().min(1).optional().allow(""),
  isPremium: Joi.boolean().required(),
  alt: Joi.string().min(5).max(100).optional().allow(""),
  url: Joi.string().uri().min(5).max(255).optional().allow(""),
});

const validateRegistration = (input) => {
  return validation(registerSchema, input);
};
export default validateRegistration;

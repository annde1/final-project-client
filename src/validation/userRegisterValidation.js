import Joi from "joi";
import validation from "./schema-validation";

const registerSchema = Joi.object({
  firstName: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .min(2)
    .max(20)
    .required()
    .messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least 2 characters long",
      "string.pattern.base":
        "Invalid first name. First name can only contain only letters, numbers and spaces.",
    }),
  lastName: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .min(2)
    .max(20)
    .required()
    .messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 2 characters long",
      "string.pattern.base":
        "Invalid last name. Last name can only contain only letters, numbers and spaces.",
    }),
  userName: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9\s]+$/))
    .min(2)
    .max(20)
    .required()
    .messages({
      "string.empty": "Username is required",
      "string.min": "Username must be at least 2 characters long",
      "string.pattern.base":
        "Invalid user name. User name can only contain only letters, numbers and spaces.",
    }),
  email: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
    .min(7)
    .max(100)
    .required()
    .messages({
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
  age: Joi.number()
    .optional()
    .messages({
      "number.base": "Age must be a number",
      "number.pattern.base": "Age must be a whole number",
      "number.integer": "Age must be a whole number",
    })
    .allow(null),
  weight: Joi.number()
    .optional()
    .messages({
      "number.base": "Weight must be a number",
    })
    .allow(null),
  height: Joi.number()
    .optional()
    .messages({
      "number.base": "Height must be a number",
    })
    .allow(null),
  isPremium: Joi.boolean().required(),
  alt: Joi.string().min(5).max(100).optional().allow(""),
  file: Joi.any().allow(null),
});

const validateRegistration = (input) => {
  return validation(registerSchema, input);
};
export default validateRegistration;

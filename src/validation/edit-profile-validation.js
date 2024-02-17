import Joi from "joi";
import validation from "./schema-validation";

const editProfileSchema = Joi.object({
  name: Joi.object({
    firstName: Joi.string().min(2).max(20).required().messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least 2 characters long",
    }),
    lastName: Joi.string().min(2).max(20).required().messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 2 characters long",
    }),
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
  password: Joi.string().min(5).max(30).required().messages({
    "string.pattern.base":
      "The password must be at least 5 characters long and can contain a combination of uppercase letters, lowercase letters, digits, and a special character from !@#$%^&*-",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 5 characters long",
  }),
  age: Joi.number().required().messages({
    "any.required": "Age is required",
    "number.base": "Age must be a number",
  }),
  weight: Joi.number().required().messages({
    "any.required": "Weight is required",
    "number.base": "Weight must be a number",
  }),
  height: Joi.number().required().messages({
    "any.required": "Weight is required",
    "number.base": "Height must be a number",
  }),
  image: Joi.object({
    alt: Joi.string().optional().allow(""),
    url: Joi.string().uri().optional().allow(""),
  }).optional(),
});

const validateEditProfile = (input) => {
  return validation(editProfileSchema, input);
};
export default validateEditProfile;

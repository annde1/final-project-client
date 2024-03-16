import Joi from "joi";
import validation from "./schema-validation";

const editProfileSchema = Joi.object({
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
  alt: Joi.string().max(100).optional().allow(""),
  file: Joi.any().allow(null),
});

const validateEditProfile = (input) => {
  return validation(editProfileSchema, input);
};
export default validateEditProfile;

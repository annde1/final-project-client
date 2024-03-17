import Joi from "joi";
import validation from "./schema-validation";

const editProfileSchema = Joi.object({
  firstName: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z\s]+$/))
    .min(2)
    .max(20)
    .required()
    .messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least 2 characters long",
      "string.pattern.base":
        "Invalid first name. First name can only contain only letters and spaces.",
    }),
  lastName: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z\s]+$/))
    .min(2)
    .max(20)
    .required()
    .messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 2 characters long",
      "string.pattern.base":
        "Invalid last name. Last name can only contain only letters and spaces.",
    }),
  userName: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z\s]+$/))
    .min(2)
    .max(20)
    .required()
    .messages({
      "string.empty": "Username is required",
      "string.min": "Username must be at least 2 characters long",
      "string.pattern.base":
        "Invalid user name. User name can only contain only letters and spaces.",
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
  age: Joi.number()
    .optional()
    .messages({
      "number.base": "Age must be a number",
    })
    .allow(""),
  weight: Joi.number()
    .optional()
    .messages({
      "number.base": "Weight must be a number",
    })
    .allow(""),
  height: Joi.number()
    .optional()
    .messages({
      "number.base": "Height must be a number",
    })
    .allow(""),
  alt: Joi.string().max(100).optional().allow(""),
  file: Joi.any().allow(null),
});

const validateEditProfile = (input) => {
  return validation(editProfileSchema, input);
};
export default validateEditProfile;

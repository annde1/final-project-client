import Joi from "joi";
import validation from "./schema-validation";

const templateSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(80)
    .required()
    .messages({ "string.empty": "Template name is required" }),
  exercises: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().min(1).required(),
        sets: Joi.array()
          .items(
            Joi.object({
              reps: Joi.number().min(1).required().messages({
                "number.min": "Reps are empty",
                "any.required": "Reps is required",
              }),
              weight: Joi.number().min(1).required().messages({
                "number.min": "Weight is empty ",
                "any.required": "Weight is required",
              }),
            }).empty(null)
          )
          .min(1)
          .required(),
      })
    )
    .min(1)
    .required(),
});

export const validateTemplate = (input) => {
  return validation(templateSchema, input);
};

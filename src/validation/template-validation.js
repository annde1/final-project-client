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
              reps: Joi.number().integer().min(1).required(),
              weight: Joi.number().min(0).required(),
            })
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

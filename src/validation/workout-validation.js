import Joi from "joi";
import validation from "./schema-validation";

const workoutSchema = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  createdAt: Joi.date().required(),
  duration: Joi.number().required(),
  template: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    exercises: Joi.array().items(
      Joi.object({
        name: Joi.string().min(2).max(30).required(),
        sets: Joi.array().items(
          Joi.object({
            reps: Joi.number().required(),
            weight: Joi.number().required(),
          })
        ),
      })
    ),
  }),
  volume: Joi.number().required(),
});

const validateWorkout = (input) => {
  return validation(workoutSchema, input);
};

export default validateWorkout;

const validation = (schema, input) => {
  const error = schema.validate(input, { abortEarly: false });
  if (!error) return null;

  const errors = error.error?.details?.reduce((acc, err) => {
    const path = err.path.join(".");
    const key = path.substring(path.lastIndexOf(".") + 1); // Extract the last part of the path
    acc[key] = err.message;
    return acc;
  }, {});

  return errors;
};

export default validation;

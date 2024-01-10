const validation = (schema, input) => {
  const { error } = schema.validate(input, { abortEarly: false });

  if (!error) {
    return null;
  }
  const errorMessages = error.details
    .map((detail) => detail.message)
    .map((msg) => msg.replace(/"/g, ""));
  console.log(errorMessages);
  return errorMessages;
};
export default validation;

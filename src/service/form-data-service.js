export const constructFormData = (data) => {
  const formData = new FormData();

  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("userName", data.userName);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("age", Number(data.age));
  formData.append("weight", Number(data.weight));
  formData.append("height", Number(data.height));
  formData.append("isPremium", Boolean(data.isPremium));
  formData.append("alt", data.alt);
  formData.append("file", data.file);

  return formData;
};

export const constructEditProfileData = (data) => {
  const formData = new FormData();
  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("userName", data.userName);
  formData.append("email", data.email);
  formData.append("age", Number(data.age));
  formData.append("weight", Number(data.weight));
  formData.append("height", Number(data.height));
  formData.append("file", data.file);
  return formData;
};

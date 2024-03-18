const normalizeEditProfileData = (data) => {
  return {
    firstName: data.firstName?.length ? data.firstName.trim() : data.firstName,
    lastName: data.lastName?.length ? data.lastName.trim() : data.lastName,
    userName: data.userName?.length ? data.userName.trim() : data.lastName,
    email: data.email?.length ? data.email.trim() : data.email,
    age: parseInt(data.age),
    weight: Number(data.weight),
    height: Number(data.height),
    file: data.file,
    alt: data.alt,
  };
};
export default normalizeEditProfileData;

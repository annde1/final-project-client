const normalizeUserData = (data) => {
  return {
    name: {
      firstName: data.firstName,
      lastName: data.lastName,
    },
    userName: data.userName,
    email: data.email,
    password: data.password,
    age: Number(data.age),
    weight: Number(data.weight),
    height: Number(data.height),
    isPremium: Boolean(data.isPremium),
    userType: data.userType,
    file: data.file,
    image: {
      alt: data.alt,
      // url: data.url,
    },
  };
};
export default normalizeUserData;

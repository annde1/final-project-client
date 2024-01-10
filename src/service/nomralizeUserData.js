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
    isPremium: data.isPremium,
    userType: data.userType,
  };
};
export default normalizeUserData;

const normalizeEditProfile = (data, alt, url) => {
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
    image: {
      alt: alt,
      url: url,
    },
  };
};
export default normalizeEditProfile;

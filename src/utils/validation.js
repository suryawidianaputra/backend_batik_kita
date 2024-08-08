export const trimmed = (data) => {
  return data.trim();
};

export const emailValidate = (data) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(data);
};

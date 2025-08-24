export const persistToken = (token) => {
  localStorage.setItem('token', token);
};

export const clearToken = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const setUserData = (userData) => {
  localStorage.setItem('userData', JSON.stringify(userData));
};

export const getUserData = (field) => {
  const raw = localStorage.getItem('userData');
  if (!raw) return null;
  const data = JSON.parse(raw);
  return field ? data[field] : data;
};

export const clearUserData = () => {
  localStorage.removeItem('userData');
};

export const useAuthInfo = () => {
  // gett from local storage
  const getAuthInfo = () => {
    const info = JSON.parse(localStorage.getItem("UserInfo"));

    return info;
  };

  return {
    currentUser: getAuthInfo(),
  };
};

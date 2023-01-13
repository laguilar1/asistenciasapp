
const useLogin = () => {

  const loginUrl = () => {
    const dir = window.location.pathname.split("/", 3);
    const url = window.location.origin + '/' + dir[1] + '/';
    return url;
  }

  return {
      loginUrl
  }
}

export default useLogin

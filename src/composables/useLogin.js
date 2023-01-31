
const useLogin = () => {

  const loginUrl = () => {
    // const dir = window.location.pathname.split("/", 3);
    // const url = window.location.origin + '/' + dir[1];
    // return url;
    return import.meta.env.VITE_URL //sin la barra
  }

  return {
    loginUrl,
  }
}

export default useLogin

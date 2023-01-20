const useRequest = () => {

  const requestSuccess = (config) => {

    config.headers['MyAuthorization'] = `Bearer MyHeader`;
    return config;

  }

  const requestError = (error) => {
      return Promise.reject(error);
  }

  return {
      requestSuccess,
      requestError,
  }
}

export default useRequest

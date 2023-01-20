const useResponse = () => {

  const responseSuccess = (response) => {


    return response;

  }

  const responseError = (error) => {
      return Promise.reject(error);
  }

  return {
      responseSuccess,
      responseError,
  }
}

export default useResponse

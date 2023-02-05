import { useUserStore } from "../store/user";
const useHeader = () => {

  const userStore = useUserStore()

  const config = {
    headers: {
      'ElGrandToken': userStore.user.token
    }
  }

  return {
    config,
  }
}

export default useHeader

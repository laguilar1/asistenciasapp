import { useUserStore } from "../stores/user";
import useLogin  from "../composables/useLogin";

const { loginUrl } = useLogin();

const authGuard = (to, from, next) => {

  const store = useUserStore();

  console.log('guard de auth');
  console.log(store.user.login)
  
  // Si no está logeado entonces entre a logearse
  if (store.user.login) {  
    return next()
  }
  else {
    window.location.href = loginUrl();
    // return false
  }

}
export default authGuard
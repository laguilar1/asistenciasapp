import router from '@/router'
import { useUserStore } from "../stores/user";
import useLogin  from "../composables/useLogin";

const { loginUrl } = useLogin();
// const router = useRouter();

const logoutGuard = (to, from, next) => {

  const store = useUserStore();
  
  console.log('guard logout');
  
  // Si está autenticado borra el login
  if (store.user.login) {  
    return next()
  }
  else {
    // Si lo está redirecciona a principal
    window.location.href = loginUrl();
  }

}
export default logoutGuard
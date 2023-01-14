import { useUserStore } from "../store/user";
import router from '@/router'
// const router = useRouter();

const loginGuard = (to, from, next) => {

  const store = useUserStore();

  console.log('guard login');
  console.log(from)

  // Si no está autenticado, carga los datos
  if (!store.user.login) {
    return next()
  }
  else {
    // Si lo está redirecciona a principal
    // router.replace({ path: '/' });
    router.push({ path: '/' });

  }

}
export default loginGuard

import router from '@/router'

import { useUserStore } from "../store/user";
import useLogin  from "../composables/useLogin";

const { loginUrl } = useLogin();
// const router = useRouter();

const loginGuard = (to, from, next) => {

  const store = useUserStore();

  console.log('guard login');
  console.log(from)

  // Verificar que el redireccionamiento sea del mismo dominio
  let prevUrl = document.referrer;
  console.log(prevUrl, 'prev url -----------------')
  console.log(window.location.host, 'window location host -----------------')

  // Url manual TODO: En produccion se habilita
  // if (!prevUrl) { window.location.href = loginUrl(); }
  // Servidor externo
  // TODO: checar la url exacta del redireccionamiento window.location.host debe ser igual a la url de redirect
  if (prevUrl.indexOf(window.location.host) !== -1) {
    // Accion que se hace si la accion anterior no es del mismo dominio
    window.location.href = loginUrl(); //devolver a pagina de inicio de session
  }


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

import router from '@/router'
import { useUserStore } from "../store/user";
import useLogin from "../composables/useLogin";

import localforage from "localforage";

const { loginUrl } = useLogin();
// const router = useRouter();

const loginGuard = async (to, from, next) => {

  const store = useUserStore();
  const prevUrl = document.referrer;
  // console.log('guard login');
  // console.log(from)
  // // Verificar que el redireccionamiento sea del mismo dominio
  // console.log(prevUrl, 'prev url -----------------')
  // console.log(window.location.host, 'window location host -----------------')

  // TODO: SOLO EN PRODUCCION
  // if (prevUrl !== 'https://wayf.ucol.mx/') {
  //   console.log('Fuente No confiable de autenticacion')
  //   // Borrar store y caché (crear)
  //   try {
  //     store.cleanStore();
  //     await localforage.clear();
  //     await localforage.clear();
  //     window.location.href = loginUrl() + '/logout/';
  //     return false
  //   } catch (err) { console.log(err);}
  //   //window.location.href = loginUrl() + '/logout/';
  // }

  return next()

}
export default loginGuard

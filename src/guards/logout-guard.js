import router from '@/router'

import { useUserStore } from "../store/user";
import useLogin from "../composables/useLogin";
import localforage from "localforage";

const logoutGuard = async (to, from, next) => {

  const store = useUserStore();
  const { loginUrl } = useLogin();

  console.log('guard logout');
  //Borra todo
  //Es Async
  try {
    store.cleanStore();
    // const user = await localforage.getItem('user');
    // const clear = await localforage.clear()
    // NOta: Se ocupa correr dos veces clear para que tenga efecto
    await localforage.clear();
    await localforage.clear();
    window.location.href = loginUrl() + '/logout/';
    return false
    // window.location.href = loginUrl() + '/logout/';
    // return false

  } catch (err) { console.log(err);}

}
export default logoutGuard

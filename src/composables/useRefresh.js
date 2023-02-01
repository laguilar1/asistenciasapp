import router from '@/router'
import { inject, ref } from 'vue';

import { useDataStore } from "../store/data";
import { useStudentStore } from "../store/student";
import { useListStore } from "../store/list";
import { useRoomStore } from "../store/room";
import { useUserStore } from "../store/user";
import useLogin from "../composables/useLogin";

// import useSchool from '../composables/useSchool';

const useRefresh = () => {

  const axios = inject('axios')  // inject

  const dataStore = useDataStore()
  const studentStore = useStudentStore()
  const listStore = useListStore()
  const roomStore = useRoomStore()
  const userStore = useUserStore()
  // const { getMainData } = useSchool();
  const { loginUrl } = useLogin();

  const dialogRefresh = ref(false);
  const loadingRefresh = ref(false);
  const disabledRefresh = ref(false);


  const refresh = () => {

    const id = userStore.user.id
    disabledRefresh.value = true
    axios.get('profesores/asistencia/'+id+'/actualizar')
      .then((response) => {
          if (response.statusText === 'OK') {
            deleteCache()
          } else {
            console.log('error endpoint')
          }
        }).catch((error) => {
          console.error('Error en la petición', error)
          disabledRefresh.value = false
        });
  }

  const deleteCache = () => {
    // Borrar caché local-api-cache
      caches.has('local-api-cache').then(function (hasCache) {
        console.log(hasCache);
        if (hasCache) {
          caches.delete('local-api-cache'); //para que no de error
        }
        // Borrar los storages de pinia
        dataStore.cleanStore()
        listStore.cleanStore()
        studentStore.cleanStore()
        roomStore.cleanStore()
        //Rellenar datos
        // getMainData()
        // loadingRefresh.value = false
        // Redireccionar
        setTimeout(() => {
          // console.log('El sistema será refrescado')
          disabledRefresh.value = true
          dialogRefresh.value = false
          // router.push({ path: '/' });
          window.location.href = loginUrl() + '/home/';
        }, 800);

      }).catch(function () {
        console.log(err);
      });
  }

  return {
    refresh,
    dialogRefresh,
    loadingRefresh,
    disabledRefresh,
  }
}

export default useRefresh

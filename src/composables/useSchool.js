import { inject, ref } from 'vue';
import { useDataStore } from "../store/data";


const dataStore = useDataStore()

const useSchool = () => {
  const axios = inject('axios')  // inject axios
  // .get('https://jsonplaceholder.typicode.com/users')
  const loading = ref(false);
  const errorLoading = ref(false);

  // console.log('url back: ',import.meta.env.VITE_URL_BACK);


  const fetchSchool = () => {

    loading.value = true;
    errorLoading.value = false;

    setTimeout(() => {
      axios.get('/profesores/asistencia/3105')
        .then((response) => {
          if (response.statusText === 'OK') {
            dataStore.loadSchools(response.data.datos)
            loading.value = false;
          }
        }).catch((error) => {
          console.error('Error en la petición', error)
          loading.value = false;
          errorLoading.value = true;
        });
    }, 1000);
  };

  return {
    loading,
    fetchSchool,
    errorLoading,
  }
}

export default useSchool

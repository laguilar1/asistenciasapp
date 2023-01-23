import { inject, ref } from 'vue';
import { useDataStore } from "../store/data";


const dataStore = useDataStore()

const useSchool = () => {
  const axios = inject('axios')  // inject axios
  // .get('https://jsonplaceholder.typicode.com/users')
  const loading = ref(false);

  // console.log('url back: ',import.meta.env.VITE_URL_BACK);


  const fetchSchool = () => {

    loading.value = true;

    setTimeout(() => {
      axios.get(import.meta.env.VITE_URL_BACK+'/profesores/plantel/3105')
      // axios.get('/profesores/plantel/3105')
        .then((response) => {
          console.log(response.data.datos)
          dataStore.loadSchools(response.data.datos)
          loading.value = false;
        });
    }, 1000);
  };

  return {
    loading,
    fetchSchool,
  }
}

export default useSchool

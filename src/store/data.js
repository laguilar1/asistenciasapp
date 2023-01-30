// Utilities
import { ref } from 'vue'
import { defineStore } from 'pinia'

// export const useDataStore = defineStore('data', {
export const useDataStore = defineStore('data', () => {

    const schools = ref([])

    const loadSchools = (items) => {
      schools.value = items;
    }

    const cleanStore = () => {
        schools.value = [];
    }

  // Cambia el estado del arbol original
  // El otro arbol de reactividad está en room
  // store.data y store.room (dependen)
  const changeStatusTakeList = (id_salon, hora, status=1) => {

    status = parseInt(status)

    const idArray = id_salon.split('-')
    const [cvePlantel, cvePlanEstudio, IdCurricula] = idArray

    schools.value.forEach(plantel => {
      if (plantel.cvePlantel === cvePlantel) {

        // console.log(plantel)
        plantel.carreras.forEach(carrera => {
          if (carrera.cvePlanEstudio === cvePlanEstudio) {

            carrera.materias.forEach(materia => {
              if (materia.IdCurricula === IdCurricula) {

                materia.salones.forEach(salon => {
                  if (salon.idSalon === id_salon) {

                    salon.tomadaLista[hora] = status

                  }
                });

              }

            });
          }
        });

      }
    });

  }


  return { schools, cleanStore, loadSchools, changeStatusTakeList }
})

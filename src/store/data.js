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

    console.log('changetakelist',id_salon)
    status = parseInt(status)

    const idArray = id_salon.split('-')
    const [cvePlantel, cvePlanEstudio, idCurricula] = idArray

    // console.log('cvePlantel ', cvePlantel)
    // console.log('cvePlanEstudio ', cvePlanEstudio)
    // console.log('i ', i)

    schools.value.forEach(plantel => {
      if (plantel.cvePlantel === cvePlantel) {

        plantel.carreras.forEach(carrera => {
          if (carrera.cvePlanEstudio === cvePlanEstudio) {

            carrera.materias.forEach(materia => {

              if (materia.idCurricula === idCurricula) {

                materia.salones.forEach(salon => {

                  if (salon.idSalon === id_salon) {
                    salon.tomadaLista[hora-1] = status

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

// Utilities
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRoomStore = defineStore('room', () => {

  const room = ref({})

  const generateRoom = (data) => {
    data.forEach(school => {
        school.carreras.forEach(carrera => {
            carrera.materias.forEach(materia => {
               materia.salones.forEach(salon => {
                 const { vecesLista, idSalon, alumnos } = salon
                //  console.log('salon ->', idSalon);
                //  console.log('veces ->', vecesLista);
                 for (let i = 0; i < vecesLista; i++) {
                   const num = i + 1
                   const newId = idSalon+'-'+num
                   let numStudents = 0
                   const status = salon.tomadaLista[i];

                   room.value[newId] = {}
                   room.value[newId].status = status
                   room.value[newId].updated = 0
                  //  room.value[newId].students = 0

                   alumnos.forEach(alumno => {
                      numStudents ++
                   });

                   room.value[newId].students = numStudents
                 }


               });
            });
        });
    });
  }

  // status, bandera para saber si ya a tomado lista
  const changeStatusRoom = (newId, status) => {
    status = parseInt(status)
    room.value[newId].status = status;
  }

  // updated, bandera para saber si hay cambios no guardados
  const changeUpdatedRoom = (newId, status) => {
    status = parseInt(status)
    room.value[newId].updated = status;
  }

  return { room, generateRoom, changeStatusRoom, changeUpdatedRoom}
})

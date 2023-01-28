// Utilities
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRoomStore = defineStore('room', () => {

  const room = ref({})

  const generateRoom = (data) => {
    data.forEach(school => {
        const {plantel, fecha} = school
      school.carreras.forEach(carrera => {
            const {planEstudio} = carrera
        carrera.materias.forEach(materia => {
              const {Materia} = materia
               materia.salones.forEach(salon => {
                 const { vecesLista, idSalon, alumnos, nombre } = salon
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
                   room.value[newId].plantel = plantel
                   room.value[newId].planEstudio = planEstudio
                   room.value[newId].materia = Materia
                   room.value[newId].grado = nombre
                   room.value[newId].fecha = fecha
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

  const getStatus =  (idSalon, hora) => {
    try {
      return room.value[idSalon + '-' + (hora)].status
    } catch(err) {
      console.log(err)
    }
  }

  const getStudents = (idSalon) => {
    try {
      // return room[idSalon + '-' + (hora)].status
      return room.value[idSalon + '-1'].students

    } catch(err) {
      console.error('---',err)
    }
  }
  const getDate = (idSalon) => {
    try {
      // return room[idSalon + '-' + (hora)].status

      let fecha = room.value[idSalon + '-1'].fecha.split("-")
      return `${fecha[2]}/${fecha[1]}/${fecha[0]}`

    } catch(err) {
      console.error('---',err)
    }
  }




  return { room, generateRoom, changeStatusRoom, changeUpdatedRoom, getStatus, getStudents, getDate}
})

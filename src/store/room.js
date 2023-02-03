// Utilities
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRoomStore = defineStore('room', () => {

  const room = ref({})

  const generateRoom = (data, date) => {
    data.forEach(school => {
        const {plantel, fecha} = school
      school.carreras.forEach(carrera => {
            const {planEstudio} = carrera
        carrera.materias.forEach(materia => {
              const {mat} = materia
               materia.salones.forEach(salon => {
                 const { vecesLista, idSalon, alumnos, nombreSalon } = salon
                //  console.log('salon ->', idSalon);
                //  console.log('veces ->', vecesLista);
                 for (let i = 0; i < vecesLista; i++) {
                   const num = i + 1
                   const newId = idSalon+'-'+num+ '-' +date
                   let numStudents = 0
                   const status = salon.tomadaLista[i];

                   room.value[newId] = {}
                   room.value[newId].status = status
                   room.value[newId].updated = 0
                   room.value[newId].plantel = plantel
                   room.value[newId].planEstudio = planEstudio
                   room.value[newId].materia = mat
                   room.value[newId].grado = nombreSalon
                  //  room.value[newId].fecha = fecha
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

  const getStatus =  (idSalon, hora, date) => {
    try {
      return room.value[idSalon + '-' + (hora)+'-'+date].status
    } catch(err) {
      console.log(err)
    }
  }

  const getStudents = (idSalon,date) => {
    try {
      // return room[idSalon + '-' + (hora)].status
      return room.value[idSalon + '-1-'+date].students

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

  const cleanStore = () => {
     room.value = {};
  }

  //Computed
  const countClosed = computed(() => {
    let n = 0
    for (const property in room.value) {
      let status = room.value[property].status
      if (status === 2) {n++}
      // console.log(`${property}: ${room.room[property].status}`);
    }
    return  n;
  });
  // En espera
  const onHold = computed(() => {
    let n = 0
    for (const property in room.value) {
      let status = room.value[property].status
      if (status === 0 || status === 2) {n++}
      // console.log(`${property}: ${room.room[property].status}`);
    }
    return  n;
  });




  return { room, generateRoom, changeStatusRoom, changeUpdatedRoom, getStatus, getStudents, getDate, cleanStore, countClosed, onHold}
})

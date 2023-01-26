// Utilities
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStudentStore = defineStore('student', () => {
  const students = ref({})

  // Get student from schools[]
  const getStudents = (schoolsArray) => {
    const items = {}
    console.log(schoolsArray, 'schools array');
    schoolsArray.forEach(school => {
      school.carreras.forEach(carrera => {
          carrera.materias.forEach(materia => {
            materia.salones.forEach(salon => {
              salon.alumnos.forEach(alumno => {
                const {idAlumno, noCta, nombreCompleto} = alumno
                items[idAlumno] = nombreCompleto
              });
            });
          });
      });
    });
    return items
  }

  return { students, getStudents}
})

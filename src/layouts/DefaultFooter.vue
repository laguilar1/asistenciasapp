<script setup>

const icons = [
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
  'mdi-instagram',
]


</script>
<template>
  <v-footer class="d-flex flex-column" app color="black">
    <!-- <div class="d-flex w-100 align-center px-4">
      <strong>¡Conecta con nosotros en nuestras redes sociales!</strong>

      <v-spacer></v-spacer>

      <v-btn v-for="icon in icons" :key="icon" class="mx-4" :icon="icon" variant="plain" size="small"></v-btn>
    </div> -->

    <div class="px-4 pys-2 text-center w-100">
      <!-- {{ new Date().getFullYear() }} —  -->

        <!-- <span class="d-flex d-sm-none">
          Universidad de Colima V1.0.0
        </span>
        <span class="d-none d-sm-flex">
          © Derechos Reservados 2022 - 2025  Universidad de Colima V1.0.0
        </span> -->

          <div class="d-flex justify-space-between">
            <div>
              Universidad de Colima
            </div>
            <div>
            </div>
            <div>
              V1.0.0
            </div>
          </div>


    </div>
  </v-footer>
</template>


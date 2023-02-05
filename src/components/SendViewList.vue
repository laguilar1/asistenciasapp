<script setup>
import { ref } from 'vue';
import { useOnline } from '@vueuse/core'

import useStatus from '../composables/useStatus'

import ModalSave from '@/components/ModalSave.vue'

const props = defineProps({
  plantel: {
    type: String,
    required: true
  },
  planEstudio: {
    type: String,
    required: true
  },
  grado: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  newId: {
    type: String,
    required: true
  },
})
const { plantel, planEstudio, grado, status } = props;
const { statusColor } = useStatus();
const online = useOnline()
const dialogSave = ref(false)

const statusModalSave = (value) => {
  dialogSave.value = value
}


const getDateNewId = (newId) => {
  const arrayNewId = newId.split('-');
  return arrayNewId[6] + '-' + arrayNewId[7] + '-' + arrayNewId[8]
}

const getHoraNewId = (newId) => {
  const arrayNewId = newId.split('-');
  return arrayNewId[5]
}

const getSalonNewId = (newId) => {
  const arrayNewId = newId.split('-');
  return arrayNewId[0] + '-' + arrayNewId[1] + '-' + arrayNewId[2] + '-' + arrayNewId[3] + '-' + arrayNewId[4]
}

</script>
<template>

<!-- Dialog Save -->
<ModalSave
  :modal="dialogSave"
  :salon="getSalonNewId(newId)"
  :hora="getHoraNewId(newId)"
  :date="getDateNewId(newId)"
  hiddenClose = "true"
  @emitClose="statusModalSave" />
<!-- {{ newId }} +++
Salon:
{{ getSalonNewId(newId) }}
Hora:
{{ getHoraNewId(newId) }}
Date:
{{ getDateNewId(newId) }} -->
<v-list>
  <v-list-item :title="plantel">
    <v-list-item-subtitle>
      {{ planEstudio }} - {{ grado }} - {{ status }}
      <!-- <v-icon>mdi-check</v-icon> -->
    </v-list-item-subtitle>

    <!-- <template v-slot:prepend>
                      <v-avatar color="grey">
                        <v-icon color="white">mdi-check</v-icon>
                      </v-avatar>
                    </template> -->

    <template v-slot:append>
      <v-btn :color="statusColor(status)" icon="mdi-send" variant="text" @click="dialogSave = true"
      :disabled="!online"></v-btn>
    </template>
  </v-list-item>
</v-list>

</template>

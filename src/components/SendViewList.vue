<script setup>
import useStatus from '../composables/useStatus'

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
})
const { plantel, planEstudio, grado, status } = props;
const { statusColor } = useStatus();
</script>
<template>
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
      <v-btn :color="statusColor(status)" icon="mdi-send" variant="text"></v-btn>
    </template>
  </v-list-item>
</v-list>

</template>

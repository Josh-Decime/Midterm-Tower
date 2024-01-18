<template>
  <div v-for="event in events">
    {{ event.name }}
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { eventService } from '../services/EventService.js';
import { AppState } from '../AppState.js';

export default {
  setup() {
    onMounted(() => {
      getAllEvents()
    })

    const filterBy = ref('')

    async function getAllEvents() {
      try {
        await eventService.getAllEvents()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {

      events: computed(() => {
        if (filterBy.value) {
          return AppState.events.filter(event => event.type == filterBy.value)
        } else {
          return AppState.events
        }
      })

    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>

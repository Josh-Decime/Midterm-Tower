<template>
  <section class="container-fluid">
    <section class="row bg-secondary px-3 ">
      <button class="col btn btn-outline-light border-0 my-0">All</button>
      <button class="col btn btn-outline-light border-0 my-0">Expos</button>
      <button class="col btn btn-outline-light border-0 my-0">Conventions</button>
      <button class="col btn btn-outline-light border-0 my-0">Exhibits</button>
      <button class="col btn btn-outline-light border-0 my-0">Sports</button>
      <button class="col btn btn-outline-light border-0 my-0">Digital</button>
      <button class="col btn btn-outline-light border-0 my-0">Concerts</button>
    </section>
    <!-- <section class="row">
      <section class="col-11"> -->
    <div class="row">
      <div v-for="event in events" class="col-6 col-md-3">
        <EventCard :event="event" />
      </div>
    </div>
  </section>
  <!-- </section>
    <section class="col-1">
      <div>
        <h1>stuff here</h1>
        <Login />
      </div>
    </section>
  </section> -->
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { eventService } from '../services/EventService.js';
import { AppState } from '../AppState.js';
import EventCard from '../components/EventCard.vue';
import Login from '../components/Login.vue';

export default {
  setup() {
    onMounted(() => {
      getAllEvents();
    });
    const filterBy = ref('');
    async function getAllEvents() {
      try {
        await eventService.getAllEvents();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    return {
      events: computed(() => {
        if (filterBy.value) {
          return AppState.events.filter(event => event.type == filterBy.value);
        }
        else {
          return AppState.events;
        }
      })
    };
  },
  components: { EventCard, Login }
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

.button-styling {
  color: white;
  border-radius: 15px;
}

.button-styling:hover {
  background-color: white;
  color: black;
}
</style>

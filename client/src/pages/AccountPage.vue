<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="row">
    <p>All of your tickets:</p>
    <div v-for="ticket in tickets" class="bg-secondary mt-1 mx-2 col-3">
      <div class="row">
        <div class="col-12 col-md-5">
          <router-link :to="{ path: `/eventDetails/${ticket.event.id}` }">
            <img :src="ticket.event.coverImg" :alt="ticket.event.name" class="">
          </router-link>
        </div>
        <div class="col-12 col-md-6">
          <p>{{ ticket.event.name }}</p>
          <button class="btn btn-danger pt-0 mb-1">Unattend</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { onMounted } from 'vue';
import { accountService } from '../services/AccountService.js';
export default {
  setup() {
    onMounted(() => getMyTickets())
    const tickets = computed(() => AppState.tickets)

    async function getMyTickets() {
      console.log('getting tickets')
      await accountService.getMyTickets()
    }


    return {
      account: computed(() => AppState.account),
      tickets,
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>

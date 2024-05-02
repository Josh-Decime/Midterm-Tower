<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div>
    <p>All of your tickets:</p>
    <div v-for="ticket in tickets"> ticket</div>
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

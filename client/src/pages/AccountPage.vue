<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { onMounted } from 'vue';
export default {
  setup() {
    onMounted(() => getMyTickets)

    async function getMyTickets() {
      console.log('getting tickets')
      await accountService.getMyTickets()
    }


    return {
      account: computed(() => AppState.account),
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>

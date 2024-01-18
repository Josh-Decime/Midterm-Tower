<template>
  <header>
    <Navbar />
  </header>
  <main>
    <!-- <div class="container-fluid">
      <div class="row">
        <section class="col-11"> -->
    <router-view />
    <!-- </section>
        <section class="col-1">
          <CustomLogin />
        </section>
      </div>
    </div> -->
  </main>
  <!-- <footer class="bg-dark text-light">
    Made with 💖 by CodeWorks
  </footer> -->
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Login from './components/Login.vue'
import CustomLogin from './components/CustomLogin.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Login }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>

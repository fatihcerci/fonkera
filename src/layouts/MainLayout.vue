<template>

  <q-layout view="lHh Lpr lFf">
    <q-header class="text-white bg-secondary" height-hint="10">
      <q-toolbar class="">
        <h6 class="text-white q-my-xs q-px-xs">FONKERA</h6>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>



  </q-layout>
</template>

<script>
import { onMounted, reactive } from "vue"
import { useQuasar } from 'quasar'

export default {
  name: "MainLayout",
  components: {
  },
  setup() {
    const $q = useQuasar()

    onMounted(async () => {

    })
    return {

    }
  },
}
</script>

<style lang="css">

</style>

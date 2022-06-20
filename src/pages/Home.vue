<template>
  <q-page q-layout view="hHh lpR fFf">

    <p class="font-18"> {{ resp }} </p>

  </q-page>
</template>

<script>
import { defineAsyncComponent, onMounted, ref, toRefs, reactive } from "vue"
import { useQuasar } from 'quasar'
import apiService from "../services/apiService"

export default {
  name: "Home",
  components: {

  },

  setup() {

    const { fetch, dataList } = apiService()

    const state = reactive({
      resp : null
    })


    onMounted(async () => {
      try {
        const bodyData = {
          username : "fatih_cerci",
          password : "123456"
        }
        await fetch("test_method", bodyData, true)
        console.log(dataList.value)
        state.resp = dataList.value
      } catch (e) {
      }
    })


    return {
      ...toRefs(state),
    }
  },
}
</script>

<style>

</style>

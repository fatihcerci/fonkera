<template>
  <div class="row q-pa-md">
    <div class="col-12">
      <q-card flat class="bg-grey-2">
        <q-card-section>
          <div class="text-h6">Kullanıcı Ekle</div>
        </q-card-section>


        <q-card-section class="">
          <q-form
          class="q-gutter-md"
          @reset="onReset"
        >
        
          <q-input
            filled  
            v-model="adi"
            label="Adı"
          />
          <q-input
            filled  
            v-model="soyadi" 
            label="Soyadı" 
            />
          <q-input
            filled
            v-model="unvan"
            label="Unvan"
          />
          <q-input
            filled
            v-model="gsm"
            label="Telefon"
          />
          <q-input
            filled
            v-model="eposta"
            label="Eposta"
          />

          <div>
            <q-btn label="Kaydet" type="submit" color="primary"/>
            <q-btn label="Temizle" type="reset" color="primary" class="q-ml-sm" />
          </div>

        </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, onMounted, ref, toRefs, reactive } from "vue"
import { useQuasar } from 'quasar'
import apiService from "../services/apiService"

export default {
  name: "UserView",
  components: {

  },

  setup() {

    const { fetch, dataList } = apiService()

    const state = reactive({
      adi : null,
      soyadi : null,
      unvan : null,
      gsm : null,
      eposta : null
    })

    
    onMounted(async () => {
      try {
        const bodyData = {
          username : "fatih_cerci",
          password : "123456"
        }
        //await fetch("test_method", bodyData, true)
      } catch (e) {
      }
    })


    return {
      ...toRefs(state),
      onReset () {
        state.adi = null,
        state.soyadi = null,
        state.unvan = null,
        state.gsm = null,
        state.eposta = null
      }
    }
  },
}
</script>

<style>

</style>

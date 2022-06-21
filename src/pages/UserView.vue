<template>
  <div class="row q-pa-md">
    <div class="col-12">
      <q-card flat class="bg-grey-2">
        <q-card-section>
          <div class="text-h6">Kullanıcı Ekle</div>
        </q-card-section>


        <q-card-section class="q-gutter-md">
          <q-input
            filled
            v-model="name"
            label="Adı"
            :rules="[val => !!val || 'Zorunlu alan']"
          />
          <q-input
            filled
            v-model="surname"
            label="Soyadı"
            :rules="[val => !!val || 'Zorunlu alan']"
            />
          <q-input
            filled
            v-model="title"
            label="Unvan"
          />
          <q-input
            filled
            v-model="phone"
            label="Telefon"
            mask="0(###) ### ####"
          />
          <q-input
            filled
            v-model="email"
            label="Eposta"
          />

          <div>
            <q-btn label="Kaydet" color="primary" @click="saveUser()"/>
            <q-btn label="Temizle" color="primary" @click="onReset" class="q-ml-sm" />
          </div>

        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, onMounted, ref, toRefs, reactive } from "vue"
import { useQuasar } from 'quasar'
import { useRouter } from "vue-router"
import apiService from "../services/apiService"
import userController from "../controllers/userController"

export default {
  name: "UserView",
  components: {

  },

  setup() {

    const { fetch, dataList } = apiService()

    const { selectedUser } = userController()

    const state = reactive({
      id : selectedUser.value ? selectedUser.value.id : null,
      status : selectedUser.value ? selectedUser.value.status : null,
      name : selectedUser.value ? selectedUser.value.name : null,
      surname : selectedUser.value ? selectedUser.value.surname : null,
      title : selectedUser.value ? selectedUser.value.title : null,
      phone : selectedUser.value ? selectedUser.value.phone : null,
      email : selectedUser.value ? selectedUser.value.email : null
    })

    const router = useRouter()

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

    const saveUser = async () => {
      debugger
      try {
        await fetch("create_user", state, true)
        if(dataList.value.status.success) {
          router.push("/users")
        }
      } catch (e) {
      }
    }


    return {
      router,
      ...toRefs(state),
      saveUser,
      onReset () {
        state.name = null,
        state.surname = null,
        state.title = null,
        state.phone = null,
        state.email = null
      }
    }
  },
}
</script>

<style>

</style>

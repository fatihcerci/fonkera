<template>

  <q-layout view="hHh lpR fFf">
    <q-header elevated class="text-white bg-primary glossy" height-hint="10">
      <q-toolbar class="">

        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          FONKERA
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered class="bg-grey-3">

      <q-item  class="bg-grey-8 q-pa-md">
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>
        <q-item-section class="text-white font-16">Admin Kullanıcısı</q-item-section>
      </q-item>

      <q-list class="rounded-borders text-primary">

        <q-item
          clickable
          @click="router.push('/')"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>Ana Sayfa</q-item-section>
        </q-item>

        <q-expansion-item :content-inset-level="0.5" expand-separator icon="corporate_fare" label="Organizasyon Tanımları">

          <q-item
            clickable
            @click="router.push('/groups')"
          >
            <q-item-section avatar>
              <q-icon name="groups" />
            </q-item-section>

            <q-item-section>Grup Tanımları</q-item-section>
          </q-item>

          <q-item
            clickable
            @click="router.push('/roles')"
          >
            <q-item-section avatar>
              <q-icon name="manage_accounts" />
            </q-item-section>

            <q-item-section>Rol Tanımları</q-item-section>
          </q-item>

          <q-item
            clickable
            @click="router.push('/users')"
          >
            <q-item-section avatar>
              <q-icon name="person_add" />
            </q-item-section>

            <q-item-section>Kullanıcı Tanımları</q-item-section>
          </q-item>

        </q-expansion-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>



  </q-layout>
</template>

<script>
import { onMounted, ref} from "vue"
import { useQuasar } from 'quasar'
import { useRouter } from "vue-router"

export default {
  name: "MainLayout",
  components: {
  },
  setup() {
    const $q = useQuasar()

    const router = useRouter()

    const leftDrawerOpen = ref(false)

    onMounted(async () => {

    })
    return {
      router,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      link: ref('home')
    }
  },
}
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #F2C037
</style>

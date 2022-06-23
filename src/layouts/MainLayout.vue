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
            @click="router.push('/organization/groups')"
          >
            <q-item-section avatar>
              <q-icon name="groups" />
            </q-item-section>

            <q-item-section>Grup Tanımları</q-item-section>
          </q-item>

          <q-item
            clickable
            @click="router.push('/organization/roles')"
          >
            <q-item-section avatar>
              <q-icon name="manage_accounts" />
            </q-item-section>

            <q-item-section>Rol Tanımları</q-item-section>
          </q-item>

          <q-item
            clickable
            @click="router.push('/organization/users')"
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
      <!--
      <div class="q-pa-sm" v-if="$q.screen.gt.sm">
          <q-toolbar class="bg-grey-8 text-white font-12 shadow-1 rounded-borders">
            <q-breadcrumbs active-color="white">
              <q-breadcrumbs-el label="Ana Sayfa" icon="home" to="/" />
              <q-breadcrumbs-el label="Organizasyon Tanımları" icon="corporate_fare" />
              <q-breadcrumbs-el label="Kullanıcı Tanımları" icon="person_add" />
            </q-breadcrumbs>
          </q-toolbar>
      </div>
      -->

      <div class="q-pa-sm" v-if="$q.screen.gt.sm">
          <q-toolbar class="bg-grey-8 text-white font-12 shadow-1 rounded-borders">
            <q-breadcrumbs active-color="white">
              <q-breadcrumbs-el v-for="item in crumbs" :key="item.text" :label="item.text" :icon="item.icon" :to="item.to" />
            </q-breadcrumbs>
          </q-toolbar>
      </div>

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
  computed: {
    crumbs: function() {
      debugger
      let pathArray = this.$route.path.split("/")
      //pathArray.shift()
      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        if(!this.$route.matched[idx]) {
          return breadcrumbArray
        }

        if(this.$route.matched[idx].meta && this.$route.matched[idx].meta.parent) {
          let breadCrumbObj = {
            path: this.$route.matched[idx].meta.parent.path,
            to: this.$route.matched[idx].meta.parent.path,
            text: this.$route.matched[idx] ? (this.$route.matched[idx].meta.parent.breadCrumb || path) : (this.$route.matched[idx-1].meta.parent.breadCrumb || path),
            icon: this.$route.matched[idx] ? this.$route.matched[idx].meta.parent.icon : this.$route.matched[idx-1].meta.parent.icon,
          }
          breadcrumbArray.push(breadCrumbObj)

          breadCrumbObj = {
            path: this.$route.matched[idx].path,
            to: this.$route.matched[idx].path,
            text: this.$route.matched[idx].meta.breadCrumb,
            icon: this.$route.matched[idx].meta.icon
          }

          if(breadCrumbObj.to.includes("//")) {
            breadCrumbObj.to = breadCrumbObj.to.substring(1, breadCrumbObj.to.length)
          }
          breadcrumbArray.push(breadCrumbObj)

        } else {
          let breadCrumbObj = {
            path: path,
            to: breadcrumbArray[idx - 1]
              ?  breadcrumbArray[idx - 1].to + "/" + path
              : "/" + path,
            text: this.$route.matched[idx] ? (this.$route.matched[idx].meta.breadCrumb || path) : (this.$route.matched[idx-1].meta.breadCrumb || path),
            icon: this.$route.matched[idx] ? this.$route.matched[idx].meta.icon : this.$route.matched[idx-1].meta.icon,
          }

          if(breadCrumbObj.to.includes("//")) {
            breadCrumbObj.to = breadCrumbObj.to.substring(1, breadCrumbObj.to.length)
          }
          breadcrumbArray.push(breadCrumbObj)
        }

        return breadcrumbArray
      }, [])
      return breadcrumbs
    }
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

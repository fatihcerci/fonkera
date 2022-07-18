<template>

  <q-layout view="hHh lpR fFf">

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" style="background: #283046 !important;">

      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/logo.36f34a9f.svg">
          </q-avatar>
        </q-item-section>
        <q-item-section style="color:rgb(203 200 229) !important; font-weight: 600; font-size: 1.45rem;">FONKERA</q-item-section>
      </q-item>

      <q-list class="rounded-borders text-white q-pl-sm q-pr-sm">

        <q-item
          clickable
          @click="router.push('/')"
          :active="getMenu().includes('home')"
          active-class="menu-active"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section>Ana Sayfa</q-item-section>
        </q-item>

        <q-item
          clickable
          @click="router.push('/emailsettings')"
          :active="getMenu().includes('emailsettings')"
          active-class="menu-active"
        >
          <q-item-section avatar>
            <q-icon name="mail" />
          </q-item-section>

          <q-item-section>E-posta Ayarları</q-item-section>
        </q-item>

        <q-expansion-item v-model="expanded" :content-inset-level="0.5" expand-separator icon="corporate_fare" label="Organizasyon Tanımları" >

          <q-item
            clickable
            @click="router.push('/organization/groups')"
            :active="getMenu().includes('groups')"
            active-class="menu-active"

          >
            <q-item-section avatar>
              <q-icon name="groups" />
            </q-item-section>

            <q-item-section>Grup Tanımları</q-item-section>
          </q-item>

          <q-item
            clickable
            @click="router.push('/organization/roles')"
            :active="getMenu().includes('roles')"
            active-class="menu-active"

          >
            <q-item-section avatar>
              <q-icon name="manage_accounts" />
            </q-item-section>

            <q-item-section>Rol Tanımları</q-item-section>
          </q-item>

          <q-item
            clickable
            @click="router.push('/organization/users')"
            :active="getMenu().includes('users')"
            active-class="menu-active"
          >
            <q-item-section avatar>
              <q-icon name="person_add" />
            </q-item-section>

            <q-item-section>Kullanıcı Tanımları</q-item-section>
          </q-item>

        </q-expansion-item>

      </q-list>
    </q-drawer>



    <q-page-container class="q-pt-sm bg-grey-2">
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

      <div class="q-pl-sm q-pr-sm">
        <q-toolbar class="bg-white text-grey-8 font-13 rounded-borders shadow-25">
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" v-if="!$q.screen.gt.sm" />
          <q-breadcrumbs active-color="" v-if="$q.screen.gt.sm">
            <q-breadcrumbs-el v-for="item in crumbs" :key="item.text" :label="item.text" :icon="item.icon" :to="item.to" />
          </q-breadcrumbs>

          <q-space />

          <q-select class="language" borderless v-model="language" :options="options" :options-html="true">
            <template v-slot:selected>
              <q-chip
                v-if="language && $q.screen.gt.sm"
                dense
                square
                color="white"
                text-color="primary"
                class="q-my-none q-ml-xs q-mr-none"
              >
                <q-icon size="sm" class="q-mr-sm">
                  <img :src="getIcon" />
                </q-icon>

                {{ language.labelStr }}


              </q-chip>

              <q-chip
                v-if="language && !$q.screen.gt.sm"
                dense
                square
                color="white"
                text-color="primary"
                class="q-my-none q-ml-xs q-mr-none"
              >
                <q-icon size="sm" class="q-mr-sm">
                  <img :src="getIcon" />
                </q-icon>

              </q-chip>
            </template>
          </q-select>

          <q-btn flat round size="md" icon="notifications">
            <q-badge color="red" class="" rounded floating>5</q-badge>
          </q-btn>

          <q-item class="cursor-pointer">
            <q-item-section>
              <q-item-label class="font-14 text-bold">Prof.Dr.Fatih Çerçi</q-item-label>
            </q-item-section>
            <q-item-section side v-if="$q.screen.gt.sm">
              <q-avatar size="48px">
                <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
              </q-avatar>
            </q-item-section>

            <q-menu fit flat :offset="[40, 2]" class="user-menu no-shadow text-grey-7">
              <q-item clickable>
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Profil</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="inbox" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Gelen Kutusu</q-item-label>
                </q-item-section>
              </q-item>


              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="task_alt" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Yapılacaklar</q-item-label>
                </q-item-section>
              </q-item>


              <q-separator />

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Çıkış Yap</q-item-label>
                </q-item-section>
              </q-item>


            </q-menu>

          </q-item>
        </q-toolbar>

      </div>

      <router-view />
    </q-page-container>



  </q-layout>
</template>

<script>
import { onMounted, ref, computed} from "vue"
import { useQuasar } from 'quasar'
import { useRouter } from "vue-router"

import menuController from "../controllers/menuController"

export default {
  name: "MainLayout",
  components: {
  },
  computed: {
    crumbs: function() {
      this.setMenu(this.$route.meta.menu)

      let pathArray = this.$route.path.split("/")

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

    const expanded = router.currentRoute.value.path.includes('organization') ? ref(true) : ref(false)

    const leftDrawerOpen = ref(false)

    const { menu, getMenu, setMenu } = menuController()

    const language = ref({
      label: "<img width='20px' src='flags/tr.svg' /> Türkçe",
      labelStr: "Türkçe",

      iconSrc: 'flags/tr.svg'
    })

    const options = [
      {
        label: "<img width='20px' src='flags/tr.svg' /> Türkçe",
        labelStr: "Türkçe",
        iconSrc: 'flags/tr.svg'
      },
      {
        label: "<img width='20px' src='flags/az.svg' /> Azərbaycanca",
        labelStr: "Azərbaycanca",
        iconSrc: 'flags/az.svg'
      },
      {
        label: "<img width='20px' src='flags/us.svg' /> English",
        labelStr: "English",
        iconSrc: 'flags/us.svg'
      },
    ]

    const getIcon = computed(() => {
      return language.value.iconSrc
    })

    onMounted(async () => {
    })
    return {
      router,
      expanded,
      getMenu,
      setMenu,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      language,
      options,
      getIcon
    }
  },
}
</script>

<style lang="css">
  .q-item__section--avatar {
    min-width: 0px !important;
  }

  .user-menu {
    -webkit-box-shadow: 0 5px 25px rgb(34 41 47 / 10%) !important;
    box-shadow: -1 5px 25pxrgba(34,41,47,.1) !important;
    border:1px solid rgba(34,41,47,.1);
  }

  .q-badge--floating {
    top: 1px !important;
    right: -2px !important;
  }

  .user-menu .q-hoverable:hover {
    color: #6610f2 !important;
  }

  .user-menu .q-hoverable:hover > .q-focus-helper {
    background-color: #6610f2 !important;
  }

  .menu-active {
    background: linear-gradient(118deg,#7367f0,rgba(115,103,240,.7)) !important;
    color : white !important;
    -webkit-box-shadow: 0 0 10px 1px rgb(115 103 240 / 70%) !important;
    box-shadow: 0 0 10px 1px rgba(115,103,240,.7) !important;
    border-radius: 4px !important;
  }

  .language .q-select__dropdown-icon {
    display: none !important;
  }


</style>

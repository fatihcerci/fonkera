<template>
  <q-page class="row">
    <div
      class="
        full-width
        row
      "
    >
      <div :class="$q.screen.gt.md ? 'col-8' : 'col-grow'" class="items-center justify-center bg-grey-2">

          <q-toolbar class="q-py-sm q-px-md">

            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/logo.36f34a9f.svg">
                </q-avatar>
              </q-item-section>
              <q-item-section style="color:#6610f2 !important; font-weight: 800 !important; font-size: 1.45rem;">FONKERA</q-item-section>
            </q-item>
            
          </q-toolbar>

        <div class="row items-center justify-center q-pa-xl">
          <img src="~/assets/login-fonkera.svg" />
        </div>

      </div>

      <div :class="$q.screen.gt.md ? 'col-4' : 'col-grow'" style="border-left:1px solid #ebebeb;" class="row justify-center items-center q-pa-lg">
        <q-card flat square no-border class="full-width">
          <q-card-section>
            <p class="card-text-color font-30" style="font-weight:800 !important;">Welcome to Fonkera!</p>
            <h6 class="text-grey-6">Aşağıdaki bilgileri doldurarak hesabınıza giriş yapabilirsiniz</h6>
            <q-form class="q-px-sm">
              <q-input
                v-on:keyup.enter="doLogin"
                ref="userCode"
                square
                clearable
                v-model="creds.userCode"
                type="input"
                label="E-posta Adresi"
                :rules="[
                  (val) => !!val || 'E-posta Adresi zorunlu alandır',
                ]"
                input-class="text-uppercase"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                v-on:keyup.enter="doLogin"
                ref="password"
                square
                clearable
                v-model="creds.password"
                :type="passwordFieldType"
                label="Şifre"
                :rules="[(val) => !!val || 'Şifre zorunlu alandır']"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="visibilityIcon"
                    @click="switchVisibility"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>


              <div class="row q-pb-md q-col-gutter-md" >
                <div class="col-lg-8 col-md-6 col-sm-12 col-xs-12 module">
                  <q-input
                    v-on:keyup.enter="doLogin"
                    ref="captcha"
                    square
                    clearable
                    v-model="creds.captcha"
                    type="input"
                    label="Resimdeki Metin"
                    :rules="[
                      (val) => !!val || 'Resimdeki Metin zorunlu alandır',
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="autorenew" @click="refresh()" class="cursor-pointer" />
                    </template>
                  </q-input>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12" >
                  <q-img
                    ref="captcha"
                    square
                    clearable
                    :src="url"
                    @click="refresh()"
                  />
                </div>
              </div>
              
            </q-form>

            <q-card-actions class="q-pa-none q-px-sm justify-center">
              <q-btn
                unelevated
                size="lg"
                color="primary"
                @click="doLogin"
                class="full-width text-white text-capitalize"
                label="Giriş Yap"
              />
            </q-card-actions>

          </q-card-section>

          

          

        </q-card>
        <q-card-actions v-if="$q.screen.gt.md">
            <a href="javascript:void(0)" class="text-white font-18" @click="goHome()"> Ana Sayfa </a>
            <span class="text-white font-16">&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
            <a href="javascript:void(0)" class="text-white font-18" @click="goForgotPassword()"> Şifremi Unuttum</a>
        </q-card-actions>

        <q-card-actions v-if="!$q.screen.gt.md" class="no-wrap items-center">
          <a href="javascript:void(0)" class="text-red text-bold font-16"  @click="goForgotPassword()"> Şifremi Unuttum</a>
        </q-card-actions>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue"
//import { useQuasar } from "quasar"
import { useRouter } from "vue-router"
//import usersService from "../services/usersService"
import notify from "../helpers/notification"
import { Api } from "../helpers/api"

export default defineComponent({
  name: "UserLogin",
  setup() {
    const router = useRouter()
    //const $q = useQuasar()
    //const { login, logout, hasUser, sessionInfo, displayError, displayMessages } = usersService()
    const passwordFieldType = ref("password")
    const visibility = ref(false)
    const visibilityIcon = ref("visibility")
    const creds = ref({
      userCode: "",
      password: "",
      captcha: ""
    })

    const url = ref(Api.Base.ServiceURL + '/../simpleCaptcha.png?v='+Math.random())

    const doLogin = async () => {
      try {
        const { userCode, password, captcha } = creds.value
        await login(userCode, password, captcha)
        if (sessionInfo.value) {
          localStorage.setItem(
            "sessionInfo",
            sessionInfo.value.extra.sessionInfo
          )
          localStorage.setItem("expertCode", userCode)

          if(sessionStorage.getItem("redirectPath")) {
            router.replace(sessionStorage.getItem("redirectPath"))
          } else {
            router.replace("/")
          }
          
        } else {
          await logout()
          router.replace("/auth")
        }
        if (displayError.value) throw new Error(displayMessages.value[0].text)
      } catch (e) {
        refresh()
        notify().error(e.message)
        router.replace("/auth")
      }
    }

    const switchVisibility = () => {
      visibility.value = !visibility.value
      passwordFieldType.value = visibility.value ? "text" : "password"
      visibilityIcon.value = visibility.value ? "visibility_off" : "visibility"
    }

    const goHome = () => {
      router.push("/")
      //router.replace("/")
    }

    const goForgotPassword = () => {
      router.push("/forgetpassword")
    }

    const refresh = () => {
        url.value = Api.Base.ServiceURL + '/../simpleCaptcha.png?v='+Math.random()
        creds.value.captcha = ""
    }

    onMounted(async () => {
      if(hasUser()) {
        goHome()
      }
    })

    const goAppealPage = () => {
      window.open(
        Api.Base.AppealURL,
        '_blank'
      )
    }


    return {
      router,
      passwordFieldType,
      visibility,
      visibilityIcon,
      creds,
      goHome,
      goForgotPassword,
      doLogin,
      switchVisibility,
      url,
      refresh,
      goAppealPage
    }
  },
})
</script>

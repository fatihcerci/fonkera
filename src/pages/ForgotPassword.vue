<template>
  <q-page class="row">
    <div
      class="
        full-width
        row
      "
    >
      <div v-if="$q.screen.gt.md" :class="$q.screen.gt.md ? 'col-8' : 'col-grow'" class="items-center justify-center bg-grey-2">

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

        <div class="row items-center justify-center q-pt-xl">
          <img src="~/assets/forgot_password2.svg"/>
        </div>

      </div>

      <div :class="$q.screen.gt.md ? 'col-4 justify-center items-center' : 'col-grow'" style="border-left:1px solid #ebebeb;" class="row q-pa-lg">

        <q-card flat square no-border class="full-width">
          <q-card-section>

            <q-item v-if="!$q.screen.gt.md" class="q-pb-xl">
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/demo-1/img/logo.36f34a9f.svg">
                </q-avatar>
              </q-item-section>
              <q-item-section style="color:#6610f2 !important; font-weight: 800 !important; font-size: 1.45rem;">FONKERA</q-item-section>
            </q-item>


            <p class="q-pl-sm card-text-color font-24" style="font-weight:800 !important;">Şifremi Unuttum</p>
            <p class="q-pl-sm font-13 text-grey-6">Sisteme kayıtlı e-posta adresinizi girerek şifrenizi sıfırlayabilirsiniz</p>


            <q-form class="q-px-sm">
              <q-input
                v-on:keyup.enter="doLogin"
                ref="userCode"
                outlined
                clearable
                v-model="creds.userCode"
                type="input"
                label="E-posta Adresi"
                input-class="text-uppercase"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <div class="row q-pb-md q-col-gutter-md q-pt-md" >
                <VueRecaptcha
                  :sitekey="siteKey"
                  :load-recaptcha-script="true"
                  @verify="handleSuccess"
                  @error="handleError"
                ></VueRecaptcha>
              </div>

            </q-form>

            <q-card-actions class="q-pa-none q-px-sm justify-center">
              <q-btn
                unelevated
                size="lg"
                color="primary"
                @click="doLogin"
                class="full-width text-white text-capitalize"
                label="Şifremi Sıfırla"
              />
            </q-card-actions>

            <div class="row text-right justify-center" >
              <a href="javascript:void(0)" class="q-pt-sm text-blue-5 font-13"  @click="goLoginPage()"> Giriş Sayfasına Dön</a>
            </div>

          </q-card-section>


        </q-card>

      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted, computed} from "vue"
//import { useQuasar } from "quasar"
import { useRouter } from "vue-router"
//import usersService from "../services/usersService"
import notify from "../helpers/notification"
import { Api } from "../helpers/api"
import { VueRecaptcha } from 'vue-recaptcha'

export default defineComponent({
  name: "UserLogin",
  components: {
    VueRecaptcha
  },
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
      /*try {
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
          router.replace("/login")
        }
        if (displayError.value) throw new Error(displayMessages.value[0].text)
      } catch (e) {
        refresh()
        notify().error(e.message)
        router.replace("/login")
      }*/
      router.push("/")
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

    const goLoginPage = () => {
      router.push("/login")
    }

    const refresh = () => {
        url.value = Api.Base.ServiceURL + '/../simpleCaptcha.png?v='+Math.random()
        creds.value.captcha = ""
    }

    onMounted(async () => {
      /*
      if(hasUser()) {
        goHome()
      }
      */
    })

    const goAppealPage = () => {
      window.open(
        Api.Base.AppealURL,
        '_blank'
      )
    }

    const siteKey = computed(() => {
      //6LedtP4gAAAAAKBm1GWXalHnn6YEXlqpppqu9agg
      //6LedtP4gAAAAAGpFr7ZAoHZCIgbVHbKHtjAEgE8m
      return '6LedtP4gAAAAAKBm1GWXalHnn6YEXlqpppqu9agg'
    })

    const handleError = () => {
      debugger
      // Do some validation
    }

    const handleSuccess = (response) => {
      debugger
     // Do some validation
    }


    return {
      router,
      passwordFieldType,
      visibility,
      visibilityIcon,
      creds,
      goHome,
      goLoginPage,
      doLogin,
      switchVisibility,
      url,
      refresh,
      goAppealPage,
      handleSuccess,
      handleError,
      siteKey,
    }
  },
})
</script>

import { ref, onBeforeUnmount } from "vue"
import { api } from "boot/axios"
import cache from "../helpers/cache"
import { Api } from "../helpers/api"
import { Messages } from "../helpers/messages"
import { Loading, QSpinnerFacebook, useQuasar } from "quasar"
import { useRouter } from "vue-router"
import notify from "../helpers/notification"


const dataList = ref()
const displayError = ref()
const displayMessages = ref()

/**
 * THIS CONNECTS TO ICAP
 */
const apiService = () => {

  let timer
  const $q = useQuasar()

  onBeforeUnmount(() => {
    if (timer !== void 0) {
      clearTimeout(timer)
      $q.loading.hide()
    }
  })

  const fetch = async (method, bodyData, showProgress) => {

    if(showProgress) {
      Loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'red',
        spinnerSize: 150,
        backgroundColor: 'black',
        message: Messages.progress,
        messageColor: 'white',
        boxClass: 'font-19'
      })
    }

    try {
      debugger
      const url = `/api/v1/${method}`
      const response = await api.request({url: url,method: "POST", data: bodyData})
      const { data, status } = response
      dataList.value =  data
      displayError.value = !data.status.success
      displayMessages.value = data.status.message

      if(!data.status.success) { throw new Error(displayMessages.value) } else if(data.status.success && data.status.message) { notify().success(data.status.message, "top") }
    } catch (error) {
        notify().error(error.message)
    } finally {
      Loading.hide()
    }
  }

  return {
    // PROPERTIES
    dataList,
    displayError,
    displayMessages,
    // FUNCTIONS
    fetch
  }
}
export default apiService

import { ref, onBeforeUnmount } from "vue"
import { api } from "boot/axios"
import { store } from "boot/store"
import { CacheTypes } from "../helpers/cache"
import cache from "../helpers/cache"
import { Api } from "../helpers/api"
import { Messages } from "../helpers/messages"
import { Loading, QSpinnerFacebook, useQuasar } from "quasar"
import { useRouter } from "vue-router"
import notify from "../helpers/notification"


import chartController from "src/controllers/chartController"
import router from "src/router"


const dataList = ref()
//const cacheList = ref()
const claimList = ref()
const claimDataSource = ref()
const displayError = ref()
const displayMessages = ref()

/**
 * THIS CONNECTS TO ICAP
 */
const apiService = () => {
  const route = useRouter()

  let timer
  const $q = useQuasar()

  onBeforeUnmount(() => {
    if (timer !== void 0) {
      clearTimeout(timer)
      $q.loading.hide()
    }
  })

  const {isRefreshedReportStatusesChart, isRefreshedFileStatusesChart} = chartController()
  const {setCacheParameter} = cache()


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
      const url = `/api/v1/users/${method}`
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



  /*const loadClaimData = async (expertCode) => {
    const url = `/dispatch?cmd=listOtoDisiDisEksperDurumlari&jp={'eksperKodu':${expertCode}}`
    const response = await api.request({
      url: url,
      method: "POST",
    })

    const { data, error, messages } = response.data
    claimList.value = data
    claimDataSource.value = data ? data.otoDisiDisEksperViewList
      .filter(item => item.akisAktif === 1 || !item.akisAktif) : []
    displayError.value = error
    displayMessages.value = messages
  }
  */

  const loadClaimData = async (expertCode) => {
    Loading.show({
      spinner: QSpinnerFacebook,
      spinnerColor: 'red',
      spinnerSize: 150,
      backgroundColor: 'black',
      message: Messages.progress,
      messageColor: 'white',
      boxClass: 'font-19'

    })

    const url = `/dispatch?cmd=listIhalesiDevamEdenAraclar&jsonBody=true`
    const bodyData = {
      ihaleNo : null,
      serviceUrl : Api.Base.ServiceURL
    }

    try {
      const response = await api.request({
        url: url,
        method: "POST",
        data: bodyData
      })

      const { data, error, messages } = response.data
      claimList.value = data
      claimDataSource.value = data ? data : []
      displayError.value = error
      displayMessages.value = messages
    } catch (error) {
      throw error
    } finally {
      Loading.hide()
    }





  }

  const fetchExpertClaimData = async () => {
    const expertCode = localStorage.getItem("expertCode")
    //Get claim data
    await loadClaimData()
    //Get cacheable data
    await loadCacheData()
    isRefreshedReportStatusesChart.value = false
    isRefreshedFileStatusesChart.value = false
  }

  const loadCacheData = async () => {
    const parameters = await store.getItem('parameters')
    if (!parameters) {
      await fetch(Api.Common.LIST_CACHE_URL, CacheTypes)
      if (dataList.value) {
        const cacheData = JSON.parse(JSON.stringify(dataList.value))
        await store.setItem('parameters', cacheData)
        setCacheParameter()
      }
    }
  }

  return {
    // PROPERTIES
    route,
    dataList,
    claimList,
    claimDataSource,
    displayError,
    displayMessages,
    // FUNCTIONS
    fetch,
    loadClaimData,
    fetchExpertClaimData,
    loadCacheData,
    setCacheParameter,
  }
}
export default apiService

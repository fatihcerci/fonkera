<template>
  <div class="row q-col-gutter-sm q-pl-md q-pr-md q-pa-md">
    <div class="col-12">
      <q-card class="no-shadow">
        <q-table
          card-class="bg-grey-1"
          :hide-header="mode"
          :grid="mode"
          :filter="filter"
          :rows="rows ? rows : []"
          :columns="columns"
          :pagination-label="getPaginationLabel"
          :rows-per-page-options="[25, 50, 75, 100]"
          row-key="oid"
          table-class=""
          color="primary"
          table-header-class="text-bold"
          rows-per-page-label="Satır Sayısı"
          no-data-label="Kayıt bulunamadı"
          no-results-label="Eşleşen kayıt bulunamadı"
          title="Kullanıcılar"
          title-class="text-bold"
        >

          <template v-slot:top-right="props">

            <q-btn color="primary" unelevated label="Yeni Ekle" @click="editUser(null)" class="q-mr-sm" />
            
            <q-input
              standout
              dense
              debounce="300"
              v-model="filter"
              placeholder="Hızlı Ara"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>

            <q-btn
              flat
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              v-if="!mode"
              v-close-popup="!$q.platform.is.mobile"
            >
              <q-tooltip :disable="$q.platform.is.mobile"
                >{{ props.inFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran" }}
              </q-tooltip>
            </q-btn>
          </template>

          <template v-slot:body-cell-avatar="props">
            <q-td :props="props">
              <q-avatar>
                <img
                  :src="props.row.avatar"
                />
              </q-avatar>
            </q-td>
          </template>

          <template v-slot:body-cell-islemler="props">
            <q-td :props="props">
              <q-btn
                size="sm"
                color="primary"
                label="Güncelle"
                @click="editUser(props.row)"
              >
              </q-btn>
            </q-td>
            <q-td :props="props">
              <q-btn
                size="sm"
                color="primary"
                label="Sil"
              >
              </q-btn>
            </q-td>

          </template>


      </q-table>
      </q-card>
    </div>
  </div>


  
</template>

<script>
import { defineAsyncComponent, onMounted, ref, computed, toRefs, reactive, watch } from "vue"
import { exportFile, useQuasar } from "quasar"
import { useRouter } from "vue-router"
import apiService from "../../services/apiService"
import usersService from "../../services/usersService"
import claimController from "../../controllers/claimController"
import messageController from "../../controllers/messageController"
import notify from "../../helpers/notification"
import { Api } from "../../helpers/api"
import { Format } from "../../helpers/format"

const columns = [
  {
    name: "avatar",
    label: "",
    field: "avatar",
    align: "center",
    style: "width: 80px",
    required : true
  },
  {
    name: "adi",
    label: "Adı",
    field: "adi",
    align: "left",
    headerStyle: 'font-size:16px',
    required : true
  },
  {
    name: "soyadi",
    label: "Soyadı",
    field: "soyadi",
    align: "left",
    headerStyle: 'font-size:16px;',
    required : true
  },
  {
    name: "unvan",
    label: "Ünvan",
    field: "unvan",
    align: "left",
    headerStyle: 'font-size:16px',
    required : true
  },
  {
    name: "gsm",
    label: "Telefon",
    field: "gsm",
    align: "left",
    headerStyle: 'font-size:16px',
    required : true
  },
  {
    name: "eposta",
    label: "E-Posta",
    field: "eposta",
    align: "left",
    headerStyle: 'font-size:16px',
    required : true
  },
  {
    name: "status",
    label: "Durum",
    field: "status",
    align: "left",
    headerStyle: 'font-size:16px',
    required : true
  },
  {
    name: "islemler",
    label: "",
    field: "islemler",
    align: "left",
    headerStyle: 'font-size:16px',
    style: "width: 50px",
  },
]

export default {
  name: "TableUsers",
  components: {
    
  },
  setup(props, { emit }) {
    const { dataList, claimDataSource, displayError, displayMessages, fetch } =
      apiService()
    const router = useRouter()
    const $q = useQuasar()
    const { claimDetail, infoList, selectedClaim, offerList } = claimController()
    let filter = ref("")
    let mode = computed(() => {
      return false
    })

    const hasUser = usersService().hasUser()

    const state = reactive({
      
    })

/*
    const rows = computed(() => {
      return [{avatar:"https://cdn.quasar.dev/img/boy-avatar.png", adi:"Admin", soyadi:"Kullanicisi", unvan:"ADMIN", gsm:"0507 216 58 24", eposta:"fatihcerci001@gmail.com", status:"1"}]
    })
    */

    const rows = computed(() => {
      return dataList.value && dataList.value.data && dataList.value.data.length > 0
        ? dataList.value.data.map((item) => ({
            ...item,
          }))
        : []
    })

    onMounted(async () => {
      debugger
      try {
        const bodyData = {
          
        }
        await fetch("list_users", bodyData, true)
        console.log(dataList.value)
        state.resp = dataList.value
      } catch (e) {
      }
    })


    const getPaginationLabel = (
      firstRowIndex,
      endRowIndex,
      totalRowsNumber
    ) => {
      return firstRowIndex + " - " + endRowIndex + " / " + totalRowsNumber
    }

    const wrapCsvValue = (val, formatFn) => {
      let formatted = formatFn !== void 0 ? formatFn(val) : val
      formatted =
        formatted === void 0 || formatted === null ? "" : String(formatted)
      formatted = formatted.split('"').join('""')
      return `"${formatted}"`
    }

    const exportTable = () => {
      // naive encoding to csv format
      const content = [columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          claimDataSource.value.map((row) =>
            columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n")
      const status = exportFile("claims.csv", content, "text/csv")
      if (status !== true) {
        notify().error("Tarayıcınız dosya indirmeyi engelledi")
      }
    }

    const editUser = (row) => {
      alert(JSON.stringify(row))
      router.push("/users/user")
    }


    return {
      router,
      getPaginationLabel,
      columns,
      rows,
      dataList,
      claimDataSource,
      displayError,
      displayMessages,
      filter,
      mode,
      ...toRefs(state),
      wrapCsvValue,
      exportTable,
      fetch,
      editUser,
    }
  },
}
</script>

<style lang="scss" scoped>


</style>

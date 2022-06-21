import { ref } from "vue"

let selectedUser = ref()
let userList = ref()

const userController = () => {

  const resetSelectedUser = () => {
    selectedClaim.value = null
  }

  return {
    // PROPERTIES
    selectedUser,
    userList,
    //FUNCTIONS
    resetSelectedUser,
  }
}
export default userController

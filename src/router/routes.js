import Main from "layouts/MainLayout.vue"
import Home from "pages/Home.vue"
import Groups from "pages/organization/Groups.vue"
import GroupView from "pages/organization/GroupView.vue"
import Roles from "pages/organization/Roles.vue"
import RoleView from "pages/organization/RoleView.vue"
import Users from "pages/organization/Users.vue"
import UserView from "pages/organization/UserView.vue"

const routes = [
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "",
        component: Home,
        meta: { requiresAuth: false },
      },
      {
        path: "/groups",
        component: Groups,
        meta: { requiresAuth: false },
      },
      {
        path: "/groups/view",
        component: GroupView,
        meta: { requiresAuth: false },
      },
      {
        path: "/roles",
        component: Roles,
        meta: { requiresAuth: false },
      },
      {
        path: "/roles/view",
        component: RoleView,
        meta: { requiresAuth: false },
      },
      {
        path: "/users",
        component: Users,
        meta: { requiresAuth: false },
      },
      {
        path: "/users/view",
        component: UserView,
        meta: { requiresAuth: false },
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
]

export default routes

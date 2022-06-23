import Main from "layouts/MainLayout.vue"
import Home from "pages/Home.vue"
import Organization from "pages/organization/Organization.vue"
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
    meta: {
      breadCrumb: 'Ana Sayfa',
      icon : 'home'
    },
    children: [
      {
        path: "",
        component: Home,
        meta: { requiresAuth: false },
      },
      {
        path: "/organization",
        component: Organization,
        meta: { requiresAuth: false, breadCrumb: 'Organizasyon Tanımları', icon : 'corporate_fare' },
        children : [
          {
            path: "groups",
            component: Groups,
            props : true,
            meta: { requiresAuth: false, breadCrumb: 'Grup Tanımları', icon : 'groups' },
            children : [

            ]
          },
          {
            path: "groups/view",
            props:true,
            component: GroupView,
            meta: { requiresAuth: false, breadCrumb: 'Grup Ekle-Düzenle', icon : 'edit', parent : { path: "/organization/groups", breadCrumb: 'Grup Tanımları', icon : 'groups' }},
          },


          {
            path: "roles",
            component: Roles,
            meta: { requiresAuth: false, breadCrumb: 'Rol Tanımları', icon : 'manage_accounts'},
          },
          {
            path: "roles/view",
            props:true,
            component: RoleView,
            meta: { requiresAuth: false, breadCrumb: 'Rol Ekle-Düzenle', icon : 'edit', parent : { path: "/organization/roles", breadCrumb: 'Rol Tanımları', icon : 'manage_accounts' }},
          },
          {
            path: "users",
            component: Users,
            meta: { requiresAuth: false, breadCrumb: 'Kullanıcı Tanımları', icon : 'person_add'},
          },
          {
            path: "users/view",
            props:true,
            component: UserView,
            meta: { requiresAuth: false, breadCrumb: 'Kullanıcı Ekle-Düzenle', icon : 'edit', parent : { path: "/organization/users", breadCrumb: 'Kullanıcı Tanımları', icon : 'person_add' }},
          },
        ]
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
]

export default routes

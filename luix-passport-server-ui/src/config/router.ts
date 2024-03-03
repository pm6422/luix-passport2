import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth-store";
import { useConfigStore } from "@/stores/config-store";
import { AuthService } from '@/services/services';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    // redirect: "/dashboard",
    component: () => import("@/layouts/main-layout/main-layout.vue"),
    meta: {
      requireAuth: true,
    },
    children: [
      {
        name: "dashboard",
        path: "/",
        component: () => import("@/views/dashboard.vue"),
        meta: {
          pageTitle: "menu.dashboard.title",
          breadcrumbs: [],
        },
      },
      {
        name: "profile",
        path: "/account/profile",
        component: () => import("@/views/account/profile.vue"),
        meta: {
          pageTitle: "menu.account.profile",
          breadcrumbs: [],
        },
      },
      {
        name: "layout-setting",
        path: "/account/layout-setting",
        component: () => import("@/views/account/layout-setting.vue"),
        meta: {
          pageTitle: "menu.account.layout-settings",
          breadcrumbs: [],
        },
      },
      {
        name: "users",
        path: "/admin/users",
        component: () => import("@/views/admin/users.vue"),
        meta: {
          pageTitle: "menu.administration.users.title",
          breadcrumbs: ["menu.administration.title"],
        },
      },
      {
        name: "teams",
        path: "/admin/teams",
        component: () => import("@/views/admin/teams.vue"),
        meta: {
          pageTitle: "menu.administration.teams.title",
          breadcrumbs: ["menu.administration.title"],
        },
      },
      {
        name: "oauth-client",
        path: "/admin/oauth-clients",
        component: () => import("@/views/admin/oauth-client/oauth-client-list.vue"),
        meta: {
          pageTitle: "menu.administration.oauth-client.title",
          breadcrumbs: ["menu.administration.title"],
        },
      },
      {
        name: "api",
        path: "/developer/api",
        component: () => import("@/views/developer/api/api.vue"),
        meta: {
          pageTitle: "menu.developer.api",
          breadcrumbs: [],
        },
      },
      {
        name: "data-dict",
        path: "/developer/data-dict",
        component: () => import("@/views/developer/data-dict/data-dict-list.vue"),
        meta: {
          pageTitle: "menu.developer.data-dict",
          breadcrumbs: [],
        },
      },
      {
        name: "health",
        path: "/developer/health",
        component: () => import("@/views/developer/health/health-list.vue"),
        meta: {
          pageTitle: "menu.developer.health",
          breadcrumbs: [],
        },
      },
      {
        name: "configurations",
        path: "/developer/configurations",
        component: () => import("@/views/developer/configuration/configuration.vue"),
        meta: {
          pageTitle: "menu.developer.configurations",
          breadcrumbs: [],
        },
      },
      {
        name: "beans",
        path: "/developer/beans",
        component: () => import("@/views/developer/bean/beans.vue"),
        meta: {
          pageTitle: "menu.developer.beans",
          breadcrumbs: [],
        },
      },
      {
        name: "metrics",
        path: "/developer/metrics",
        component: () => import("@/views/developer/metrics/metrics.vue"),
        meta: {
          pageTitle: "menu.developer.metrics",
          breadcrumbs: [],
        },
      },
      {
        name: "loggers",
        path: "/developer/loggers",
        component: () => import("@/views/developer/logger/loggers.vue"),
        meta: {
          pageTitle: "menu.developer.loggers",
          breadcrumbs: [],
        },
      }
    ],
  },

  {
    path: "/",
    component: () => import("@/layouts/auth-layout/auth-layout.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/account/sign-in.vue"),
        meta: {
          pageTitle: "Sign In",
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/account/sign-up.vue"),
        meta: {
          pageTitle: "Sign Up",
        },
      },
      {
        path: "/reset-password",
        name: "reset-password",
        component: () =>
          import("@/views/account/reset-password.vue"),
        meta: {
          pageTitle: "Password reset",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/system-layout/system-layout.vue"),
    children: [
      {
        // the 404 route, when none of the above matches
        path: "/404",
        name: "404",
        component: () => import("@/views/error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/error500.vue"),
        meta: {
          pageTitle: "Error 500",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const configStore = useConfigStore();

  // reset config to initial state
  configStore.resetLayoutConfig();

  // before page access check if page requires authentication
  if (to.meta.requireAuth) {
    if (authStore.isAuthenticated) {
      next();
    } else {
      // go to login page if failed to authenticate
      AuthService.login();
    }
  } else {
    next();
  }

  // scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;

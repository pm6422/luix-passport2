import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "@/stores/auth-store";
import { useConfigStore } from "@/stores/config-store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/security-analytics",
    component: () => import("@/layouts/main-layout/main-layout.vue"),
    meta: {
      requireAuth: true,
    },
    children: [
      {
        name: "security-analytics",
        path: "/security-analytics",
        component: () => import("@/views/admin/security-analytics/security-analytics.vue"),
        meta: {
          pageTitle: "menu.security-analytics.title",
          breadcrumbs: [],
        },
      },
      {
        name: "my-profile",
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
      },
      {
        name: "report-templates",
        path: "/security-reports/report-templates",
        component: () => import("@/views/admin/security-reports/report-template/report-template-list.vue"),
        meta: {
          pageTitle: "menu.security-reports.report-templates.title",
          breadcrumbs: ["menu.security-reports.title"],
        },
      },
      
      {
        name: "account-mgmt",
        path: "/configuration/account-mgmt",
        component: () => import("@/views/configuration/accounts/account-mgmt.vue"),
        meta: {
          pageTitle: "menu.configuration.accounts.title",
          breadcrumbs: ["menu.configuration.title"],
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
        component: () => import("@/views/Error404.vue"),
        meta: {
          pageTitle: "Error 404",
        },
      },
      {
        path: "/500",
        name: "500",
        component: () => import("@/views/Error500.vue"),
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
  // const { t, te } = useI18n();

  // var tilte = to.meta.pageTitle;
  // if (te(to.meta.pageTitle)) {
  //   tilte = t(to.meta.pageTitle);
  // }

  // // set current page view title
  // document.title = `${tilte} | ${import.meta.env.VITE_APP_NAME}`;

  // reset config to initial state
  configStore.resetLayoutConfig();

  // verify auth token before each page change
  authStore.verifyAuth()
    .then(() => {
      // before page access check if page requires authentication
      if (to.meta.requireAuth) {
        if (authStore.isAuthenticated) {
          next();
        } else {
          // go to login page if failed to authenticate
          window.location.href = '/login';
        }
      } else {
        next();
      }
    })

  // Scroll page to top on every route change
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

export default router;

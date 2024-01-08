export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "menu.security-analytics.title",
        route: "/security-analytics",
        keenthemesIcon: "chart-line-up",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        sectionTitle: "menu.security-reports.title",
        route: "/security-reports",
        keenthemesIcon: "chart-pie-4",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "menu.security-reports.report-templates.title",
            route: "/security-reports/report-templates",
          }
        ]
      },
    ],
  },

  {
    heading: "menu.configuration.title",
    route: "/configuration",
    pages: [
      {
        heading: "menu.configuration.accounts.title",
        route: "/configuration/account-mgmt",
        keenthemesIcon: "profile-user",
        bootstrapIcon: "bi-archive",
      }
    ],
  }
];

export default MainMenuConfig;

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
        heading: "menu.user-management.title",
        route: "/user-mgmt",
        keenthemesIcon: "profile-user",
        bootstrapIcon: "bi-archive",
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
  }
];

export default MainMenuConfig;

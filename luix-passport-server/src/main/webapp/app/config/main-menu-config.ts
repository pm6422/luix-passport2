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
        sectionTitle: "menu.user-authority.title",
        route: "/user-authority",
        keenthemesIcon: "profile-user",
        bootstrapIcon: "bi-archive",
        sub: [
          {
            heading: "menu.user-authority.users.title",
            route: "/user-authority/users",
          }
        ]
      },
    ],
  }
];

export default MainMenuConfig;

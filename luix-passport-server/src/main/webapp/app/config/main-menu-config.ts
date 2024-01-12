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
          },
          {
            heading: "menu.user-authority.teams.title",
            route: "/user-authority/teams",
          },
        ]
      },
    ]
  },

  {
    heading: "menu.administration.title",
    route: "/admin",
    pages: [
      {
        heading: "menu.administration.users.title",
        route: "/admin/users",
        keenthemesIcon: "user-tick",
        bootstrapIcon: "bi-archive",
      },
      {
        heading: "menu.administration.teams.title",
        route: "/admin/teams",
        keenthemesIcon: "profile-user",
        bootstrapIcon: "bi-archive",
      }
    ],
  }
];

export default MainMenuConfig;

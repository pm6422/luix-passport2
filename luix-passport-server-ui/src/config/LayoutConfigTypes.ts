interface General {
  mode: "dark" | "light" | "system";
  primaryColor: "#50CD89";
  pageWidth: string;
  layout: "dark-sidebar" | "light-sidebar" | "light-header" | "dark-header";
  iconsType: "duotone" | "solid" | "outline";
}

interface Illustrations {
  set: "dozzy-1" | "sigma-1" | "sketchy-1" | "unitedpalms-1";
}

interface ScrollTop {
  display: boolean;
}

interface Sidebar {
  display: boolean;
  default: {
    minimize: {
      desktop: {
        enabled: boolean;
        default: boolean;
      };
    };
    menu: {
      iconType: "keenthemes" | "bootstrap";
    };
  };
}

interface Content {
  container: "fixed" | "fluid";
}

interface Header {
  display: boolean;
  default: {
    container: "fixed" | "fluid";
    fixed: {
      desktop: boolean;
      mobile: boolean;
    };
    menu: {
      iconType: "keenthemes" | "bootstrap";
    };
    content: "menu" | "page-title";
  };
}

interface Toolbar {
  display: boolean;
  container: "fixed" | "fluid";
  fixed: {
    desktop: boolean;
    mobile: boolean;
  };
}

interface Footer {
  display: boolean;
  container: "fixed" | "fluid";
  fixed: {
    desktop: boolean;
    mobile: boolean;
  };
}

interface LayoutConfig {
  general: General;
  illustrations: Illustrations;
  scrolltop: ScrollTop;
  header: Header;
  toolbar: Toolbar;
  sidebar: Sidebar;
  content: Content;
  footer: Footer;
}

export default LayoutConfig;

export type {
  General,
  Illustrations,
  ScrollTop,
  Header,
  Sidebar,
  Content,
  Toolbar,
  Footer,
  LayoutConfig,
};

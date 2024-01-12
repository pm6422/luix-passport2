import type LayoutConfig from "@/domain/LayoutConfig";

const config: LayoutConfig = {
  "general": {
    "mode": "dark",
    "primaryColor": "#50CD89",
    "pageWidth": "fluid",
    "layout": "dark-header",
    "iconsType": "duotone"
  },
  "sidebar": {
    "display": true,
    "default": {
      "minimize": {
        "desktop": {
          "enabled": true,
          "default": true
        }
      },
      "menu": {
        "iconType": "keenthemes"
      }
    }
  },
  "header": {
    "display": true,
    "default": {
      "container": "fluid",
      "fixed": {
        "desktop": true,
        "mobile": false
      },
      "menu": {
        "iconType": "keenthemes"
      },
      "content": "menu"
    }
  },
  "toolbar": {
    "display": false,
    "container": "fluid",
    "fixed": {
      "desktop": false,
      "mobile": false
    }
  },
  "content": {
    "container": "fluid"
  },
  "footer": {
    "display": false,
    "container": "fluid",
    "fixed": {
      "desktop": false,
      "mobile": false
    }
  },
  "illustrations": {
    "set": "sketchy-1"
  },
  "scrolltop": {
    "display": true
  }
};

export default config;

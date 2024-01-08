import { getAssetPath } from "@/helpers/assets";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import axios from 'axios';
export class LanguageHelper {
    public static countries = {
        en: {
            flag: getAssetPath("media/flags/united-states.svg"),
            name: "English",
        },
        zh: {
            flag: getAssetPath("media/flags/china.svg"),
            name: "简体中文",
        }
    };
    public static defaultLanguage = "zh";
    public static getCurrentLanguage(): string {
        const lang =  localStorage.getItem("ac_lang") ? (localStorage.getItem("ac_lang") as string) : LanguageHelper.defaultLanguage;
        LanguageHelper.setLang(lang);
        return lang;
    }
    public static setLanguage(i18n: any, lang: string): void {
        i18n.locale.value = lang;
        LanguageHelper.setLang(lang);
    }
    private static setLang(lang: string): void {
        dayjs.locale(lang);
        localStorage.setItem("ac_lang", lang);
        axios.defaults.headers.common['Accept-Language'] = lang;
        const html = document.querySelector("html");
        if (html) {
          html.setAttribute('lang', lang);
        }
    }
}
<template>
  <Ribbon/>
  <!--begin::Authentication Layout -->
  <div class="d-flex flex-column flex-lg-row flex-column-fluid top-box">
    <!--begin::Body-->
    <div class="d-none d-lg-block d-flex flex-column flex-lg-row-fluid w-lg-50 p-0 order-2 order-lg-1 top-box-inner -intro-x">
      <div class="text-center mt-20">
        <img
          :src="getAssetPath('media/logos/logo-white.svg')"
          class="h-60px opacity-75"
        />
      </div>
      <div class="text-center mt-10 mb-10">
        <img
          :src="getAssetPath('media/logos/secops-dynamic.svg')"
          class="h-60px"
        />
      </div>
      <!--begin::Form-->
      <div class="d-flex flex-center flex-column flex-lg-row-fluid">
        <!--begin::Wrapper-->
        <div class="w-lg-500px p-0">
          <img alt="Logo" :src="getAssetPath('media/vehicle/series1-01.png')" class="h-130px h-lg-175px mt-0"/>
          <!--begin::Title-->
          <h3 class="text-white fw-bolder text-center mt-10 text-uppercase" v-text="$t('app-desc')">
          </h3>
          <!--end::Title-->

          <!--begin::Text-->
          <div class="text-white fs-5 mt-5 text-left" v-text="$t('form.login.dt-msg')">
          </div>
          <!--end::Text-->
          <div class="text-center h-10px mt-0">
            <Typed :options="typedOptions">
              <h1 class="typing fs-1 fw-bold text-gray-700"></h1>
            </Typed>
          </div>
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Form-->
    </div>
    <!--end::Body-->

    <!--begin::Aside-->
    <div class="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2">
      <!--begin::Content-->
      <div class="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100">
        <router-view></router-view>
        <LanguageFooter />
      </div>
      <!--end::Content-->
      
    </div>
    <!--end::Aside-->
  </div>
  <!--end::Authentication Layout -->
</template>

<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { defineComponent, onMounted, nextTick } from "vue";
import LayoutService from "@/services/LayoutService";
import { useBodyStore } from "@/stores/body";
import { useAppInfoStore } from "@/stores/app-info-store";
import { reinitializeComponents } from "@/plugins/keenthemes";
import LanguageFooter from "@/components/language/language-footer.vue"
import Ribbon from "@/components/ribbon/ribbon.vue";
import { useI18n } from "vue-i18n";
import { Typed } from "@duskmoon/vue3-typed-js";
import type { TypedOptions } from "@duskmoon/vue3-typed-js";

export default defineComponent({
  name: "auth-layout",
  components: { 
    LanguageFooter,
    Ribbon,
    Typed
  },
  setup() {
    const store = useBodyStore();
    const appInfoStore = useAppInfoStore();
    const i18n = useI18n();

    onMounted(() => {
      nextTick(() => {
        reinitializeComponents();
      });

      LayoutService.emptyElementClassesAndAttributes(document.body);

      store.addBodyClassname("app-blank");
      store.addBodyClassname("bg-body");
    });

    const typedOptions: TypedOptions = {
      strings: ["Identify", "Protect", "Detect", "Respond", "Recover"],
      typeSpeed: 60,
      fadeOut: true,
      fadeOutDelay: 800,
      loop: true,
      showCursor: false
    };

    return {
      getAssetPath,
      appInfoStore,
      typedOptions
    };
  },
});
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

* {
    padding: 0;
    margin: 0;
  }

  .top-box {
    overflow: hidden;
    /* 因为内部伪元素height:140%,必然超出屏幕，所以要溢出隐藏 */
  }

  .top-box-inner {
    position: relative;
    width: 780px;
    height: 100%;
    /* 定位 */
  }

  .top-box-inner:after {
    /* 这个伪类的作用就是一个圆弧的背景色 */
    width: 780px;
    height: 140%;
    position: absolute;
    top: -20%;
    /* 之所以top:20%,是因为height:140%，也可以是是别的值，例如height:160%，那么top:30%才能水平居中，可以发现规律的 */
    left: 0;
    z-index: -1;
    /*层叠顺序，最底层显示*/
    content: '';
    border-radius: 0 50% 50% 0;
    /*分别对应 左上 右上 右下 左下*/
    background-color: #222246;
    /* 将这个伪类水平居中 */
  }

  .top-box-inner:before {
    width: 800px;
    height: 150%;
    position: absolute;
    top: -18%;
    left: 0;
    z-index: -1;
    content: '';
    border-radius: 0 50% 50% 0;
    /*分别对应 左上 右上 右下 左下*/
    background-color: #27255a; 
}
</style>

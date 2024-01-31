<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10 animate__animated animate__slideInRight">
    <!--begin::Form-->
    <VForm
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      novalidate
      @submit="onSubmit"
      v-slot={meta}
      :validation-schema="validationSchema"
    >
      <!--begin::Heading-->
      <div class="mb-10 text-center">
        <!--begin::Title-->
        <h1 class="text-dark mb-3" v-text="$t('form.login.create-account')"></h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4">
          <span v-text="$t('form.login.have-account')" class="me-2"></span>
          <router-link to="/sign-in" class="link-primary fw-bold">
            <span v-text="$t('form.login.sign-in')"></span>
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--end::Heading-->

      <!--begin::Action-->
      <!-- <button type="button" class="btn btn-light-primary fw-bold w-100 mb-10">
        <img
          alt="Logo"
          :src="getAssetPath('media/svg/brand-logos/google-icon.svg')"
          class="h-20px me-3"
        />
        Sign in with Google
      </button> -->
      <!--end::Action-->

      <!--begin::Separator-->
      <!-- <div class="d-flex align-items-center mb-10">
        <div class="border-bottom border-gray-300 mw-50 w-100"></div>
        <span class="fw-semobold text-gray-400 fs-7 mx-2">OR</span>
        <div class="border-bottom border-gray-300 mw-50 w-100"></div>
      </div> -->
      <!--end::Separator-->

      <!--begin::Input group-->
      <div class="row fv-row mb-5">
        <!--begin::Col-->
        <div class="col-xl-6 mt-5" :class="{'order-2': currentLanguage === 'zh', 'order-1': currentLanguage === 'en'}">
          <label class="form-label fw-bold text-dark fs-6" v-text="$t('form.profile.first-name')"></label>
          <Field
            class="form-control form-control-lg form-control-solid"
            type="text"
            placeholder=""
            name="firstName"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="firstName" />
            </div>
          </div>
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-xl-6 mt-5" :class="{'order-1': currentLanguage === 'zh', 'order-2': currentLanguage === 'en'}">
          <label class="form-label fw-bold text-dark fs-6" v-text="$t('form.profile.last-name')"></label>
          <Field
            class="form-control form-control-lg form-control-solid"
            type="text"
            placeholder=""
            name="lastName"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="lastName" />
            </div>
          </div>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-label fw-bold text-dark fs-6" v-text="$t('form.profile.email')"></label>
        <Field
          class="form-control form-control-lg form-control-solid"
          type="email"
          placeholder=""
          name="email"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-5" data-kt-password-meter="true">
        <!--begin::Wrapper-->
        <div class="mb-1">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6" v-text="$t('form.login.password')"></label>
          <!--end::Label-->

          <!--begin::Input wrapper-->
          <div class="position-relative mb-3">
            <Field
              type="password"
              class="form-control form-control-lg form-control-solid fw-semobold fs-6"
              name="password"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="password" />
              </div>
            </div>
            <span class="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2" data-kt-password-meter-control="visibility">
              <KTIcon icon-name="eye-slash" icon-class="fs-1" />
              <KTIcon icon-name="eye" icon-class="d-none fs-1" />
            </span>
          </div>
          <!--end::Input wrapper-->
          <!--begin::Meter-->
          <div class="d-flex align-items-center mb-3" data-kt-password-meter-control="highlight">
            <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
          </div>
          <!--end::Meter-->
        </div>
        <!--begin::Hint-->
        <div class="form-text" v-text="$t('form.profile.password-pattern')"></div>
        <!--end::Hint-->
      </div>
      <!--end::Input group--->

      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-label fw-bold text-dark fs-6" v-text="$t('form.login.confirm-password')"></label>
        <Field
          class="form-control form-control-lg form-control-solid"
          type="password"
          placeholder=""
          name="passwordConfirmation"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="passwordConfirmation" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-check form-check-custom form-check-solid">
          <Field
            class="form-check-input"
            type="checkbox"
            name="toc"
            value="1"
          />
          <span class="form-check-label fw-semobold text-gray-700 fs-6">
            <span v-text="$t('form.register.agree-to')"></span>
            <a href="#" class="ms-1 link-primary" v-text="$t('form.register.privacy-policy')"></a>
          </span>
        </label>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <button
          type="submit"
          class="btn btn-lg btn-primary w-100 mb-5"
          :disabled="formSubmitting || !meta.valid"
          :data-kt-indicator="formSubmitting ? 'on' : null"
        >
          <span v-if="!formSubmitting" class="indicator-label" v-text="$t('form.global.submit')"></span>
          <span v-if="formSubmitting" class="indicator-progress">
            <span v-text="$t('form.global.wait')"></span>
            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        </button>
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { defineComponent, nextTick, onMounted, ref, computed } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useAuthStore } from "@/stores/auth-store";
import type { IAuthUser } from '@/domain/AuthUser';
import { useRouter } from "vue-router";
import { PasswordMeterComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "sign-up",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const formSubmitting = ref<boolean>(false);
    const i18n = useI18n();

    onMounted(() => {
      nextTick(() => {
        PasswordMeterComponent.bootstrap();
      });
    });

    const currentLanguage = computed(() => {
      return i18n.locale.value;
    });

    const validationSchema = computed(()=> {
      return Yup.object().shape({
        firstName: Yup.string().required(i18n.t("validation.global.required")),
        lastName: Yup.string().required(i18n.t("validation.global.required")),
        email: Yup.string()
              .required(i18n.t("validation.global.required"))
              .email(i18n.t("validation.global.valid-email")),
        password: Yup.string()
              .required(i18n.t("validation.global.required"))
              .min(4, i18n.t("validation.global.min-length", { min: 4 })),
        passwordConfirmation: Yup.string()
          .required(i18n.t("validation.global.required"))
          .oneOf([Yup.ref("password"), null], i18n.t("validation.global.passwords-must-match")),
      })
    });

    const onSubmit = async (values: any) => {
      values = values as IAuthUser;

      // Clear existing errors
      authStore.logout();

      // Activate indicator
      formSubmitting.value = true;

      // Send login request
      await authStore.register(values);

      const error = Object.values(authStore.errors);

      if (!error) {
        Swal.fire({
          text: "You have successfully logged in!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        }).then(function () {
          // Go to page after successfully login
          router.push({ name: "security-analytics" });
        });
      } else {
        Swal.fire({
          text: error[0] as string,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
      }

      // Deactivate indicator
      formSubmitting.value = false;
    };

    return {
      getAssetPath,
      validationSchema,
      onSubmit,
      formSubmitting,
      currentLanguage
    };
  },
});
</script>
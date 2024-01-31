<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10 animate__animated animate__slideInRight">
    <!--begin::Form-->
    <VForm
      class="form w-100"
      @submit="onSubmit"
      :validation-schema="validationSchema"
      v-slot={meta}
      :initial-values="{ email: 'admin@demo.com', password: 'demo' }"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3" v-text="$t('form.login.sign-in')"></h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4">
          <span v-text="$t('form.login.no-account')" class="me-2"></span>
          <router-link to="/sign-up" class="link-primary fw-bold">
            <span v-text="$t('form.login.create-account')"></span>
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!-- <div class="mb-10 bg-light-info p-8 rounded">
        <div class="text-info">
          Use account <strong>admin@demo.com</strong> and password
          <strong>demo</strong> to continue.
        </div>
      </div> -->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bold text-dark" v-text="$t('form.profile.email')"></label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          tabindex="1"
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="email"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6 mb-0" v-text="$t('form.login.password')"></label>
          <!--end::Label-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          tabindex="2"
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-10">
        <!--begin::Col-->
        <div class="col-6 fv-row">
          <!--begin::Switch-->
          <div class="form-check form-switch form-switch-sm form-check-custom form-check-solid">
            <label class="form-check-label">
              <input
                class="form-check-input"
                type="checkbox"
                name="remember"
                value="1"
              />
              <span class="form-check-label fs-7 fw-bold text-dark" v-text="$t('form.login.remember-me')"></span>
            </label>
          </div>
        <!--end::Switch-->
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-6 fv-row d-flex justify-content-end">
          <!--begin::Link-->
          <router-link to="/reset-password" class="link-primary fs-6 fw-bold">
            <span v-text="$t('form.login.forgot-password')"></span>
          </router-link>
          <!--end::Link-->
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <!--begin::Submit button-->
        <button
          tabindex="3"
          type="submit"
          class="btn btn-lg btn-primary w-100 mb-5"
          :disabled="formSubmitting || !meta.valid"
          :data-kt-indicator="formSubmitting ? 'on' : null"
        >
          <span v-if="!formSubmitting" class="indicator-label" v-text="$t('form.login.login')"></span>
          <span v-if="formSubmitting" class="indicator-progress">
            <span v-text="$t('form.global.wait')"></span>
            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        </button>
        <!--end::Submit button-->
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth-store";
import type { IAuthUser } from '@/domain/AuthUser';
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "sign-in",
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

    //Create form validation object
    const validationSchema = Yup.object().shape({
      email: Yup.string().email().required(i18n.t("validation.global.required")),
      password: Yup.string().required(i18n.t("validation.global.required")),
    });

    //Form submit function
    const onSubmit = async (values: any) => {
      values = values as IAuthUser;
      // Clear existing errors
      authStore.logout();

      // Activate indicator
      formSubmitting.value = true;

      // Send login request
      await authStore.login(values);
      const error = Object.values(authStore.errors);

      if (error.length === 0) {
        // Go to page after successfully login
        router.push({ name: "security-analytics" });
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
        }).then(() => {
          authStore.errors = {};
        });
      }

      // Deactivate indicator
      formSubmitting.value = false;
    };

    return {
      onSubmit,
      validationSchema,
      formSubmitting,
      getAssetPath,
    };
  },
});
</script>

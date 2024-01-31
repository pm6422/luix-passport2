<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10 animate__animated animate__slideInRight">
    <!--begin::Form-->
    <VForm
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      @submit="onSubmit"
      v-slot={meta}
      :validation-schema="validationSchema"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3" v-text="$t('form.login.forgot-password')"></h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4" v-text="$t('form.login.enter-email')">
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <label class="form-label fw-bold text-gray-900 fs-6" v-text="$t('form.profile.email')"></label>
        <Field
          class="form-control form-control-solid"
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

      <!--begin::Actions-->
      <div class="d-flex flex-wrap justify-content-center pb-lg-0">
        <router-link to="/sign-in" class="btn btn-lg btn-light-primary fw-bold me-4">
          <span v-text="$t('form.global.cancel')"></span>
        </router-link>

        <button
          type="submit"
          class="btn btn-lg btn-primary fw-bold"
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
import { defineComponent, ref, computed } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth-store";
import * as Yup from "yup";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "reset-password",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const authStore = useAuthStore();
    const formSubmitting = ref<boolean>(false);
    const i18n = useI18n();

    //Create form validation object
    const validationSchema = computed(()=> {
      return Yup.object().shape({
        email: Yup.string()
          .required(i18n.t("validation.global.required"))
          .email(i18n.t("validation.global.valid-email")),
      });
    });

    //Form submit function
    const onSubmit = async (values: any) => {
      values = values as string;

      // Activate indicator
      formSubmitting.value = true;

      // dummy delay
      // Send login request
      await authStore.forgotPassword(values);

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
      onSubmit,
      validationSchema,
      formSubmitting
    };
  },
});
</script>

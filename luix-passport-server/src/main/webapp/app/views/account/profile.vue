<template>
  <!--begin::Row-->
  <div class="row g-5 g-xl-8">
    <div class="col-xl-8">
      <!--begin::Update profile-->
      <div class="card mb-xl-10 intro-y">
        <!--begin::Card header-->
        <div
          class="card-header border-0 cursor-pointer"
          role="button"
          data-bs-toggle="collapse"
          data-bs-target="#profileSection"
        >
          <!--begin::Card title-->
          <div class="card-title m-0">
            <h3 class="fw-bold m-0"><span v-text="$t('form.profile.update-profile')"></span></h3>
          </div>
          <!--end::Card title-->
        </div>
        <!--begin::Card header-->

        <!--begin::Content-->
        <div id="profileSection" class="collapse show">
          <!--begin::Form-->
          <VForm
            ref="profileForm"
            class="form"
            novalidate
            @submit="saveUser()"
            :validation-schema="profileValidationSchema"
            v-slot={meta}
          >
            <!--begin::Card body-->
            <div class="card-body border-top p-9">
              <!--begin::Input group-->
              <div class="row mb-6">
                <!--begin::Label-->
                <label class="col-lg-4 col-form-label fw-semobold" v-text="$t('form.profile.avatar')"></label>
                <!--end::Label-->

                <!--begin::Col-->
                <div class="col-lg-8">
                  <!--begin::Image input-->
                  <div
                    class="image-input image-input-circle"
                    data-kt-image-input="true"
                    :style="{
                      backgroundImage: `url(${getAssetPath(
                        'media/avatars/blank.png'
                      )})`,
                    }"
                  >
                    <!--begin::Preview existing avatar-->
                    <div
                      class="image-input-wrapper w-125px h-125px"
                      :style="{
                        backgroundImage: `url(${getAssetPath(
                          user.avatar
                        )})`,
                      }"
                    >
                    </div>
                    <!--end::Preview existing avatar-->

                    <!--begin::Label-->
                    <label
                      class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                      data-kt-image-input-action="change"
                      data-bs-toggle="tooltip"
                      :title="$t('form.profile.change-avatar')"
                    >
                      <i class="bi bi-pencil-fill fs-7"></i>
                      <!--begin::Inputs-->
                      <input type="file" name="avatar" accept=".png, .jpg, .jpeg" />
                      <input type="hidden" name="avatarRemove" />
                      <!--end::Inputs-->
                    </label>
                    <!--end::Label-->

                    <!--begin::Remove-->
                    <span
                      class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                      data-kt-image-input-action="remove"
                      data-bs-toggle="tooltip"
                      @click="removeImage()"
                      :title="$t('form.profile.remove-avatar')"
                    >
                      <i class="bi bi-x fs-2"></i>
                    </span>
                    <!--end::Remove-->
                  </div>
                  <!--end::Image input-->

                  <!--begin::Hint-->
                  <div class="form-text" v-text="$t('form.profile.allowed-img')"></div>
                  <!--end::Hint-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                <label class="col-lg-4 col-form-label fw-semobold" v-text="$t('form.profile.username')"></label>
                <div class="col-lg-8 fv-row d-flex align-items-center">
                  <label id="username" class="form-control-lg form-control-transparent" v-text="user.username"></label>
                </div>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                <label class="col-lg-4 col-form-label required fw-semobold" v-text="$t('form.profile.full-name')"></label>
                <div class="col-lg-8">
                  <!--begin::Row-->
                  <div class="row">
                    <!--begin::Col-->
                    <div class="col-lg-6 fv-row">
                      <Field
                        type="text"
                        name="firstName"
                        class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        v-bind:placeholder="$t('form.profile.first-name')"
                        v-model="user.firstName"
                      />
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage name="firstName" />
                        </div>
                      </div>
                    </div>
                    <!--end::Col-->
                    <!--begin::Col-->
                    <div class="col-lg-6 fv-row">
                      <Field
                        type="text"
                        name="lastName"
                        class="form-control form-control-lg form-control-solid"
                        v-bind:placeholder="$t('form.profile.last-name')"
                        v-model="user.lastName"
                      />
                      <div class="fv-plugins-message-container">
                        <div class="fv-help-block">
                          <ErrorMessage name="lastName" />
                        </div>
                      </div>
                    </div>
                    <!--end::Col-->
                  </div>
                  <!--end::Row-->
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                <label class="col-lg-4 col-form-label required fw-semobold" v-text="$t('form.profile.email')"></label>
                <div class="col-lg-8 fv-row">
                  <Field
                    type="text"
                    name="email"
                    class="form-control form-control-lg form-control-solid"
                    v-model="user.email"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                <label class="col-lg-4 col-form-label fw-semobold">
                  <span class="required" v-text="$t('form.profile.mobile-no')"></span>
                  <el-tooltip placement="top" v-bind:content="$t('msg.global.active-mobile-num-tip')" >
                    <i class="fas fa-exclamation-circle ms-1 fs-7" ></i>
                  </el-tooltip>
                </label>
                <div class="col-lg-8 fv-row">
                  <Field
                    type="tel"
                    name="mobileNo"
                    class="form-control form-control-lg form-control-solid"
                    v-model="user.mobileNo"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="mobileNo" />
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                <label class="col-lg-4 col-form-label required fw-semobold" v-text="$t('form.profile.gender')"></label>
                <div class="col-lg-8 fv-row">
                  <div class="form-check form-check-custom form-check-solid form-check-lg">
                    <div class="d-flex align-items-center">
                      <Field
                        name="gender"
                        class="form-check-input"
                        type="radio"
                        value="male"
                        v-model="user.gender"
                      />
                      <label class="form-check-label" v-text="$t('form.profile.male')"></label>
                    </div>
                    <div class="d-flex px-5 align-items-center">
                      <Field
                        name="gender"
                        class="form-check-input"
                        type="radio"
                        value="female"
                        v-model="user.gender"
                      />
                      <label class="form-check-label" v-text="$t('form.profile.female')"></label>
                    </div>
                  </div>
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="gender" />
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="row mb-6">
                <label class="col-lg-4 col-form-label fw-semobold" v-text="$t('form.account.roles')"></label>
                <div class="col-lg-8 fv-row d-flex align-items-center">
                  <OneOrMore :values="user.roles" alignment="horizontal"/>
                </div>
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <!-- <div class="row mb-6">
                <label class="col-lg-4 col-form-label fw-semobold" v-text="$t('form.global.enabled')"></label>
                <div class="col-lg-8 d-flex align-items-center">
                  <div class="form-check form-check-solid form-switch fv-row">
                    <input
                      class="form-check-input w-45px h-30px"
                      type="checkbox"
                      v-model="user.enabled"
                    />
                    <label class="form-check-label" for="enabled"></label>
                  </div>
                </div>
              </div> -->
              <!--end::Input group-->
            </div>
            <!--end::Card body-->

            <!--begin::Actions-->
            <div class="card-footer d-flex justify-content-end py-6 px-9">
              <button
                type="submit"
                class="btn btn-primary"
                :data-kt-indicator="profileFormSubmitting ? 'on' : null"
                :disabled="profileFormSubmitting || !meta.valid"
              >
                <span v-if="!profileFormSubmitting" class="indicator-label" v-text="$t('form.global.save-changes')"></span>
                <span v-if="profileFormSubmitting" class="indicator-progress">
                  <span v-text="$t('form.global.wait')"></span>
                  <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              </button>
            </div>
            <!--end::Actions-->
          </VForm>
          <!--end::Form-->
        </div>
        <!--end::Content-->
      </div>
      <!--end::Update profile-->
    </div>


    <div class="col-xl-4">
      <!--begin::Personal settings-->
      <div class="card mb-xl-10 intro-y">
        <!--begin::Card header-->
        <div
          class="card-header border-0 cursor-pointer"
          role="button"
          data-bs-toggle="collapse"
          data-bs-target="#settingsSection"
        >
          <div class="card-title m-0">
            <h3 class="fw-bolder m-0"><span v-text="$t('form.profile.personal-settings')"></span></h3>
          </div>
        </div>
        <!--end::Card header-->

        <!--begin::Content-->
        <div id="settingsSection" class="collapse show">
          <!--begin::Form-->
          <VForm
            class="form"
            novalidate
            @submit="updateSettings()"
            :validation-schema="settingsValidationSchema"
            v-slot={meta}
          >
            <!--begin::Card body-->
            <div class="card-body border-top p-9">
              <!--begin::Personal settings-->
              <div class="d-flex flex-wrap align-items-center mb-8">
                <div
                  class="flex-row-fluid"
                >
                  <div class="row mb-6">
                    <div class="col-lg-12">
                      <div class="fv-row mb-0">
                        <label class="form-label required fw-bold mb-3" v-text="$t('form.profile.date-format')"></label>
                        <Field 
                          name="dateTimeFormatId" 
                          as="select" 
                          data-control="select" 
                          class="form-select form-select-solid"
                          v-model="userSettings.dateTimeFormatId"
                        >
                          <!-- https://day.js.org/docs/en/display/format#list-of-all-available-formats -->
                          <option value="" selected v-text="$t('form.global.select-option')"></option>
                          <option v-for="(item, key) in dateTimeFormats" :value="item.id" :key="key">{{ item.sample }}</option>
                          <!-- <option value="YYYY-MM-DD HH:mm:ss">2021-09-10 10:15:00</option>
                          <option value="DD MMM YYYY, HH:mm A">10 Sep 2021, 10:15 AM</option>
                          <option value="DD/MM/YYYY, HH:mm A">10/09/2021, 10:15 AM</option>
                          <option value="MMM DD, MMMM HH:mm a">Sep 10, 2021 10:15 am</option> -->
                        </Field>
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="dateTimeFormatId" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="fv-row mb-0">
                        <label class="form-label required fw-bold mb-3" v-text="$t('form.profile.time-zone')"></label>
                        <Field 
                          name="timeZone" 
                          as="select" 
                          data-control="select" 
                          class="form-select form-select-solid"
                          v-model="userSettings.timeZone"
                        >
                          <option value="" selected v-text="$t('form.global.select-option')"></option>
                          <option value="Asia/Shanghai">
                            Asia/Shanghai (GMT +08:00)
                          </option>
                          <option value="Asia/Tokyo">
                            Asia/Tokyo (GMT +09:00)
                          </option>
                        </Field>
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="timeZone" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Personal settings-->
            </div>
            <!--end::Card body-->
            <!--begin::Actions-->
            <div class="card-footer d-flex justify-content-end py-6 px-9">
              <button
                type="submit"
                class="btn btn-primary"
                :data-kt-indicator="settingsFormSubmitting ? 'on' : null"
                :disabled="settingsFormSubmitting || !meta.valid"
              >
                <span v-if="!settingsFormSubmitting" class="indicator-label" v-text="$t('form.global.save-changes')"></span>
                <span v-if="settingsFormSubmitting" class="indicator-progress">
                  <span v-text="$t('form.global.wait')"></span>
                  <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              </button>
            </div>
            <!--end::Actions-->
          </VForm>
          <!--end::Form-->
        </div>
        <!--end::Content-->
      </div>
      <!--end::Personal settings-->

      <!--begin::Change password-->
      <div class="card mb-xl-10 intro-y">
        <!--begin::Card header-->
        <div
          class="card-header border-0 cursor-pointer"
          role="button"
          data-bs-toggle="collapse"
          data-bs-target="#passwordSection"
        >
          <div class="card-title m-0">
            <h3 class="fw-bolder m-0"><span v-text="$t('form.profile.change-password')"></span></h3>
          </div>
        </div>
        <!--end::Card header-->

        <!--begin::Content-->
        <div id="passwordSection" class="collapse show">
          <!--begin::Form-->
          <VForm
            class="form"
            novalidate
            @submit="updatePwd()"
            :validation-schema="pwdValidationSchema"
            v-slot={meta}
          >
            <!--begin::Card body-->
            <div class="card-body border-top p-9">
              <!--begin::Password-->
              <div class="d-flex flex-wrap align-items-center mb-8">
                <div
                  :class="{ 'd-none': pwdFormInvisible }"
                >
                  <div class="fs-4 fw-bolder mb-1"  v-text="$t('form.login.password')"></div>
                  <div class="fw-semobold text-gray-600">************</div>
                </div>
                <div
                  class="flex-row-fluid"
                  :class="{ 'd-none': !pwdFormInvisible }"
                >
                  <div class="row mb-6">
                    <div class="col-lg-12">
                      <div class="fv-row mb-0">
                        <label class="form-label required fw-bold mb-3" v-text="$t('form.profile.current-password')"></label>
                        <Field
                          type="password"
                          class="form-control form-control-lg form-control-solid fw-semobold"
                          name="currentPassword"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="currentPassword" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row mb-6">
                    <div class="col-lg-12">
                      <div class="fv-row mb-0" data-kt-password-meter="true">
                        <label class="form-label required fw-bold mb-3" v-text="$t('form.profile.new-password')"></label>
                        <div class="position-relative mb-3">
                          <Field
                            type="password"
                            class="form-control form-control-lg form-control-solid fw-semobold"
                            name="newPassword"
                          />
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
                        <!--begin::Hint-->
                        <div class="form-text" v-text="$t('form.profile.password-pattern')"></div>
                        <!--end::Hint-->
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="newPassword" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="fv-row mb-0">
                        <label class="form-label required fw-bold mb-3" v-text="$t('form.profile.confirm-password')"></label>
                        <Field
                          type="password"
                          class="form-control form-control-lg form-control-solid fw-semobold"
                          name="confirmpassword"
                        />
                        <div class="fv-plugins-message-container">
                          <div class="fv-help-block">
                            <ErrorMessage name="confirmpassword" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ms-auto" :class="{ 'd-none': pwdFormInvisible }">
                  <button
                    type="button"
                    @click="pwdFormInvisible = !pwdFormInvisible"
                    class="btn btn-light fw-bolder"
                  >
                    <span v-text="$t('form.profile.reset-password')"></span>
                  </button>
                </div>
              </div>
              <!--end::Password-->
            </div>
            <!--end::Card body-->
            <!--begin::Actions-->
            <div class="card-footer d-flex justify-content-end py-6 px-9" :class="{ 'd-none': !pwdFormInvisible }">
              <button
                type="button"
                @click="pwdFormInvisible = !pwdFormInvisible"
                class="btn btn-light btn-active-light-primary me-4 px-6"
              >
                <span v-text="$t('form.global.discard')"></span>
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :data-kt-indicator="pwdFormSubmitting ? 'on' : null"
                :disabled="pwdFormSubmitting || !meta.valid"
              >
                <span v-if="!pwdFormSubmitting" class="indicator-label" v-text="$t('form.global.save-changes')"></span>
                <span v-if="pwdFormSubmitting" class="indicator-progress">
                  <span v-text="$t('form.global.wait')"></span>
                  <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              </button>
            </div>
            <!--end::Actions-->
          </VForm>
          <!--end::Form-->
        </div>
        <!--end::Content-->
      </div>
      <!--end::Change password-->
    </div>
  </div>
  <!--end::Row-->


  


  <div class="d-flex flex-column flex-center text-center">
    <div class="card card-flush w-lg-550px w-md-100 py-5">
      <div class="card-body py-15 py-lg-20">
        <div class="mb-10">
          <a href="http://passport.luixtech.cn">
            <img alt="logo" class="h-40px" src="http://passport.luixtech.cn/assets/media/logos/logo-text.svg"/>
          </a>
        </div>
        <div class="mb-10">
          <img alt="vote-logo" class="h-125px" src="http://passport.luixtech.cn/assets/media/email/icon-positive-vote-1.svg"/>
        </div>
        <h1 class="fw-bolder text-gray-900 mb-10">Verify your email</h1>
        <div class="fs-5 mb-1">
          <span class="fw-bold text-gray-800">Hey Louis,</span>
        </div>
        <div class="fs-5 mb-15">
          <span class="fw-semibold text-gray-800">Thanks for registering for an account on Luix Passport! Before we get started, we just need to confirm that this is you. Click below to verify your email address:</span>
        </div>
        <div class="mb-10">
          <a href="../../demo1/dist/index.html" class="btn btn-lg btn-primary hover-elevate-down">Verify</a>
        </div>
      </div>
      <div class="fw-semibold">
        Sent by <a href="http://passport.luixtech.cn">Luix Passport</a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { defineComponent, nextTick, onMounted, ref, computed } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { PasswordMeterComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import type { IUser } from '@/domain/User';
import type { IUserSettings } from '@/domain/UserSettings';
import OneOrMore  from '@/components/utilities/one-or-more.vue'
import { useI18n } from "vue-i18n";
import { DateTimeUtils, dateTimeFormats } from "@/helpers/DateTimeUtils";


export default defineComponent({
  name: "my-profile",
  components: {
    OneOrMore,
    VForm,
    ErrorMessage,
    Field,
  },
  setup() {
    const pwdFormInvisible = ref(false);
    const profileFormSubmitting = ref<boolean>(false);
    const settingsFormSubmitting = ref<boolean>(false);
    const pwdFormSubmitting = ref<boolean>(false);
    const i18n = useI18n();

    onMounted(() => {
      nextTick(() => {
        PasswordMeterComponent.bootstrap();
      });
    })

    const user = ref<IUser>({
      id: "101",
      username: "louis",
      firstName: "Louis",
      lastName: "Lau",
      email: "louis@126.com",
      mobileNo: "17991914521",
      avatar: "media/avatars/300-0.jpg",
      gender: "male",
      roles: ['Admin', 'Developer'],
      lastLogin: "2023-03-09T02:30:04.544Z",
      joinedTime: "2023-03-09T02:30:04.544Z",
      enabled: true,
    })
    const profileValidationSchema = computed(()=> {
      return Yup.object().shape({
        firstName: Yup.string().required(i18n.t("validation.global.required")),
        lastName: Yup.string().required(i18n.t("validation.global.required")),
        email: Yup.string().required(i18n.t("validation.global.required")),
        mobileNo: Yup.string().required(i18n.t("validation.global.required")),
        gender: Yup.string().required(i18n.t("validation.global.required")),
      })
    })
    const removeImage = () => {
      user.value.avatar = "media/avatars/blank.png";
    }
    const saveUser = () => {
      // Activate indicator
      profileFormSubmitting.value = true;
      setTimeout(() => {
        profileFormSubmitting.value = false;
        Swal.fire({
          text: i18n.t("msg.global.saved-successfully"),
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
          heightAuto: false,
        }).then(() => {
        });
      }, 1000);
    }
    const userSettings = ref<IUserSettings>({
      id: "101",
      dateTimeFormatId: DateTimeUtils.getCurrentDateTimeFormatId(),
      timeZone: DateTimeUtils.getCurrentTimeZone()
    })
    const settingsValidationSchema = computed(()=> {
      return Yup.object().shape({
        dateTimeFormatId: Yup.string().required(i18n.t("validation.global.required")),
        timeZone: Yup.string().required(i18n.t("validation.global.required"))
      })
    })

    const updateSettings = () => {
      // Activate indicator
      settingsFormSubmitting.value = true;
      DateTimeUtils.setDateTimeFormatId(userSettings.value.dateTimeFormatId);
      DateTimeUtils.setTimeZone(userSettings.value.timeZone);

      setTimeout(() => {
        settingsFormSubmitting.value = false;

        Swal.fire({
          text: i18n.t("msg.global.saved-successfully"),
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
          heightAuto: false,
        }).then(() => {
        });
      }, 1000);
    }

    const pwdValidationSchema = computed(()=> {
      return Yup.object().shape({
        currentPassword: Yup.string().required(i18n.t("validation.global.required")),
        newPassword: Yup.string()
          .required(i18n.t("validation.global.required"))
          .min(4, i18n.t("validation.global.min-length", { min: 4 })),
        confirmpassword: Yup.string()
          .required(i18n.t("validation.global.required"))
          .oneOf([Yup.ref("newPassword"), null], i18n.t("validation.global.passwords-must-match")),
      })
    })
    const updatePwd = () => {
      // Activate indicator
      pwdFormSubmitting.value = true;
      setTimeout(() => {
        pwdFormSubmitting.value = false;
        Swal.fire({
          text: i18n.t("msg.global.update-password-successfully"),
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
          heightAuto: false,
        }).then(() => {
          pwdFormInvisible.value = false;
        });
      }, 1000);
    }
    return {
      user,
      userSettings,
      removeImage,
      profileValidationSchema,
      settingsValidationSchema,
      updateSettings,
      saveUser,
      pwdFormInvisible,
      pwdValidationSchema,
      updatePwd,
      getAssetPath,
      profileFormSubmitting,
      settingsFormSubmitting,
      pwdFormSubmitting,
      dateTimeFormats
    }
  }
});
</script>



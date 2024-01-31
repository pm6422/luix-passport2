<template>
  <!--begin::Layout Builder Notice-->
  <div class="card mb-10 bg-light-info intro-y">
    <div class="card-body d-flex align-items-center py-8">
      <!--begin::Icon-->
      <div class="d-flex h-50px w-50px h-lg-80px w-lg-80px flex-shrink-0 flex-center position-relative align-self-start align-self-lg-center mt-3 mt-lg-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="text-primary h-75px w-75px h-lg-100px w-lg-100px position-absolute opacity-5"
        >
          <path
            fill="currentColor"
            d="M10.2,21.23,4.91,18.17a3.58,3.58,0,0,1-1.8-3.11V8.94a3.58,3.58,0,0,1,1.8-3.11L10.2,2.77a3.62,3.62,0,0,1,3.6,0l5.29,3.06a3.58,3.58,0,0,1,1.8,3.11v6.12a3.58,3.58,0,0,1-1.8,3.11L13.8,21.23A3.62,3.62,0,0,1,10.2,21.23Z"
          ></path>
        </svg>
        <KTIcon
          icon-name="wrench"
          icon-class="fs-2x fs-lg-3x text-primary position-absolute"
        />
      </div>
      <!--end::Icon-->

      <!--begin::Description-->
      <div class="ms-6">
        <p class="list-unstyled text-gray-600 fw-semobold fs-6 p-0 m-0">
          {{ $t('form.layout-settings.intro') }}
        </p>
      </div>
      <!--end::Description-->
    </div>
  </div>
  <!--end::Layout Builder Notice-->

  <div class="card mb-10 intro-y">
    <!--begin::Header-->
    <div class="card-header card-header-stretch">
      <ul
        class="nav nav-stretch nav-line-tabs fw-semobold border-0"
        role="tablist"
        id="kt_layout_builder_tabs"
        ref="kt_layout_builder_tabs"
      >
        <li class="nav-item">
          <a
            class="nav-link cursor-pointer"
            :class="{ active: tabIndex === 'main' }"
            data-bs-toggle="tab"
            @click="setActiveTab($event)"
            data-tab-index="main"
            role="tab"
          >
            {{ $t('form.layout-settings.main') }}
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link cursor-pointer"
            :class="{ active: tabIndex === 'layout' }"
            data-bs-toggle="tab"
            @click="setActiveTab($event)"
            data-tab-index="layout"
            role="tab"
          >
          {{ $t('form.layout-settings.layout') }}
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link cursor-pointer"
            :class="{ active: tabIndex === 'sidebar' }"
            data-bs-toggle="tab"
            @click="setActiveTab($event)"
            data-tab-index="sidebar"
            role="tab"
          >
          {{ $t('form.layout-settings.sidebar') }}
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link cursor-pointer"
            :class="{ active: tabIndex === 'header' }"
            data-bs-toggle="tab"
            @click="setActiveTab($event)"
            data-tab-index="header"
            role="tab"
          >
          {{ $t('form.layout-settings.header') }}
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link cursor-pointer"
            :class="{ active: tabIndex === 'toolbar' }"
            data-bs-toggle="tab"
            @click="setActiveTab($event)"
            data-tab-index="toolbar"
            role="tab"
          >
          {{ $t('form.layout-settings.toolbar') }}
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link cursor-pointer"
            :class="{ active: tabIndex === 'footer' }"
            data-bs-toggle="tab"
            @click="setActiveTab($event)"
            data-tab-index="footer"
            role="tab"
          >
          {{ $t('form.layout-settings.footer') }}
          </a>
        </li>
      </ul>
    </div>
    <!--end::Header-->

    <!--begin::Form-->
    <form class="form" id="kt_layout_builder_form" @submit="submit($event)">
      <!--begin::Body-->
      <div class="card-body">
        <div class="tab-content pt-3" id="kt_tabs">
          <div
            class="tab-pane"
            :class="{ active: tabIndex === 'main' }"
            id="kt_builder_main"
          >
            <!--begin::Row-->
            <div class="row">
              <!--begin::Col-->
              <div class="col-lg-6 pe-lg-15">
                <!--begin::Form group-->
                <div class="form-group">
                  <!--begin::Heading-->
                  <div class="mb-6">
                    <h4 class="fw-bold text-dark" v-text="$t('menu.account.theme-mode')"></h4>
                    <div class="fw-semibold text-muted fs-7 d-block lh-1">
                      {{ $t('form.layout-settings.select-theme-mode') }}
                    </div>
                  </div>
                  <!--end::Heading-->
                  <!--begin::Options-->
                  <div
                    class="row"
                    data-kt-buttons="true"
                    data-kt-buttons-target=".form-check-image,.form-check-input"
                    data-kt-initialized="1"
                  >
                    <!--begin::Col-->
                    <div class="col-4">
                      <!--begin::Option-->
                      <label class="form-check-image form-check-success" :class="{ active: themeMode === 'dark' }">
                        <!--begin::Image-->
                        <div class="form-check-wrapper">
                          <img :src=" getAssetPath('media/misc/layout/dark-theme.png')" class="mw-100" alt="" />
                        </div>
                        <!--end::Image-->
                        <!--begin::Check-->
                        <div class="form-check form-check-custom form-check-solid form-check-sm form-check-success">
                          <input
                            class="form-check-input"
                            type="radio"
                            :checked="'dark' === themeMode"
                            value="dark"
                            name="theme_mode"
                            @change="onThemeModeChange"
                          />
                          <!--begin::Label-->
                          <div class="form-check-label text-gray-700">
                            {{ $t('menu.account.dark') }}
                          </div>
                          <!--end::Label-->
                        </div>
                        <!--end::Check-->
                      </label>
                      <!--end::Option-->
                    </div>
                    <!--end::Col-->
                    <!--begin::Col-->
                    <div class="col-4">
                      <!--begin::Option-->
                      <label class="form-check-image form-check-success" :class="{ active: themeMode === 'light' }">
                        <!--begin::Image-->
                        <div class="form-check-wrapper">
                          <img :src="getAssetPath('media/misc/layout/light-theme.png')" class="mw-100" alt=""/>
                        </div>
                        <!--end::Image-->
                        <!--begin::Check-->
                        <div class="form-check form-check-custom form-check-solid form-check-sm form-check-success">
                          <input
                            class="form-check-input"
                            type="radio"
                            :checked="'light' === themeMode"
                            value="light"
                            name="theme_mode"
                            @change="onThemeModeChange"
                          />
                          <!--begin::Label-->
                          <div class="form-check-label text-gray-700">
                            {{ $t('menu.account.light') }}
                          </div>
                          <!--end::Label-->
                        </div>
                        <!--end::Check-->
                      </label>
                      <!--end::Option-->
                    </div>
                    <!--end::Col-->
                    <!--begin::Col-->
                    <div class="col-4">
                      <!--begin::Option-->
                      <label class="form-check-image form-check-success" :class="{ active: themeMode === 'system' }">
                        <!--begin::Image-->
                        <div class="form-check-wrapper">
                          <img :src="getAssetPath('media/misc/layout/system-theme.png')" class="mw-100" alt=""/>
                        </div>
                        <!--end::Image-->
                        <!--begin::Check-->
                        <div class="form-check form-check-custom form-check-solid form-check-sm form-check-success">
                          <input
                            class="form-check-input"
                            type="radio"
                            :checked="'system' === themeMode"
                            value="system"
                            name="theme_mode"
                            @change="onThemeModeChange"
                          />
                          <!--begin::Label-->
                          <div class="form-check-label text-gray-700">
                            {{ $t('menu.account.system') }}
                          </div>
                          <!--end::Label-->
                        </div>
                        <!--end::Check-->
                      </label>
                      <!--end::Option-->
                    </div>
                    <!--end::Col-->
                  </div>
                  <!--end::Options-->
                </div>
                <!--end::Form group-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Row-->
            <!--begin::Separator-->
            <div class="separator separator-dashed my-6"></div>
            <!--end::Separator-->
            <!--begin::Form group-->
            <div class="form-group">
              <!--begin::Heading-->
              <div class="d-flex flex-column mb-4">
                <h4 class="fw-bold text-dark" v-text="$t('form.layout-settings.width-mode')"></h4>
                <div class="fs-7 fw-semibold text-muted">
                  {{ $t('form.layout-settings.width-mode-tip') }}
                </div>
              </div>
              <!--end::Heading-->
              <!--begin::Options-->
              <div class="d-flex">
                <!--begin::Check-->
                <div
                  class="form-check form-check-custom form-check-success form-check-solid form-check-sm me-7"
                >
                  <input
                    v-model="config.general.pageWidth"
                    class="form-check-input"
                    type="radio"
                    value="default"
                    id="kt_builder_page_width_default"
                  />
                  <!--begin::Label-->
                  <label
                    class="form-check-label text-gray-700 fw-bold text-nowrap"
                    for="kt_builder_page_width_default"
                    >{{ $t('form.global.default') }}</label
                  >
                  <!--end::Label-->
                </div>
                <!--end::Check-->
                <!--begin::Check-->
                <div
                  class="form-check form-check-custom form-check-success form-check-solid form-check-sm me-7"
                >
                  <input
                    v-model="config.general.pageWidth"
                    class="form-check-input"
                    type="radio"
                    value="fluid"
                    id="kt_builder_page_width_fluid"
                  />
                  <!--begin::Label-->
                  <label
                    class="form-check-label text-gray-700 fw-bold text-nowrap"
                    for="kt_builder_page_width_fluid"
                    >{{ $t('form.layout-settings.fluid') }}</label
                  >
                  <!--end::Label-->
                </div>
                <!--end::Check-->
                <!--begin::Check-->
                <div
                  class="form-check form-check-custom form-check-success form-check-solid form-check-sm me-7"
                >
                  <input
                    v-model="config.general.pageWidth"
                    class="form-check-input"
                    type="radio"
                    value="fixed"
                    id="kt_builder_page_width_fixed"
                  />
                  <!--begin::Label-->
                  <label
                    class="form-check-label text-gray-700 fw-bold text-nowrap"
                    for="kt_builder_page_width_fixed"
                    >{{ $t('form.layout-settings.fixed') }}</label
                  >
                  <!--end::Label-->
                </div>
                <!--end::Check-->
              </div>
              <!--end::Options-->
            </div>
            <!--end::Form group-->
            <!--begin::Separator-->
            <div class="separator separator-dashed my-6"></div>
            <!--end::Separator-->
            <!--begin::Form group-->
            <div class="form-group d-flex flex-stack">
              <!--begin::Heading-->
              <div class="d-flex flex-column">
                <h4 class="fw-bold text-dark" v-text="$t('form.layout-settings.icons-style')"></h4>
                <div>
                  <span class="fs-7 fw-semibold text-muted">{{ $t('form.layout-settings.icons-style-tip') }}</span>
                </div>
              </div>
              <!--end::Heading-->
              <!--begin::Options-->
              <div
                class="d-flex flex-stack gap-3 mw-lg-600px"
                data-kt-buttons="true"
                data-kt-buttons-target=".form-check-image,.form-check-input"
                data-kt-initialized="1"
              >
                <!--begin::Option-->
                <label
                  :class="config.general.iconsType === 'duotone' && 'active'"
                  class="form-check-image form-check-success w-100 parent-active parent-hover"
                >
                  <!--begin::Image-->
                  <div
                    class="form-check-wrapper d-flex flex-center border-gray-200 border-2 mb-0 py-3 px-4"
                  >
                    <KTIcon
                      icon-type="duotone"
                      icon-name="picture"
                      icon-class="fs-1 text-gray-500 parent-active-gray-700 parent-hover-gray-700"
                    />
                    <span
                      class="fs-7 fw-semibold ms-2 text-gray-500 parent-active-gray-700 parent-hover-gray-700"
                      >Duotone</span
                    >
                  </div>
                  <!--end::Image-->
                  <!--begin::Check-->
                  <div
                    style="
                      visibility: hidden;
                      height: 0;
                      width: 0;
                      overflow: hidden;
                    "
                  >
                    <input
                      v-model="config.general.iconsType"
                      class="form-check-input"
                      type="radio"
                      value="duotone"
                      :checked="config.general.iconsType === 'duotone'"
                    />
                  </div>
                  <!--end::Check-->
                </label>
                <!--end::Option-->
                <!--begin::Option-->
                <label
                  :class="config.general.iconsType === 'outline' && 'active'"
                  class="form-check-image form-check-success w-100 parent-active parent-hover"
                >
                  <!--begin::Image-->
                  <div
                    class="form-check-wrapper d-flex flex-center border-gray-200 border-2 mb-0 py-3 px-4"
                  >
                    <i
                      class="ki-outline ki-picture fs-1 text-gray-500 parent-active-gray-700 parent-hover-gray-700"
                    ></i>
                    <span
                      class="fs-7 fw-semibold ms-2 text-gray-500 parent-active-gray-700 parent-hover-gray-700"
                      >Outline</span
                    >
                  </div>
                  <!--end::Image-->
                  <!--begin::Check-->
                  <div
                    style="
                      visibility: hidden;
                      height: 0;
                      width: 0;
                      overflow: hidden;
                    "
                  >
                    <input
                      v-model="config.general.iconsType"
                      class="form-check-input"
                      type="radio"
                      value="outline"
                      name="outline"
                      :checked="config.general.iconsType === 'outline'"
                    />
                  </div>
                  <!--end::Check-->
                </label>
                <!--end::Option-->
                <!--begin::Option-->
                <label
                  :class="config.general.iconsType === 'solid' && 'active'"
                  class="form-check-image form-check-success w-100 parent-active parent-hover"
                >
                  <!--begin::Image-->
                  <div
                    class="form-check-wrapper d-flex flex-center border-gray-200 border-2 mb-0 py-3 px-4"
                  >
                    <i
                      class="ki-solid ki-picture fs-1 text-gray-500 parent-active-gray-700 parent-hover-gray-700"
                    ></i>
                    <span
                      class="fs-7 fw-semibold ms-2 text-gray-500 parent-active-gray-700 parent-hover-gray-700"
                      >Solid</span
                    >
                  </div>
                  <!--end::Image-->
                  <!--begin::Check-->
                  <div
                    style="
                      visibility: hidden;
                      height: 0;
                      width: 0;
                      overflow: hidden;
                    "
                  >
                    <input
                      v-model="config.general.iconsType"
                      class="form-check-input"
                      type="radio"
                      value="solid"
                      name="solid"
                      :checked="config.general.iconsType === 'solid'"
                    />
                  </div>
                  <!--end::Check-->
                </label>
                <!--end::Option-->
              </div>
              <!--end::Options-->
            </div>
            <!--end::Form group-->
          </div>
          <div
            class="tab-pane"
            :class="{ active: tabIndex === 'layout' }"
            id="kt_builder_layout"
          >
            <!--begin::Heading-->
            <div class="mb-6">
              <h4 class="fw-bold text-dark" v-text="$t('form.layout-settings.layouts')"></h4>
              <span class="fw-semibold text-muted fs-7 lh-1">
                {{ $t('form.layout-settings.layouts-tip') }}
              </span>
            </div>
            <!--end::Heading-->
            <!--begin::Options-->
            <div
              class="row gy-5"
              data-kt-buttons="true"
              data-kt-buttons-target=".form-check-image:not(.disabled),.form-check-input:not([disabled])"
              data-kt-initialized="1"
            >
              <!--begin::Col-->
              <div class="col-lg-3">
                <!--begin::Option-->
                <label
                  :class="[layoutType === 'dark-sidebar' && 'active']"
                  class="form-check-image form-check-success"
                >
                  <!--begin::Image-->
                  <div class="form-check-wrapper">
                    <img
                      :src="getAssetPath('media/misc/layout/dark-sidebar.png')"
                      class="mw-100"
                      alt=""
                    />
                  </div>
                  <!--end::Image-->
                  <!--begin::Check-->
                  <div
                    class="form-check form-check-custom form-check-success form-check-sm form-check-solid"
                  >
                    <input
                      v-model="layoutType"
                      class="form-check-input"
                      type="radio"
                      value="dark-sidebar"
                      name="layoutType"
                    />
                    <!--begin::Label-->
                    <div class="form-check-label text-gray-800">
                      {{ $t('form.layout-settings.dark-sidebar') }}
                    </div>
                    <!--end::Label-->
                  </div>
                  <!--end::Check-->
                </label>
                <!--end::Option-->
              </div>
              <!--end::Col-->
              <!--begin::Col-->
              <div class="col-lg-3">
                <!--begin::Option-->
                <label
                  :class="[layoutType === 'light-sidebar' && 'active']"
                  class="form-check-image form-check-success"
                >
                  <!--begin::Image-->
                  <div class="form-check-wrapper">
                    <img
                      :src="getAssetPath('media/misc/layout/light-sidebar.png')"
                      class="mw-100"
                      alt=""
                    />
                  </div>
                  <!--end::Image-->
                  <!--begin::Check-->
                  <div
                    class="form-check form-check-custom form-check-success form-check-sm form-check-solid"
                  >
                    <input
                      v-model="layoutType"
                      class="form-check-input"
                      type="radio"
                      value="light-sidebar"
                      name="layoutType"
                    />
                    <!--begin::Label-->
                    <div class="form-check-label text-gray-800">
                      {{ $t('form.layout-settings.light-sidebar') }}
                    </div>
                    <!--end::Label-->
                  </div>
                  <!--end::Check-->
                </label>
                <!--end::Option-->
              </div>
              <!--end::Col-->
              <!--begin::Col-->
              <div class="col-lg-3">
                <!--begin::Option-->
                <label
                  :class="[layoutType === 'dark-header' && 'active']"
                  class="form-check-image form-check-success"
                >
                  <!--begin::Image-->
                  <div class="form-check-wrapper">
                    <img
                      :src="getAssetPath('media/misc/layout/dark-header.png')"
                      class="mw-100"
                      alt=""
                    />
                  </div>
                  <!--end::Image-->
                  <!--begin::Check-->
                  <div
                    class="form-check form-check-custom form-check-success form-check-sm form-check-solid"
                  >
                    <input
                      v-model="layoutType"
                      class="form-check-input"
                      type="radio"
                      value="dark-header"
                      name="layoutType"
                    />
                    <!--begin::Label-->
                    <div class="form-check-label text-gray-800">
                      {{ $t('form.layout-settings.dark-header') }}
                    </div>
                    <!--end::Label-->
                  </div>
                  <!--end::Check-->
                </label>
                <!--end::Option-->
              </div>
              <!--end::Col-->
              <!--begin::Col-->
              <div class="col-lg-3">
                <!--begin::Option-->
                <label
                  :class="[layoutType === 'light-header' && 'active']"
                  class="form-check-image form-check-success"
                >
                  <!--begin::Image-->
                  <div class="form-check-wrapper">
                    <img
                      :src="getAssetPath('media/misc/layout/light-header.png')"
                      class="mw-100"
                      alt=""
                    />
                  </div>
                  <!--end::Image-->
                  <!--begin::Check-->
                  <div
                    class="form-check form-check-custom form-check-success form-check-sm form-check-solid"
                  >
                    <input
                      v-model="layoutType"
                      class="form-check-input"
                      type="radio"
                      value="light-header"
                      name="layoutType"
                    />
                    <!--begin::Label-->
                    <div class="form-check-label text-gray-800">
                      {{ $t('form.layout-settings.light-header') }}
                    </div>
                    <!--end::Label-->
                  </div>
                  <!--end::Check-->
                </label>
                <!--end::Option-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Options-->
          </div>

          <div
            class="tab-pane"
            :class="{ active: tabIndex === 'sidebar' }"
            id="kt_builder_sidebar"
          >
            <!--begin::Form group-->
            <div class="form-group d-flex flex-stack">
              <!--begin::Heading-->
              <div class="d-flex flex-column">
                <h4 class="fw-bold text-dark" v-text="$t('form.global.minimize')"></h4>
                <div class="fs-7 fw-semibold text-muted">
                  {{ $t('form.layout-settings.minimize-tip') }}
                </div>
              </div>
              <!--end::Heading-->
              <!--begin::Option-->
              <div class="d-flex justify-content-end">
                <!--begin::Check-->
                <div
                  class="form-check form-check-custom form-check-solid form-check-success form-switch ms-10"
                >
                  <input
                    v-model="config.sidebar.default.minimize.desktop.default"
                    class="form-check-input w-45px h-30px"
                    type="checkbox"
                    value="true"
                    id="kt_builder_sidebar_minimize_desktop_default"
                  />
                  <!--begin::Label-->
                  <label
                    class="form-check-label text-gray-700 fw-bold"
                    for="kt_builder_sidebar_minimize_desktop_default"
                    data-bs-toggle="tooltip"
                    data-kt-initialized="1"
                  >
                    {{ $t('form.layout-settings.default-minimized') }}
                  </label>
                  <!--end::Label-->
                </div>
                <!--end::Check-->
              </div>
              <!--end::Option-->
            </div>
            <!--end::Form group-->
          </div>

          <div
            class="tab-pane"
            :class="{ active: tabIndex === 'header' }"
            id="kt_builder_header"
          >
            <div
              class="tab-pane active show"
              id="kt_builder_header"
              role="tabpanel"
            >
              <!--begin::Form group-->
              <div class="form-group d-flex flex-stack">
                <!--begin::Heading-->
                <div class="d-flex flex-column">
                  <h4 class="fw-bold text-dark" v-text="$t('form.layout-settings.fixed')"></h4>
                  <div class="fs-7 fw-semibold text-muted">
                    {{ $t('form.layout-settings.fixed-toolbar-mode') }}
                  </div>
                </div>
                <!--end::Heading-->
                <!--begin::Option-->
                <div class="d-flex justify-content-end">
                  <!--begin::Check-->
                  <div
                    class="form-check form-check-custom form-check-solid form-check-success form-switch me-10"
                  >
                    <input
                      v-model="config.header.default.fixed.desktop"
                      class="form-check-input w-45px h-30px"
                      type="checkbox"
                      value="true"
                      id="kt_builder_header_fixed_desktop"
                    />
                    <!--begin::Label-->
                    <label
                      class="form-check-label text-gray-700 fw-bold"
                      for="kt_builder_header_fixed_desktop"
                    >
                      {{ $t('form.layout-settings.desktop-mode') }}
                    </label>
                    <!--end::Label-->
                  </div>
                  <!--end::Check-->
                  <!--begin::Check-->
                  <div
                    class="form-check form-check-custom form-check-solid form-check-success form-switch"
                  >
                    <input
                      v-model="config.header.default.fixed.mobile"
                      class="form-check-input w-45px h-30px"
                      type="checkbox"
                      value="true"
                      id="kt_builder_header_fixed_mobile"
                    />
                    <!--begin::Label-->
                    <label
                      class="form-check-label text-gray-700 fw-bold"
                      for="kt_builder_header_fixed_mobile"
                    >
                      {{ $t('form.layout-settings.mobile-mode') }}
                    </label>
                    <!--end::Label-->
                  </div>
                  <!--end::Check-->
                </div>
                <!--end::Option-->
              </div>
              <!--end::Form group-->
              <!--begin::Separator-->
              <div class="separator separator-dashed my-6"></div>
              <!--end::Separator-->
              <!--begin::Form group-->
              <div class="form-group d-flex flex-stack">
                <!--begin::Heading-->
                <div class="d-flex flex-column">
                  <h4 class="fw-bold text-dark" v-text="$t('form.layout-settings.content')"></h4>
                  <div class="fs-7 fw-semibold text-muted">
                    {{ $t('form.layout-settings.header-content-type') }}
                  </div>
                </div>
                <!--end::Heading-->
                <!--begin::Option-->
                <div class="d-flex justify-content-end">
                  <!--begin::Check-->
                  <div class="form-check form-check-custom form-check-solid form-check-success form-check-sm me-10">
                    <input
                      v-model="config.header.default.content"
                      class="form-check-input"
                      type="radio"
                      value="menu"
                      :checked="config.header.default.content === 'menu'"
                    />
                    <!--begin::Label-->
                    <label
                      class="form-check-label text-gray-700 fw-bold"
                      data-bs-toggle="tooltip"
                      data-kt-initialized="1"
                    >
                      {{ $t('form.layout-settings.menu') }}
                    </label>
                    <!--end::Label-->
                  </div>
                  <!--end::Check-->
                  <!--begin::Check-->
                  <div class="form-check form-check-custom form-check-solid form-check-success">
                    <input
                      v-model="config.header.default.content"
                      class="form-check-input"
                      type="radio"
                      value="page-title"
                      :checked="config.header.default.content === 'page-title'"
                    />
                    <!--begin::Label-->
                    <label
                      class="form-check-label text-gray-700 fw-bold"
                      data-bs-toggle="tooltip"
                      data-kt-initialized="1"
                    >
                      {{ $t('form.layout-settings.page-title') }}
                    </label>
                    <!--end::Label-->
                  </div>
                  <!--end::Check-->
                </div>
                <!--end::Option-->
              </div>
              <!--end::Form group-->
              
            </div>
          </div>

          <div
            class="tab-pane"
            :class="{ active: tabIndex === 'toolbar' }"
            id="kt_builder_header"
          >
            <div
              class="tab-pane active show"
              id="kt_builder_header"
              role="tabpanel"
            >
              <!--begin::Form group-->
              <div class="form-group d-flex flex-stack">
                <!--begin::Heading-->
                <div class="d-flex flex-column">
                  <h4 class="fw-bold text-dark" v-text="$t('form.global.display')"></h4>
                  <div class="fs-7 fw-semibold text-muted">
                    {{ $t('form.layout-settings.toolbar-tip') }}
                  </div>
                </div>
                <!--end::Heading-->
                <!--begin::Option-->
                <div class="d-flex justify-content-end">
                  <!--begin::Check-->
                  <div
                    class="form-check form-check-custom form-check-solid form-check-success form-switch me-10"
                  >
                    <input
                      v-model="config.toolbar.display"
                      class="form-check-input w-45px h-30px"
                      type="checkbox"
                      value="true"
                      id="kt_builder_toolbar_display"
                    />
                  </div>
                  <!--end::Check-->
                </div>
                <!--end::Option-->
              </div>
              <!--end::Form group-->
            </div>
          </div>

          <div
            class="tab-pane"
            :class="{ active: tabIndex === 'footer' }"
            id="kt_builder_header"
          >
            <div
              class="tab-pane active show"
              id="kt_builder_header"
              role="tabpanel"
            >
              <!--begin::Form group-->
              <div class="form-group d-flex flex-stack">
                <!--begin::Heading-->
                <div class="d-flex flex-column">
                  <h4 class="fw-bold text-dark" v-text="$t('form.global.display')"></h4>
                  <div class="fs-7 fw-semibold text-muted">
                    {{ $t('form.layout-settings.footer-tip') }}
                  </div>
                </div>
                <!--end::Heading-->
                <!--begin::Option-->
                <div class="d-flex justify-content-end">
                  <!--begin::Check-->
                  <div
                    class="form-check form-check-custom form-check-solid form-check-success form-switch me-10"
                  >
                    <input
                      v-model="config.footer.display"
                      class="form-check-input w-45px h-30px"
                      type="checkbox"
                      value="true"
                      id="kt_builder_footer_display"
                    />
                  </div>
                  <!--end::Check-->
                </div>
                <!--end::Option-->
              </div>
              <!--end::Form group-->
            </div>
          </div>

        </div>
      </div>
      <!--end::Body-->

      <!--begin::Footer-->
      <div class="card-footer py-6">
        <div class="row">
          <div class="col-lg-9">
            <button
              type="submit"
              id="kt_layout_builder_preview"
              class="btn btn-primary me-2"
            >
              <span class="indicator-label">{{ $t('form.global.apply') }}</span>
              <span class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>

            <button
              @click="reset($event)"
              type="button"
              id="kt_layout_builder_reset"
              class="btn btn-light"
            >
              {{ $t('form.global.reset') }}
            </button>
          </div>
        </div>
      </div>
      <!--end::Footer-->
    </form>
    <!--end::Form-->
  </div>

  <!--begin::Card-->
  <div class="card intro-y">
    <!--begin::Card Body-->
    <div class="card-body p-10 p-lg-15">
      <!--begin::Heading-->
      <h1 class="anchor fw-bold mb-5" id="overview" v-text="$t('form.layout-settings.generated-config')"></h1>
      <!--end::Heading-->
      <div class="py-5">
        {{ $t('form.layout-settings.config-file-tip') }}
        <code>src/core/config/default-layout-config.ts</code>
      </div>
      <CodeHighlighter :obj=config lang="json"/>
    </div>
    <!--end::Card Body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { defineComponent, onMounted, ref, computed } from "vue";
import { config, layout } from "@/helpers/config";
import CodeHighlighter from "@/components/highlighters/CodeHighlighter.vue";
import { themeName } from "@/helpers/documentation";
import { useThemeStore } from "@/stores/theme-store";
import { LS_CONFIG_NAME_KEY, useConfigStore } from "@/stores/config-store";

// const LS_BUILDER_TAB_NAME = "layoutBuilderTabIndex_" + import.meta.env.VITE_APP_DEMO;
const LS_BUILDER_TAB_NAME = "ac_layout_builder_tab_index";

export default defineComponent({
  name: "layout-builder",
  components: {
    CodeHighlighter,
  },
  setup() {
    const themeStore = useThemeStore();
    const configStore = useConfigStore();
    const tabIndex = ref<string>("main");
    const layoutType = ref(layout.value);

    onMounted(() => {
      // set the tab from previous
      tabIndex.value = localStorage.getItem(LS_BUILDER_TAB_NAME) || "main";
    });

    const themeMode = computed(() => {
      return themeStore.mode;
    });

    /**
     * Reset config
     * @param e
     */
    const reset = (e: Event) => {
      e.preventDefault();
      // remove existing saved config
      localStorage.removeItem(LS_CONFIG_NAME_KEY);
      window.location.reload();
    };

    /**
     * Set active tab when the tab get clicked
     * @param e
     */
    const setActiveTab = (e: Event) => {
      const target = e.target as HTMLInputElement;

      tabIndex.value = target.getAttribute("data-tab-index") as string;
      // keep active tab
      localStorage.setItem(LS_BUILDER_TAB_NAME, tabIndex.value);
    };

    const onThemeModeChange = (e: Event) => {
      const target = e.target as HTMLInputElement;

      configStore.setLayoutConfigProperty("general.mode", target.value);

      themeStore.setThemeMode(target.value as "light" | "dark" | "system");

      // save new config to localStorage
      localStorage.setItem(LS_CONFIG_NAME_KEY, JSON.stringify(config.value));
    };

    /**
     * Submit form
     * @param event
     */
    const submit = (event: Event) => {
      event.preventDefault();

      configStore.setLayoutConfigProperty("general.layout", layoutType);

      // save new config to localStorage
      localStorage.setItem(LS_CONFIG_NAME_KEY, JSON.stringify(config.value));
      window.location.reload();
    };

    return {
      tabIndex,
      config,
      reset,
      setActiveTab,
      submit,
      themeMode,
      themeName,
      layout,
      layoutType,
      onThemeModeChange,
      getAssetPath,
    };
  },
});
</script>

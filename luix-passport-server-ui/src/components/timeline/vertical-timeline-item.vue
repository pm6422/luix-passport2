<template>
  <div class="timeline-item">
    <!--begin::Timeline line-->
    <div class="timeline-line w-40px"></div>
    <!--end::Timeline line-->
    <!--begin::Timeline icon-->
    <div class="timeline-icon symbol symbol-circle symbol-40px me-4">
      <div class="symbol-label bg-light pulse pulse-danger">
        <KTIcon :icon-name="iconName" :icon-class="iconClass"/>
        <span class="pulse-ring" v-if="activity.type === 'Alert'"></span>
      </div>
      <!-- <span class="symbol-badge badge badge-circle bg-danger start-0 fs-9">1</span> -->
    </div>
    <!--end::Timeline icon-->
    <!--begin::Timeline content-->
    <div class="timeline-content mb-10 mt-n1">
      <!--begin::Timeline heading-->
      <div class="pe-3 mb-5">
        <!--begin::Title-->
        <div class="d-flex flex-stack fs-4 py-2">
          <div
            class="fw-bold rotate collapsible collapsed"
            role="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#item-${index}`"
          >
            <span class="me-2 rotate-180">
              <KTIcon icon-name="down" icon-class="fs-3" />
            </span>
            <span>{{ activity.name }}</span>
          </div>
        </div>
        <!--end::Title-->
        <!--begin::Description-->
        <div class="text-gray-700 fs-8">
          <span>{{ activity.desc }}</span>
        </div>
        <!--end::Description-->
        <!--begin::Details-->
        <div class="d-flex flex-stack align-items-center mt-1 fs-6">
          <div class="d-flex">
            <div class="badge me-2" :class="{'badge-light-primary': 'Alert' !== activity.type, 'badge-light-danger': 'Alert' === activity.type }">{{ activity.type }}</div>
            <div class="text-muted me-2 fs-7">{{ activity.time }}</div>
            <KTIcon icon-name="geolocation" icon-class="fs-2 text-primary cursor-pointer" />
            <div class="cursor-pointer text-muted ms-2 fs-7">{{ activity.location }}</div>
          </div>
          <!--begin::Action-->
          <div class="d-flex">
            <button 
              type="button" 
              class="btn btn-sm btn-light btn-active-light-primary"
              data-kt-menu-trigger="click" 
              data-kt-menu-placement="bottom-end"
            >
              {{$t("form.alert-list.view-full-signals")}}
            </button>
            <!--begin::Menu-->
            <div 
              class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold p-0 scroll w-600px" 
              data-kt-menu="true">
              <QuickSearchSignalVal :activityId="activity.id"/>
            </div>
            <!--end::Menu-->
          </div>
          <!--end::Action-->
        </div>
        <!--end::Details-->
      </div>
      <!--end::Timeline heading-->
      <!--begin::Timeline details-->
      <div :id="`item-${index}`" class="collapse overflow-auto">
        <!--begin::Record-->
        <div 
          class="bg-light-primary rounded px-5 py-5 mb-0 fs-7"
          :class="{'bg-light-primary': 'Alert' !== activity.type, 'bg-light-danger': 'Alert' === activity.type }"
        >
          <div class="row">
            <VerticalTimelineItemParameter
              v-for="(parameter, i) in activity.parameters"
              :activityParameter="parameter"
            />
          </div>
        </div>
        <!--end::Record-->

        <div v-if="'Alert' === activity.type" class="notice d-flex bg-light-warning rounded border-warning border border-dashed p-3 mt-5">
          <KTIcon
            icon-name="information-5"
            icon-class="fs-1 text-warning d-flex align-items-center me-4"
          />
          <!--begin::Wrapper-->
          <div class="d-flex flex-stack flex-grow-1">
            <!--begin::Content-->
            <div class="fw-semobold">
              <div class="fs-8 text-warning">
                {{ activity.error }}
              </div>
            </div>
            <!--end::Content-->
          </div>
          <!--end::Wrapper-->
        </div>
      </div>
      <!--end::Timeline details-->

    </div>
    <!--end::Timeline content-->
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import { getAssetPath } from "@/helpers/assets";
import type { IActivity } from '@/domain/Activity';
import VerticalTimelineItemParameter from "@/components/timeline/vertical-timeline-item-parameter.vue";
import QuickSearchSignalVal from "@/components/quick-search/quick-search-signal-val.vue";

export default defineComponent({
  name: "vertical-timeline-item",
  components: {
    VerticalTimelineItemParameter,
    QuickSearchSignalVal
  },
  props: {
    activity: { type: Object as () => IActivity, required: true },
    index: { type: Number, required: true }
  },
  setup(props) {
    const iconName = 'Event' === props.activity.type ? 'abstract-21' : 'notification-bing';
    const iconClass = 'Event' === props.activity.type ? 'fs-2 text-primary' : 'fs-2 text-danger';

    return {
		  getAssetPath,
      iconName,
      iconClass
		};
  },
});
</script>

<template>
  <div class="row"> 
    <div class="d-flex align-items-center">
      <span><img alt="Logo" :src="getAssetPath('media/vehicle/sportive-car.png')" class="w-50px mt-0"/></span>
      <span class="card-label fw-bold text-gray-800 ms-3 fs-4">{{$t('form.alert-list.activity-timeline')}}</span>
    </div>
  </div>
  <!--begin::activity timeline-->
  <div class="row mt-5">
    <!--begin::Timeline-->
    <div class="timeline">
      <VerticalTimelineItem
        v-for="(activity, i) in activities"
        :activity="activity"
        :index="i"
      />
    </div>
    <!--end::Timeline-->
  </div>
  <!--end::activity timeline-->
</template>

<script lang="ts">

import { defineComponent } from "vue";
import { getAssetPath } from "@/helpers/assets"
import type { IActivity } from '@/domain/Activity';
import VerticalTimelineItem from "@/components/timeline/vertical-timeline-item.vue";

export default defineComponent({
  name: "vertical-timeline",
  components: {
    VerticalTimelineItem,
  },
  props: {
    activities: { type: Array as () => Array<IActivity>, required: true },
  },
  setup() {
    return {
		  getAssetPath,
		};
  },
});
</script>

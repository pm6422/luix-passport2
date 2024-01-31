<template>
  <div class="card">
    <!--begin::Header-->
    <div class="card-header border-1 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-2 mb-1">{{$t('form.health.health-checks')}}</span>
      </h3>
      <div
        class="card-toolbar gap-3"
      >
        <button class="btn btn-light-success px-5" @click="refresh()">
          <KTIcon icon-name="arrows-circle" icon-class="fs-3 me-2" />
          <span v-text="$t('form.global.refresh')"></span>
        </button>
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive h-300px">
        <!--begin::Table-->
        <table class="table table-striped table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bold text-uppercase">
              <th class="min-w-200px">Service name</th>
              <th class="min-w-100px">Status</th>
              <th class="min-w-80px text-end">Details</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(row, index) in healthList" :key="index">
              <tr>
                <td>
                  <span class="fs-5 text-gray-800">
                    {{ row.name }}
                  </span>
                </td>
                <td>
                    <span class="badge w-100px d-flex justify-content-center" :class="{
                      'badge-light-danger': row.status === 'DOWN',
                      'badge-light-warning': row.status === 'UNKNOWN',
                      'badge-light-success': row.status === 'UP'
                    }">
                    {{ row.status }}
                    </span>
                </td>
                <td class="text-end" v-if="row.details || row.error">
                  <button 
                    type="button" 
                    class="btn btn-sm btn-icon btn-light-primary me-2"
                    data-bs-toggle="tooltip" 
                    :title="$t('form.global.details')"
                    @click="showDetails(row)"
                  >
                    <KTIcon icon-name="eye" icon-class="fs-3"/>
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table container-->

      <!--begin::Row-->
      <div class="row">
        <CodeHighlighter :obj=modalData lang="json"/>
      </div>
      <!--end::Row-->
    </div>
    <!--begin::Body-->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ManagementService } from '@/services/services';
import CodeHighlighter from "@/components/highlighters/CodeHighlighter.vue";

export default defineComponent({
  name: "health-list",
  components: {
    CodeHighlighter
  },
  setup() {
    const healthList = ref([]);
    const modalData = ref({});

    const refresh = () => {
      ManagementService.getHealth()
        .then(res => {
          healthList.value = transformHealthData(res.data);
        })
        .catch(error => {
          if (error.response.status === 503) {
            healthList.value = transformHealthData(error.response.data);
          }
        });
    };
    const showDetails = (data: any) => {
      modalData.value = data.details;
    };
    const transformHealthData = (data: any): any => {
      const response = [];
      flattenHealthData(response, null, data.components);
      return response;
    };
    const flattenHealthData = (result: any, path: any, data: any): any => {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const value = data[key];
          if (isHealthObject(value)) {
            if (hasSubSystem(value)) {
              addHealthObject(result, false, value, getModuleName(path, key));
              flattenHealthData(result, getModuleName(path, key), value);
            } else {
              addHealthObject(result, true, value, getModuleName(path, key));
            }
          }
        }
      }
      return result;
    };
    const isHealthObject = (healthObject: any): any => {
      let result = false;

      for (const key in healthObject) {
        if (Object.prototype.hasOwnProperty.call(healthObject, key)) {
          if (key === 'status') {
            result = true;
          }
        }
      }
      return result;
    };
    const hasSubSystem = (healthObject: any): any => {
      let result = false;

      for (const key in healthObject) {
        if (Object.prototype.hasOwnProperty.call(healthObject, key)) {
          const value = healthObject[key];
          if (value && value.status) {
            result = true;
          }
        }
      }
      return result;
    };
    const getModuleName = (path: any, name: string) => {
      if (path && name) {
        return path + "." + name;
      } else if (path) {
        return path;
      } else if (name) {
        return name;
      } else {
        return '';
      }
    };
    const addHealthObject = (result: any, isLeaf: boolean, healthObject: any, name: string) => {
      const healthData = {
        name,
        details: undefined,
        error: undefined,
      };

      const details = {};
      let hasDetails = false;

      for (const key in healthObject) {
        if (Object.prototype.hasOwnProperty.call(healthObject, key)) {
          const value = healthObject[key];
          if (key === 'status' || key === 'error') {
            healthData[key] = value;
          } else {
            if (!isHealthObject(value)) {
              details[key] = value;
              hasDetails = true;
            }
          }
        }
      }

      // Add the details
      if (hasDetails) {
        healthData.details = details;
      }

      // Only add nodes if they provide additional information
      if (isLeaf || hasDetails || healthData.error) {
        result.push(healthData);
      }
      return healthData;
    }

    refresh();

    return {
      healthList,
      refresh,
      modalData,
      showDetails
    };
  },
});
</script>

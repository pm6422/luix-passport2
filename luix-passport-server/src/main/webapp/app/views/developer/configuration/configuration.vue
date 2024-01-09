<template>
  <div class="card">
    <!--begin::Header-->
    <div class="card-header border-1 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-2 mb-1">Spring Configuration</span>
      </h3>
      <div class="card-toolbar gap-3">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon
            icon-name="magnifier"
            icon-class="fs-1 position-absolute ms-6"
          />
          <input
            type="text"
            class="form-control form-control-solid w-250px ps-15"
            v-model="searchKeyword"
            placeholder="Filter by keyword"
            @input="search()"
          />
        </div>
        <!--end::Search-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table class="table table-striped table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bold text-uppercase">
              <th class="min-w-100px">Prefix</th>
              <th class="min-w-200px">Properties</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(row, index) in configurations" :key="index">
              <tr>
                <td>
                  <span class="fs-5 text-gray-800">
                    {{ row.prefix }}
                  </span>
                </td>
                <td>
                  <div class="row" v-for="key in keys(row.properties)" :key="key">
                    <div class="col-lg-4">
                        {{ key }}
                    </div>
                    <div class="col-lg-8">
                      <div class="d-flex justify-content-end">
                        <span class="badge-secondary break">{{ row.properties[key] }}</span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table container-->

    </div>
    <!--begin::Body-->
  </div>

  <div v-for="key in keys(envs)" :key="key">
    <div class="card mt-3">
      <!--begin::Header-->
      <div class="card-header border-0 pt-5">
        <h4 class="card-title align-items-start flex-column">
          <span class="card-label fw-bold fs-2 mb-1">{{ key }}</span>
        </h4>
        <div
          class="card-toolbar gap-3"
        >
        
        </div>
      </div>
      <!--end::Header-->

      <!--begin::Body-->
      <div class="card-body py-3">
        <table class="table table-striped table-row-dashed table-row-gray-300 align-middle gs-0 gy-4" aria-describedby="Properties">
          <thead>
            <tr>
              <th class="w-40" scope="col">Property</th>
              <th class="w-60" scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of envs[key]" :key="item.key">
              <td class="">{{ item.key }}</td>
              <td class="">
                <div class="d-flex justify-content-end">
                  <span class="badge-secondary">{{ item.val }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    <!--begin::Body-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ManagementService } from '@/services/services';
import { TableHelper } from "@/helpers/TableHelper";

export default defineComponent({
  name: "configuration",
  components: {
  },
  setup() {
    const configurations = ref<any>([]);
    const initConfigurations = ref<any>([]);
    const envs = ref([]);
    const searchKeyword = ref("");

    const refresh = () => {
      ManagementService.getConfiguration()
      .then(res => {
        const properties = [];
        const propertiesObject = getConfigPropertiesObjects(res.data);
        for (const key in propertiesObject) {
          if (Object.prototype.hasOwnProperty.call(propertiesObject, key)) {
            properties.push(propertiesObject[key]);
          }
        }

        properties.sort((propertyA, propertyB) => {
          const comparePrefix = propertyA.prefix < propertyB.prefix ? -1 : 1;
          return propertyA.prefix === propertyB.prefix ? 0 : comparePrefix;
        });

        configurations.value = properties;
        initConfigurations.value = properties;
      })
      .catch(error => {

      });

      ManagementService.getEnv()
      .then(res => {
        const properties = {};
        const propertySources = res.data['propertySources'];

        for (const propertyObject of propertySources) {
          const name = propertyObject['name'];
          const detailProperties = propertyObject['properties'];
          const vals = [];
          for (const keyDetail in detailProperties) {
            if (Object.prototype.hasOwnProperty.call(detailProperties, keyDetail)) {
              vals.push({ key: keyDetail, val: detailProperties[keyDetail]['value'] });
            }
          }
          properties[name] = vals;
        }

        envs.value = properties;
      })
      .catch(error => {

      });

    };
    const getConfigPropertiesObjects = (res: any) => {
      if (res['contexts'] !== undefined) {
            for (const key in res['contexts']) {
              // If the key is not bootstrap, it will be the ApplicationContext Id
              // For default app, it is baseName
              // For microservice, it is baseName-1
              if (!key.startsWith('bootstrap')) {
                return res['contexts'][key]['beans'];
              }
            }
          }
          // by default, use the default ApplicationContext Id
          return res['contexts']['tsap-backend']['beans'];
    };
    const keys = (dict: any) => {
      return dict === undefined ? [] : Object.keys(dict);
    };
    const search = () => {
      if (searchKeyword.value !== "") {
        configurations.value = TableHelper.filter(initConfigurations.value, searchKeyword.value);
      } else {
        configurations.value = initConfigurations.value;
      }
    }

    refresh();

    return {
      configurations,
      envs,
      keys,
      searchKeyword,
      search
    };
  },
});
</script>

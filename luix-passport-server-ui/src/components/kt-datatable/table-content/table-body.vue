<template>
  <tbody class="fw-semibold text-gray-700">
    <template v-for="(row, i) in data" :key="i">
      <tr class="-intro-x">
        <td v-if="checkboxEnabled">
          <div
            class="form-check form-check-sm form-check-custom form-check-solid"
          >
            <input
              class="form-check-input ms-2"
              type="checkbox"
              :value="row[checkboxColLabel]"
              v-model="alreadySelectedItems"
              @change="selectItem"
            />
          </div>
        </td>
        <template v-for="(properties, j) in header" :key="j">
          <td :class="{ 'text-end': j === header.length - 1 }">
            <slot :name="`${properties.columnLabel}`" :row="row">
              {{ row }}
            </slot>
          </td>
        </template>
      </tr>
    </template>
  </tbody>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import type { Column } from "@/components/kt-datatable/domain/Column";

export default defineComponent({
  name: "table-body",
  components: {},
  props: {
    header: { type: Array as () => Array<Column>, required: true },
    data: { type: Array as () => Array<any>, required: true },
    checkboxEnabled: { type: Boolean, required: false, default: false },
    checkboxColLabel: { type: String as () => string, required: false, default: "id" },
    selectedItems: { type: Array, required: false, default: () => [] },
  },
  emits: ["onItemSelect"],
  setup(props, { emit }) {
    const alreadySelectedItems = ref<Array<any>>([]);

    watch(
      () => [...props.selectedItems],
      (currentValue) => {
        if (props.selectedItems.length !== 0) {
          alreadySelectedItems.value = [
            ...new Set([...alreadySelectedItems.value, ...currentValue]),
          ];
        } else {
          alreadySelectedItems.value = [];
        }
      }
    );

    const selectItem = () => {
      emit("onItemSelect", alreadySelectedItems.value);
    };

    return {
      alreadySelectedItems,
      selectItem,
    };
  },
});
</script>

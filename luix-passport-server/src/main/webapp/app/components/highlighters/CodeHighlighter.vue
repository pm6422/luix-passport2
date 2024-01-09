<template>
  <div class="py-5">
    <div class="highlight">
      <button
        type="button"
        class="highlight-copy btn"
        data-bs-toggle="tooltip"
        title="Copy code"
        data-bs-original-title="Copy code"
      >
        copy
      </button>
      <div class="highlight-code">
        <pre
          :class="`language-${lang}`"
          :style="{ height: getHeightInPixesls }"
        >
          <code>
            {{ obj }}
          </code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useCopyClipboard } from "@/helpers/documentation";
import Prism from "prismjs";

export default defineComponent({
  name: "CodeHighlighter",
  props: {
    obj: Object,
    lang: String,
    fieldHeight: Number,
  },
  updated: function() {
    Prism.highlightAll();
  },
  setup(props) {
    const height = ref(props.fieldHeight);

    const { init } = useCopyClipboard();

    const getHeightInPixesls = computed(() => {
      return height.value + "px";
    });

    onMounted(() => {
      Prism.highlightAll();
      init();
    });

    return {
      getHeightInPixesls,
    };
  },
  components: {},
});
</script>

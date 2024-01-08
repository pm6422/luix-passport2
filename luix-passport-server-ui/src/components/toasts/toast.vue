<template>
  <!--begin::Button-->
  <button 
    id="toastTriggerBtn" 
    type="button" 
    class="btn btn-sm"
    hidden
  >
    Toggle Toast
  </button>
  <!--end::Button-->

   <!--begin::Toast-->
   <div ref="toastContanierRef" class="toast-container position-fixed top-0 end-50 p-3 z-index-4">
    <div ref="toastStackRef" data-kt-docs-toast="stack" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <KTIcon :icon-name="props.icon" :icon-class="`fs-3x me-3 ${props.style}`"/>
        <strong class="me-auto">{{ props.title }}</strong>
        <small>{{ props.time }}</small>
        <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="toast" aria-label="Close">
          <KTIcon icon-name="cross" icon-class="fs-1" />
        </div>
      </div>
      <div class="toast-body text-gray-900 fs-7 ms-2">
        {{ props.message }}
      </div>
    </div>
  </div>
  <!--end::Toast-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { Toast } from "bootstrap";

export default defineComponent({
  name: "toast",
  components: {
  },
  props: {
    icon: { type: String, required: true },
    style: { type: String, required: true },
    title: { type: String, required: false },
    message: { type: String, required: true },
    time: { type: String, required: false },
  },
  setup(props) {
    const toastContanierRef = ref<null | HTMLElement>(null);
    const toastStackRef = ref<null | HTMLElement>(null);
      

    onMounted(() => {
      // Select elements
      const button = document.getElementById('toastTriggerBtn');

      // Remove base element markup
      if(toastContanierRef.value && toastStackRef.value && button) {
        toastContanierRef.value.removeChild(toastStackRef.value);

        // Handle button click
        button.addEventListener('click', e => {
          e.preventDefault();
          if(!toastStackRef.value || !toastContanierRef.value) {
            return;
          }
          // Create new toast element
          const newToast = toastStackRef.value.cloneNode(true);

          if(newToast) {
            toastContanierRef.value.append(newToast);
            if(newToast) {
              // Create new toast instance --- more info: https://getbootstrap.com/docs/5.1/components/toasts/#getorcreateinstance
              const toast = Toast.getOrCreateInstance(newToast as HTMLElement);
              // Toggle toast to show --- more info: https://getbootstrap.com/docs/5.1/components/toasts/#show
              toast.show();
            }
          }
        });
      }
    });
    
    return {
      toastContanierRef,
      toastStackRef,
      props
    };
  },
});
</script>
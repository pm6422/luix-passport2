<template>
  <!--begin::Modal - Upload File-->
  <div ref="modalRef" class="modal fade" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="true">
  <!--begin::Modal dialog-->
  <div class="modal-dialog modal-dialog-centered mw-650px">
    <!--begin::Modal content-->
    <div class="modal-content">
      <!--begin::Form-->
      <form class="form" action="none">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">{{ $t('form.global.upload-file') }}</h2>
          <!--end::Modal title-->
          <!--begin::Close-->
          <div class="btn btn-icon btn-sm btn-active-icon-primary" data-bs-dismiss="modal">
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Modal body-->
        <div class="modal-body pt-10 pb-15 px-lg-17">
          <!--begin::Input group-->
          <div class="form-group">
            <!--begin::Dropzone-->
            <div id="upload_dropzone" class="dropzone dropzone-queue mb-2">
              <!--begin::Controls-->
              <div class="dropzone-panel mb-4">
                <div class="d-flex flex-stack">
                  <div>
                    <a class="dropzone-select btn btn-sm btn-light-success me-2">{{ $t('form.global.attach-files') }}</a>
                    <a class="dropzone-upload btn btn-sm btn-light-primary me-2">{{ $t('form.global.upload-all') }}</a>
                    <a class="dropzone-remove-all btn btn-sm btn-light-danger">{{ $t('form.global.remove-all') }}</a>
                  </div>
                  <div>
                    <a v-if="downloadUrl" class="btn btn-sm btn-icon btn-bg-light btn-light-info" 
                      @click="download()" 
                      data-bs-toggle="tooltip" 
                      :title="$t('form.data-dict-list.download-template')"
                    >
                      <KTIcon icon-name="file-down" icon-class="fs-3"/>
                    </a>
                  </div>
                </div>
              </div>
              <!--end::Controls-->
              <!--begin::Items-->
              <div class="dropzone-items wm-200px">
                <div class="dropzone-item p-5" style="display:none">
                  <!--begin::File-->
                  <div class="dropzone-file">
                    <div class="dropzone-filename text-dark" title="some_image_file_name.jpg">
                      <span data-dz-name="">some_image_file_name.jpg</span>
                      <strong>(<span data-dz-size="">340kb</span>)</strong>
                    </div>
                    <div class="dropzone-error mt-0" data-dz-errormessage=""></div>
                  </div>
                  <!--end::File-->
                  <!--begin::Progress-->
                  <div class="dropzone-progress">
                    <div class="progress bg-gray-300">
                      <div class="progress-bar bg-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" data-dz-uploadprogress=""></div>
                    </div>
                  </div>
                  <!--end::Progress-->
                  <!--begin::Toolbar-->
                  <div class="dropzone-toolbar">                  
                    <span class="dropzone-cancel" data-dz-remove="" style="display: none;">
                      <KTIcon icon-name="cross" icon-class="fs-1" />
                    </span>
                    <span class="dropzone-delete" data-dz-remove="">
                      <KTIcon icon-name="cross" icon-class="fs-1" />
                    </span>
                  </div>
                  <!--end::Toolbar-->
                </div>
              </div>
              <!--end::Items-->
            </div>
            <!--end::Dropzone-->
            <!--begin::Hint-->
            <span class="form-text fs-6 text-muted">{{ $t('form.global.max-file-size') }}: {{ maxFileSize }}MB</span>
            <!--end::Hint-->
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Modal body-->
      </form>
      <!--end::Form-->
    </div>
  </div>
</div>
<!--end::Modal - Upload File-->
</template>
  
  <script lang="ts">
  import { ref, defineComponent, onMounted } from "vue";
  import Dropzone from "dropzone";
  import Swal from "sweetalert2/dist/sweetalert2.js";
  import { useI18n } from "vue-i18n";
  import { ElMessage } from 'element-plus';
  import { isString, endsWith, findIndex } from "lodash";
  
  export default defineComponent({
    name: "upload-modal",
    components: {
    },
    props: {
      uploadUrl: { type: String, required: true },
      downloadUrl: { type: String, required: false },
      maxFileSize: { type: Number, required: true },
      acceptFiles: { type: Array, required: false},
      afterUploadCallback: { type: Function, required: false }
    },
    setup(props) {
      const modalRef = ref<null | HTMLElement>(null);
      const i18n = useI18n();

      // Init dropzone
      const initDropzone = () => {
          // set the dropzone container id
          const id = "#upload_dropzone";
          const dropzone = document.querySelector(id);

          if(dropzone === null) return;

          // set the preview element template
          var previewNode = dropzone.querySelector(".dropzone-item");
          previewNode.id = "";
          var previewTemplate = previewNode.parentNode.innerHTML;
          previewNode.parentNode.removeChild(previewNode);

          var myDropzone = new Dropzone(id, { // Make the whole body a dropzone
            url: props.uploadUrl, // Set the url for your upload script location
            // paramName: "file", // The name that will be used to transfer the file
            parallelUploads: 5,
            previewTemplate: previewTemplate,
            maxFiles: 5,
            maxFilesize: props.maxFileSize, // Max file size in MB
            autoQueue: false, // Make sure the files aren't queued until manually added
            previewsContainer: id + " .dropzone-items", // Define the container to display the previews
            clickable: id + " .dropzone-select" // Define the element that should be used as click trigger to select files.
          });

          myDropzone.on("addedfile", function (file) {
            if(props.acceptFiles) {
              const index = findIndex(props.acceptFiles, function(n) { return endsWith(file.name, n); });
              if(index == -1) {
                dropzone.querySelector('.dropzone-error').outerHTML = "<span class='text-danger'>Supported file extensions: " + props.acceptFiles + "</span>";
                file.previewElement.querySelector(id + " .dropzone-progress").style.display = "none";
                
                setTimeout(function () {
                  dropzone.querySelector('.dropzone-upload').style.display = "none";
                }, 50);
              }
            }

            const dropzoneItems = dropzone.querySelectorAll('.dropzone-item');
            dropzoneItems.forEach(dropzoneItem => {
                dropzoneItem.style.display = '';
            });
            dropzone.querySelector('.dropzone-upload').style.display = "inline-block";
            dropzone.querySelector('.dropzone-remove-all').style.display = "inline-block";
        });


        // Hide the total progress bar when nothing's uploading anymore
        myDropzone.on("complete", function (file) {
            const progressBars = dropzone.querySelectorAll('.dz-complete');
            setTimeout(function () {
              progressBars.forEach(progressBar => {
                progressBar.querySelector('.progress-bar').style.opacity = "0";
                progressBar.querySelector('.progress').style.opacity = "0";
              });

              Swal.fire({
                text: i18n.t("msg.global.upload-successfully"),
                icon: "success",
                showConfirmButton: false,
                timer: 1000,
                heightAuto: false,
              }).then(() => {
                if(props.afterUploadCallback) {
                  props.afterUploadCallback();
                }
              });
            }, 300);
        });

        // Setup the buttons for all transfers
        dropzone.querySelector(".dropzone-upload").addEventListener('click', function () {
          myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED)); // default dropzone process

          // Process simulation for demo only
          myDropzone.files.forEach(file => {
            const progressBar = file.previewElement.querySelector('.progress-bar');
            progressBar.style.opacity = "1";
            var width = 1;
            var timer = setInterval(function () {
              if (width >= 100) {
                // myDropzone.emit("success", file);
                // myDropzone.emit("complete", file);
                clearInterval(timer);
              } else {
                width++;
                progressBar.style.width = width + '%';
              }
            }, 20);
          });
        });

        // Setup the button for remove all files
        dropzone.querySelector(".dropzone-remove-all").addEventListener('click', function () {
            Swal.fire({
              text: i18n.t("msg.global.del-all-files-confirm"),
              // icon: "warning",
              showCancelButton: true,
              buttonsStyling: false,
              reverseButtons: true,
              confirmButtonText: i18n.t("form.global.remove"),
              cancelButtonText: i18n.t("form.global.discard"),
              customClass: {
                confirmButton: "btn btn-sm btn-light-danger",
                cancelButton: "btn btn-sm btn-light-dark"
              }
            }).then(function (result) {
              if (result.value) {
                  dropzone.querySelector('.dropzone-upload').style.display = "none";
                  dropzone.querySelector('.dropzone-remove-all').style.display = "none";
                  myDropzone.removeAllFiles(true);
              } else if (result.dismiss === 'cancel') {
              }
            });
        });

        // On all files completed upload
        myDropzone.on("queuecomplete", function (progress) {
          const uploadIcons = dropzone.querySelectorAll('.dropzone-upload');
          uploadIcons.forEach(uploadIcon => {
            uploadIcon.style.display = "none";
          });
        });

        // On all files removed
        myDropzone.on("removedfile", function (file) {
            if (myDropzone.files.length < 1) {
              dropzone.querySelector('.dropzone-upload').style.display = "none";
              dropzone.querySelector('.dropzone-remove-all').style.display = "none";
            }
        });

        myDropzone.on("error", function(file, response) {
          if(!isString(response)) {
          // ElMessage.error({message: response.message, showClose: true, duration: 6000});
            dropzone.querySelector('.dropzone-error').outerHTML = "<span class='text-danger'>" + response.message + "</span>";
          }
        });
      }
  
      onMounted(() => {
        initDropzone();
      });

      const download = () => {
        if(!props.downloadUrl) {
          return;
        }
        // axios.get(props.downloadUrl, { responseType: 'blob' })
        // .then(response => {
        //   const url = window.URL.createObjectURL(new Blob([response.data]));
        //   const link = document.createElement('a');
        //   link.href = url;
        //   link.setAttribute('download', "template.json");
        //   document.body.appendChild(link);
        //   link.click();
        // })
        // .catch(error => {
        //   ElMessage.error({message: error.response.data.message, showClose: true, duration: 6000});
        // });
        window.open(props.downloadUrl);
      };

      return {
        download
      };
    },
  });
  </script>
  
<template>
  <div class="ribbon" v-if="appInfoStore.ribbonProfile">
    <a href="">{{ appInfoStore.ribbonProfile }}</a>
  </div>
</template>

<script setup lang="ts">
import { useAppInfoStore } from "@/stores/app-info-store";

const appInfoStore = useAppInfoStore();

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ribbon {
  background-color: #fc5c5c;
  left: -5em;
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);

  position: absolute;
  top: 15px;
  white-space: nowrap;
  width: 15em;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.8;
}

.ribbon a {
  /*border: 0.5px solid #faa;*/
  color: #fff;
  display: block;
  font-weight: 600;
  margin: 1px 0;
  padding: 2px 50px;
  text-align: center;
  text-decoration: none;
  text-shadow: 0 0 5px #444;
  pointer-events: none;
}
</style>

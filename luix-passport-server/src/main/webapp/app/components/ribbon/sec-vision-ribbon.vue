<template>
  <div class="ribbon d-none d-lg-block">
    <a>Sec Vision Pro ®</a>
  </div>
</template>

<script setup lang="ts">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ribbon {
  background-color: #ca2929;
  right: -5em;
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);

  position: fixed;
  bottom: 30px;
  white-space: nowrap;
  width: 20em;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.8;
}

.ribbon a {
  /*border: 0.5px solid #faa;*/
  color: #fff;
  display: block;
  font-size: large;
  font-weight: 600;
  margin: 15px 0;
  padding: 2px 50px;
  text-align: center;
  text-decoration: none;
  text-shadow: 0 0 5px #444;
  pointer-events: none;
}
</style>

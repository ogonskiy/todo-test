<template>
  <div id="app">
    <h2 class="top-title">
      TODO notes
    </h2>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}

.top-title {
  margin: 0;
  padding: 20px;
  background-color: #666;
  color: #fff;
}
</style>

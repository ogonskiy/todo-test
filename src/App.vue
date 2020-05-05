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
  font-family: monospace;
}

button {
  font-family: monospace;
  text-transform: uppercase;
  background-color: #fff;
  border: 3px solid #ada;
  cursor: pointer;

  &:focus,
  &:active {
    outline: none;
  }
}

.top-title {
  margin: 0;
  padding: 20px;
  background-color: #666;
  color: #fff;
}

input[type="text"] {
  color: #333;
  border: 1px solid #ddd;
  padding: 5px;
  font-size: 13px;
  font-family: monospace;

  &:focus,
  &:active {
    outline: none;
  }
}
</style>

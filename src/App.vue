<template>
  <div id="app">
    <nav style="padding: 10px; background: #eee;">
      <router-link to="/">首頁</router-link>
      <router-link to="/products" style="margin-left: 10px;">商品列表</router-link>
      <router-link to="/cart" style="margin-left: 10px;">購物車</router-link>
      <router-link to="/checkout" style="margin-left: 10px;">結帳</router-link>
      <router-link to="/admin" style="margin-left: 10px;">後臺首頁</router-link>

    </nav>

    <router-view />
  </div>
</template>

<script setup>

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

nav a {
  text-decoration: none;
  color: #333;
}

nav a.router-link-active {
  font-weight: bold;
}
</style>

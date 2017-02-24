<template>
  <div id="container">
  	<div>首页</div>
    <router-link to="/list">to list</router-link>
    <router-link to="/hotelsearch" tag="div">酒店搜索</router-link>
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>

<style>
@import url('./css/reset.css');
@import url('./css/common.css');
@import url('./css/lib/iconfont/iconfont.css');

body {
	font-size: .28rem;
}
</style>

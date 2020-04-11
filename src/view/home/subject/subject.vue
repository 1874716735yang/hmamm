<template>
  <div>学科列表</div>
</template>

<script>
export default {
  created() {
    window.console.log("用户",this.$route);
    document.title = this.$route.meta.teta
  },
  
}
</script>

<style>

</style>
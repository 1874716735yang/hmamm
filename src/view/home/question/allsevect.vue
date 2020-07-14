<template>
  <div class="allbox">
    <div v-if="form.type==1">
      <div class="item" v-for="(item, index) in form.select_options" :key="index">
        <el-radio
        @change="selectchange"
          class="radioItem"
          v-model="form.single_select_answer"
          :label="item.label"
        >{{item.label}}</el-radio>
        <el-input v-model="item.text"></el-input>
        <div>
          <userquestion v-model="item.image"></userquestion>
        </div>
      </div>
    </div>
    <div v-else-if="form.type==2">
      <div class="item" v-for="(item, index) in form.select_options" :key="index">
        <el-checkbox
        @change="selectchange"
          class="radioItem"
          v-model="form.multiple_select_answer"
          :label="item.label"
        >{{item.label}}</el-checkbox>
        <el-input v-model="item.text"></el-input>
        <div>
          <userquestion v-model="item.image"></userquestion>
        </div>
      </div>
    </div>
    <div v-else>
      <el-input type="textarea" rows="6" v-model="form.short_answer"
      @change="selectchange"></el-input>
    </div>
  </div>
</template>

<script>
import userquestion from "./userquesetion";
export default {
  components: {
    userquestion
  },
  props: ["form"],
  methods: {
    selectchange(){
      this.$emit("change")
    }
  },
};
</script>

<style lang="less">
.allbox {
  padding-top: 40px;
  padding-left: 60px;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
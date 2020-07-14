<template>
  <div class="chart">
    <el-card>
      <ul class="list">
        <li class="item">
          <div class="itemContent color1">0</div>
          <p>今日新增用户</p>
        </li>
        <li class="item">
          <div class="itemContent color1">7</div>
          <p>总用户量</p>
        </li>
        <li class="item">
          <div class="itemContent color2">0</div>
          <p>新增试题</p>
        </li>
        <li class="item">
          <div class="itemContent color2">0</div>
          <p>总试题量</p>
        </li>
        <li class="item">
          <div class="itemContent color3">0</div>
          <p>总刷题量</p>
        </li>
        <li class="item">
          <div class="itemContent color3">0</div>
          <p>人均刷题量</p>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.chart{
  .list{
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;

    .color1{
      border: 3px solid #0086fa;
      color: #0086fa;
    }
    .color2{
      border: 3px solid #f76137;
      color: #f76137;
    }
    .color3{
      border: 3px solid #55cd75;
      color: #55cd75;
    }
    .itemContent{
      border-radius: 50%;
      width: 99px;
      height: 99px;
      line-height: 99px;
    }
  }
}

</style>
<template>
  <div class="modal-body" v-show="show">
    <div class="modal">
      <div class="title">{{title}}</div>
      <div class="content">
        {{content}}
        <slot />
      </div>
      <div class="btn-body">
        <div class="btn" @click="clickCancel">{{cacelText}}</div>
        <div class="btn success" @click="clickConfirm">{{comfirmText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: {
    show: Boolean,
    content: String,
    title: {
      default: "提示",
      type: String
    },
    cacelText: {
      default: "暂不取消",
      type: String
    },
    comfirmText: {
      default: "取消绑定",
      type: String
    }
  },
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    clickCancel(){
      this.$emit('update:show',false)
      this.$emit('cancel',false)
    },
    clickConfirm(){
      this.$emit('update:show',false)
      this.$emit('confirm')
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.modal-body {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    width: 295px;
    min-height: 148px;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    padding-bottom: 50px;
    position: relative;
    overflow: hidden;
    .title {
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bolder;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
      padding: 20px 0 0;
      text-align: center;
    }
    .content {
      padding: 10px 30px 20px;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 17px;
      text-align: center;
    }
    .btn-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      position: absolute;
      bottom: 0;
      width: 100%;
      background: #f5f5f5;
    }
    .btn {
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 22px;
      flex: 1;
      text-align: center;
      height: 50px;
      line-height: 50px;
      &.success {
        font-size: 17px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bolder;
        color: rgba(42, 212, 188, 1);
        border-left: 1px solid #ffffff;
      }
    }
  }
}
</style>

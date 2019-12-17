<template>
  <div id="app">
    <router-view />
    <msg ref="$msg" />
    <loading ref="$load" />
  </div>
</template>
<script>
import msg from "@/components/msg.vue";
import loading from "@/components/loading.vue";
export default {
  computed: {},
  data() {
    return {};
  },
  methods: {},
  components: { msg, loading },
  mounted() {
    this.$root.toast = this.$refs.$msg;
    this.$root.load = this.$refs.$load;
  }
};
</script>
<style lang="less">
#app {
  font-family: PingFangSC-Medium, "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
}

.van-nav-bar {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
}

.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.van-tabbar-item__icon img {
  width: 26px;
  height: 26px;
}

.van-dialog__confirm,
.van-dialog__confirm:active {
  color: #ffffff;
}

.van-dialog__cancel {
  color: #999;
}
</style>

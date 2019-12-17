<template>
  <div class="hello" v-if="show1">
    <img src="../assets/img/loading.png" alt />
  </div>
</template>

<script>
export default {
  name: "msg1",
  data() {
    return {
      show1: false,
    };
  },
  methods: {
    show(msg, t = 2000) {
      this.show1 = true;
      setTimeout(() => {
        this.show1 = false;
      }, t);
    },
    hide() {
      this.show1 = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
  img {
    animation: roll 1s 0s infinite;
  }
}
@keyframes roll {
  10% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

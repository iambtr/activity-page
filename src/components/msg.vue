<template>
  <div class="hello" v-if="show">
    <span>{{msg}}</span>
  </div>
</template>

<script>
export default {
  name: 'msg1',
  data(){
    return{
      show:false,
      msg:''
    }
  },
  methods:{
    showToast(msg,t=2000){
      this.msg=msg
      this.show= true
      setTimeout(()=>{
        this.show=false
      },t)
    },
    hideToast(){
      this.msg=''
      this.show= false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .hello{
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      color: #fff;
      font-size: 15px;
      background: rgb(41, 41, 41);
      padding: 10px 20px;
      border-radius: 5px;
      max-width: 200px;
      text-align: center;
    }
  }
</style>

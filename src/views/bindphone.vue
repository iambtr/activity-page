<template>
  <div class="bg">
    <div class="content-body">
      <div class="phone-msg">
        <div class="avatar">
          <img :src="avatar" alt="头像" />
        </div>
        <h2>{{nickName}}</h2>
        <div class="filed">
          <input type="number" @blur="scroll0" placeholder="请输入您的手机号码" v-model="mobile" />
        </div>
        <div class="filed">
          <input type="number" @blur="scroll0" placeholder="请输入验证码" v-model="captcha" />
          <div class="count" @click="getMsg">{{seconds}}</div>
        </div>
        <div class="btn" @click="bind">确认绑定</div>
        <!-- <div class="tip" v-if="hasBind">当前该帐号尚未绑定手机号</div>
        <div class="tip" v-else>
          绑定手机号：
          <span class="phone">{{phone|phoneFilter}}</span>
          <span class="cancel" @click="modalShow=true">取消绑定</span>
        </div> -->
      </div>
    </div>
    <modal :show.sync="modalShow" content="取消绑定后将不会再收到推送消息" @confirm="disBindPhone"></modal>
  </div>
</template>

<script>
let timer = null;
// let baseUrl = "https://dev.xianfengsg.com";
// let baseUrl = "";
let baseUrl = "https://newretail2.xianfengsg.com";
export default {
  data() {
    return {
      mobile: "",
      captcha: "",
      hasBind: false,
      seconds: "获取验证码",
      phone: "",
      avatar: "",
      nickName: "",
      openId: "",
      token: "",
      modalShow: false
    };
  },
  filters: {
    phoneFilter(val) {
      return val.replace(/(\d{3})\d{4}(\d{3})/, "$1****$2");
    }
  },
  computed: {},
  methods: {
    getMsg() {
      if (this.seconds !== "获取验证码") {
        return;
      }
      let mobile = this.mobile;
      if (!/^1\d{10}/.test(mobile)) {
        this.$root.toast.showToast("请输入手机号！！");
        return;
      }
      this.$root.load.show();
      fetch(`${baseUrl}/newretail/api/sms/sendSms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ mobile })
      })
        .then(res => res.json())
        .then(res => {
          this.$root.load.hide();
          if (res.code === 0) {
            this.$root.toast.showToast("发送验证码成功");
            let seconds = 60;
            clearInterval(timer);
            timer = setInterval(() => {
              seconds--;
              this.seconds = seconds + "s";
              if (seconds <= 0) {
                clearInterval(timer);
                this.seconds = "获取验证码";
              }
            }, 1000);
          } else {
            this.$root.toast.showToast(res.message);
          }
        })
        .catch(err => {
          this.$root.load.hide();
          this.$root.toast.showToast(err);
        });
    },
    scroll0() {
      // console.log('滚到0000了')
      window.scrollTo(0, 0); //页面滚动到顶部
    },
    bind() {
      if (!this.mobile) {
        this.$root.toast.showToast("请输入手机号");
        return;
      }
      if (!this.captcha) {
        this.$root.toast.showToast("请输入验证码");
        return;
      }
      this.$root.load.show();
      fetch(`${baseUrl}/newretail/api/xfsgPublicAccount/member/bind`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token":this.token
        },
        body: JSON.stringify({
          captcha: this.captcha,
          mobile: this.mobile,
          openId: this.openId
        })
      })
        .then(res => res.json())
        .then(res => {
          this.$root.load.hide();
          if (res.code === 0) {
            this.$root.toast.showToast(res.message);
          } else {
            this.$root.toast.showToast(res.message);
          }
        })
        .catch(err => {
          this.$root.load.hide();
          this.$root.toast.showToast(err);
        })
        .finally(r => {
          this.$root.load.hide();
        });
    },
    disBindPhone(){}
  },
  created() {
    let { openId, token, nickname, headimgurl } = this.$route.query;
    this.avatar = headimgurl;
    this.nickName = nickname;
    this.openId = openId;
    this.token = token;
  },
  mounted() {},
  beforeDestroy() {
    clearInterval(timer);
  }
};
</script>
<style scoped lang='less'>
.bg {
  background: url("https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/activity/bindphonebg.png")
    no-repeat center bottom;
  background-size: cover;
  height: 100vh;
  .content-body {
    position: relative;
    padding-top: 195px;
    padding-bottom: 50px;
    &.couponshow {
      padding-top: 15px;
    }
    .phone-msg {
      position: absolute;
      background: rgba(255, 255, 255, 1);
      left: 30px;
      box-sizing: border-box;
      padding: 25px;
      width: 315px;
      height: 324px;
      background: rgba(255, 255, 255, 0.85);
      box-shadow: 0px 10px 30px 0px rgba(0, 0, 0, 0.15);
      border-radius: 8px;
      top: 103px;
      .avatar {
        width: 85px;
        height: 85px;
        background: rgba(255, 255, 255, 1);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-self: center;
        img {
          width: 65px;
          height: 65px;
          border-radius: 50%;
        }

        position: absolute;
        top: -43px;
        left: 115px;
      }
      h2 {
        text-align: center;
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        line-height: 22px;
        padding-top: 22px;
        padding-bottom: 20px;
        margin: 0;
      }
      .filed {
        width: 265px;
        height: 50px;
        background: #ffffff;
        border-radius: 3px;
        border: 1px solid rgba(241, 241, 241, 1);
        display: flex;
        padding: 0 15px;
        margin-bottom: 15px;
        align-items: center;
        input {
          border: none;
          background: transparent;
          height: 100%;
          width: 100px;
          flex: 1 0 auto;
          font-size: 16px;
          &:focus {
            outline-offset: 0;
            outline: none;
          }
        }
        .count {
          height: 20px;
          width: 80px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bolder;
          color: #666666;
          line-height: 20px;
          text-align: center;
          flex: 0 0 80px;
          white-space: nowrap;
          &:active {
            opacity: 0.8;
          }
        }
      }
      .btn {
        width: 265px;
        height: 50px;
        margin-top: 40px;
        background: linear-gradient(
          90deg,
          rgba(60, 219, 192, 1) 0%,
          rgba(66, 229, 172, 1) 100%
        );
        border-radius: 4px;
        font-size: 18px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 50px;
        text-align: center;
        &:active {
          opacity: 0.8;
        }
      }
    }
    .tip {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
      margin-top: 15px;
      text-align: center;
      .cancel {
        color: #00c5ba;
        text-decoration: underline;
      }
      .phone {
        color: #333333;
        font-weight: bold;
      }
    }
  }
}
</style>

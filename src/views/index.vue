<template>
  <div class="bg">
    <div class="img">
      <img src="https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/activity/coupondidibg.png?t=2" alt />
    </div>
    <div class="content-body" :class="{couponshow:hascoupon}">
      <div class="coupon" v-if="hascoupon">
        <div class="top">
          <div class="money" v-if="coupon.function==='DISCOUNT'">
            <span></span>
            <span>{{coupon.rate|rateFilter}}</span>
          </div>
          <div class="money" v-else>
            <span>￥</span>
            <span>{{coupon.faceValue}}</span>
          </div>
          <div>
            <div class="name">{{coupon.name}}</div>
            <!-- <div class="des">{{coupon.description}}</div> -->
          </div>
        </div>
        <div class="bottom">{{coupon.useRule}}</div>
      </div>
      <div class="phone-msg" v-else>
        <div class="filed">
          <input type="number" @blur="scroll0" placeholder="请输入您的手机号码" v-model="mobile" />
        </div>
        <div class="filed">
          <input type="number" @blur="scroll0" placeholder="请输入验证码" v-model="captcha" />
          <div class="count" @click="getMsg">{{seconds}}</div>
        </div>
        <div class="btn" @click="getCoupon">立即领取</div>
      </div>
      <div class="tip" v-if="hascoupon">
        该优惠券已发送至鲜丰水果会员账号：
        <span style="color:#FFB62C;">{{mobile|phoneFilter}}</span>使用该账号
        登录鲜丰水果APP即可使用。
      </div>
      <div class="tip" v-else>
        输入手机号，优惠券将发放至对应的鲜丰水果账号，请在鲜丰水
        果APP优惠券中查看并使用。
      </div>
      <div class="rule">
        <div class="title">券使用说明：</div>
        <div class="content">
          1、全国鲜丰水果门店可用
          <br />2、券核销时间：12月16日-12月31日
          <br />3、本券不兑现，不找零，优惠不叠加，单笔订单限用一张
          <br />4、如有任何问题可拨打鲜丰水果客服电话：
          <a href="tel:400-8819090">400-8819090</a>
        </div>
      </div>
      <img
        class="logo"
        src="https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/miniprogram/logoh5coupon.png"
        alt
      />
    </div>
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
      hascoupon: false,
      coupon: {
        faceValue: 0,
        name: "",
        description: "",
        useRule: "",
        function: "DISCOUNT",
        rate: ""
      },
      seconds: "获取验证码"
    };
  },
  filters: {
    phoneFilter(mobile) {
      return mobile.replace(/(\d{3})\d{4}(\d{3})/, "$1****$2");
    },
    rateFilter(rate) {
      return (rate * 10).toFixed(1) + "折";
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
    getCoupon() {
      if (!this.mobile) {
        this.$root.toast.showToast("请输入手机号");
        return;
      }
      if (!this.captcha) {
        this.$root.toast.showToast("请输入验证码");
        return;
      }
      this.$root.load.show();

      fetch(`${baseUrl}/newretail/api/mbr/thirdParty/getCoupon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          captcha: this.captcha,
          mobile: this.mobile,
          registerSourceType: "DIDI"
        })
      })
        .then(res => res.json())
        .then(res => {
          this.$root.load.hide();
          if (res.code === 0) {
            this.hascoupon = true;
            this.coupon = res.data;
          } else if(res.code===32002){
            this.$root.toast.showToast('您已经领取过啦，每人仅限领取一张哦～');
          } else{
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
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {
    clearInterval(timer);
  }
};
</script>
<style scoped lang='less'>
.bg {
  background: linear-gradient(
    360deg,
    rgba(255, 223, 138, 1) 0%,
    rgba(219, 139, 45, 1) 40%
  );
  // min-height: 100%;
  .img {
    width: 375px;
    height: 375px;
    background: rgba(245, 245, 245, 1);
    img {
      display: block;
      height: 100%;
      width: 100%;
    }
  }
  .content-body {
    position: relative;
    padding-top: 195px;
    padding-bottom: 50px;
    &.couponshow {
      padding-top: 15px;
    }
    .phone-msg {
      position: absolute;
      width: 335px;
      height: 230px;
      background: rgba(255, 255, 255, 1);
      border-radius: 5px;
      top: -55px;
      left: 20px;
      box-sizing: border-box;
      padding: 25px;
      .filed {
        width: 285px;
        height: 50px;
        background: rgba(249, 249, 249, 1);
        border-radius: 3px;
        border: 1px solid rgba(233, 233, 233, 1);
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
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
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
        width: 285px;
        height: 50px;
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
      color: rgba(255, 255, 255, 1);
      line-height: 20px;
      padding-bottom: 25px;
      padding: 0px 20px 25px 20px;
    }
    .rule {
      padding: 0 20px;
      .title {
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
        margin-bottom: 5px;
      }
      .content {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
      }
    }
    .logo {
      display: block;
      width: 175px;
      height: 26px;
      margin: 25px auto 0;
    }
    .coupon {
      width: 335px;
      height: 125px;
      margin: 0 auto 25px;
      box-sizing: border-box;
      position: relative;
      background: transparent
        url("https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/activity/couponBg.png")
        no-repeat center center;
      background-size: contain;
      .top {
        display: flex;
        align-items: center;
        padding: 25px 30px 0;
        .money {
          color: #ff5959;
          margin-right: 30px;
          span:nth-of-type(1) {
            font-size: 13px;
          }
          span:nth-of-type(2) {
            font-size: 28px;
          }
        }
        .name {
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
        }
        .des {
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 17px;
        }
      }
      .bottom {
        height: 16px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(169, 169, 169, 1);
        line-height: 16px;
        position: absolute;
        left: 20px;
        bottom: 10px;
      }
    }
  }
}
</style>

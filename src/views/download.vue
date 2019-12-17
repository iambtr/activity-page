<template>
  <div class="bg">
    <div class="top">
      <img src="https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/activity/logo.png" alt />
      <h2>“新鲜才好吃”</h2>
      <div class="slogo">“FRESH DELICIOUS”</div>
      <div class="download" @click="download">立即下载</div>
    </div>
    <div class="bottom">
      <h1>鲜丰水果</h1>
      <div>用水果让生活更美好</div>
      <img
        class="divider"
        src="https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/activity/divider.png"
        alt
      />
      <p>
        注：点击右上角
        <img
          src="https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/activity/iconmore.png"
          alt
        />
        按钮选择“在浏览器中打开”进行下载
      </p>
    </div>
    <div class="ios-tip" v-show="tipIosShow" @click="tipIosShow=!tipIosShow">
      <img src="https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/activity/imgtip_ios.png" alt />
    </div>
    <div class="and-tip" v-show="tipAndShow">
      <div class="modal">
        <div class="content">
          点击右上角“···”按钮选择“在浏览器
          中打开”进行下载
        </div>
        <div class="btn" @click="tipAndShow=!tipAndShow">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
let timer = null;
// let baseUrl = "https://dev.xianfengsg.com";
// let baseUrl = "";
let baseUrl = "https://newretail2.xianfengsg.com";
import ListenerPageVisibility from "@/lib/whide.js";
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
      seconds: "获取验证码",
      tipIosShow: false,
      tipAndShow: false,
      platform: "",
      id: "" //门店id
    };
  },
  filters: {},
  computed: {},
  methods: {
    markStore() {
      fetch(`${baseUrl}/newretail/api/mall/store/scanStoreQrCode?id=${this.id}`, {
        method: "GET"
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkPlatform() {
      let userAgent = navigator.userAgent;
      let platform = "";
      if (/android|Linux/i.test(userAgent)) {
        platform += "and";
      }
      if (/(iPhone|iPad|iPod|iOS)/i.test(userAgent)) {
        platform += "ios";
      }
      if (/MicroMessenger/i.test(userAgent)) {
        platform += "_wechat";
      }
      return platform;
    },
    download() {
      if (this.platform === "and") {
        this.$root.toast.showToast("加载中。。");
        window.location.href =
          "gomorestore://data?moduletype=productdetail&storeid=33323424";
        let t = setTimeout(() => {
          window.location.href =
            "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/apk/xfsg-veriosn-3.05.100-build-1911170656-release_305100_5_home_sign.apk";
        }, 3000);
        let navChange = new ListenerPageVisibility();
        navChange.linsternVisibility(
          () => {
            console.log("页面隐藏");
            clearTimeout(t);
          },
          () => {
            console.log("页面显示");
          }
        );
        return;
      }
      if (this.platform === "ios") {
        this.$root.toast.showToast("加载中。。");
        window.location.href = "gomorexf://";
        let t = setTimeout(() => {
          window.location.href = "https://itunes.apple.com/cn/app/id1263377907";
        }, 3000);
        let navChange = new ListenerPageVisibility();
        navChange.linsternVisibility(
          () => {
            console.log("页面隐藏");
            clearTimeout(t);
          },
          () => {
            console.log("页面显示");
          }
        );
        // let t0 = Date.now();
        // let delay = setInterval(function() {
        //   //  var d = new Date();
        //   let t1 = Date.now();
        //   if (t1 - t0 < 3000 && t1 - t0 > 2000) {
        //     window.location.href =
        //       "https://itunes.apple.com/cn/app/id1263377907";
        //   }
        //   if (t1 - t0 >= 3000) {
        //     clearInterval(delay);
        //   }
        // }, 1000);
        return;
      }
      if (/and/.test(this.platform)) {
        this.tipAndShow = true;
        return;
      }
      if (/ios/.test(this.platform)) {
        this.tipIosShow = true;
        return;
      }
    }
  },
  created() {},
  mounted() {
    this.platform = this.checkPlatform();
    this.id = this.$route.query.id;
    this.markStore();
  },
  beforeDestroy() {}
};
</script>
<style scoped lang='less'>
.bg {
  .top {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-top: 70px;
    align-items: center;
    height: 361px;
    background: url("https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/activity/downloadbg.png")
      no-repeat center;
    background-size: contain;
    img {
      width: 75px;
      height: 75px;
    }
    h2 {
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 28px;
      margin-top: 30px;
      margin-bottom: 5px;
    }
    .slogo {
      height: 13px;
      font-size: 9px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 13px;
      letter-spacing: 4px;
      margin-bottom: 30px;
    }
    .download {
      width: 185px;
      height: 50px;
      background: linear-gradient(
        180deg,
        rgba(249, 255, 250, 1) 0%,
        rgba(194, 255, 203, 1) 100%
      );
      box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      border: 2px solid rgba(255, 255, 255, 1);
      text-align: center;
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(60, 219, 192, 1);
      line-height: 48px;
      &:active {
        opacity: 0.7;
      }
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
      margin-top: 44px;
      margin-bottom: 4px;
    }
    div {
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
      margin-bottom: 5px;
    }
    img.divider {
      width: 295px;
      height: 19px;
      margin-bottom: 9px;
    }
    p {
      width: 268px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
      text-align: center;
      img {
        width: 24px;
        height: 18px;
      }
    }
  }
  .ios-tip {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background: #d3ffd9;
    img {
      width: 100vw;
    }
  }
  .and-tip {
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
      height: 148px;
      background: rgba(255, 255, 255, 1);
      border-radius: 5px;
      .content {
        padding: 30px 40px;
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 17px;
        text-align: center;
      }
      .btn {
        height: 50px;
        background: rgba(245, 245, 245, 1);
        border-radius: 0px 0px 5px 0px;
        font-size: 17px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(42, 212, 188, 1);
        line-height: 50px;
        text-align: center;
      }
    }
  }
}
</style>

import { errorMsg } from '@/assets/js/errorMsg.js'
export default {
  data() {
    return {
      param: "",
      result: "",
      isMobile:false
    }
  },
  methods: {
    dealMsg(data) {
      if (data.error == null) {
        this.result = data.result;
        this.$notify({
          title: "提示",
          message: "成功",
          type: "success"
        });
      } else {
        this.$notify({
          title: "提示",
          message: errorMsg(data.error),
          type: "warning"
        });
      }
    },
    getTransaction(type) {
      // 去掉首尾空格
      this.param = this.param.trim()

      if (!this.param) {
        this.$notify({
          title: '提示',
          message: "交易文本不能为空",
          type: 'warning'
        })
        return false;
      }

      if (!/^[0-9a-fA-F]+$/.test(this.param)) {
        this.$notify({
          title: '提示',
          message: "格式错误，请填写交易的十六进制格式文本",
          type: 'warning'
        })
        return false;
      }

      if (type === 'Ptx') {
        this.$chainRpc.sendTransaction(this.param).then(data => {
          this.dealMsg(data)
        });
      } else {
        this.$chainRpc.decodeRawTransaction(this.param).then((data) => {
          this.dealMsg(data)
        });
      }
    }
  },
  mounted(){
    this.isMobile = this.$store.state.isMobile
  }
}

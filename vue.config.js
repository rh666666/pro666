// vue.config.js
module.exports = {
  // 不需要代理到后端，关闭代理配置
  devServer: {
    proxy: {
      // 删除或注释掉代理配置，避免请求转发到真实后端
      // '/api': {
      //   target: 'http://localhost:5000', // 后端服务地址
      //   changeOrigin: true,
      //   secure: false,
      // },
    },
  },
};

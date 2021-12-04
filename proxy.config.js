const PROXY_CONFIG = {
  '/users/**': {
    target: 'https://api.github.com',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
    onProxyReq: (proxyReq, req, res) => {
      // const cookieMap = {
      //   SID: '',
      // };
      // let cookie = '';
      // for (const key in cookieMap) {
      //   if (Object.prototype.hasOwnProperty.call(cookieMap, key)) {
      //     cookie += `${key}=${cookieMap[key]}; `;
      //   }
      // }
      // proxyReq.setHeader('cookie', cookie);
    },
  },
  '/api/**': {
    target: 'http://localhost:32080',
    // target: 'http://ems-dev-api.hncstech.com.cn',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
    pathRewrite: {
      "^/api": ""
    }
  },
  '/bpm/model/designer': {
    target: 'http://192.168.8.40:8080/business-central/kie-wb.jsp?standalone&perspective=LibraryPerspective',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
  }
};

module.exports = PROXY_CONFIG;

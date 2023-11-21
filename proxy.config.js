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
  '/api/auth/**': {
    target: 'http://localhost:9000',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
    pathRewrite: {
      '^/api/auth': '',
    },
  },
  '/api/sys/**': {
    target: 'http://localhost:9100',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
    pathRewrite: {
      '^/api/sys': '',
    },
  },
  '/api/org/**': {
    target: 'http://localhost:9200',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
    pathRewrite: {
      '^/api/org': '',
    },
  },
  '/api/chat/**': {
    target: 'http://localhost:9300',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug',
    pathRewrite: {
      '^/api/chat': '',
    },
  },
  // '/bpm/model/designer/business-central/**': {
  //   target: 'http://192.168.8.40:8080/',
  //   changeOrigin: true,
  //   secure: true,
  //   logLevel: 'debug',
  //   pathRewrite: {
  //     "^/bpm/model/designer": ""
  //   },
  //   onProxyReq: (proxyReq, req, res) => {
  //     // proxyReq.setHeader('Authorization', 'Basic d2JhZG1pbjp3YmFkbWlu');
  //   }
  // }
};

module.exports = PROXY_CONFIG;

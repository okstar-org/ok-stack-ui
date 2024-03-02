# 构建与部署文档

## 构建项目
执行如下命令
```shell
# 安装 angular-cli
$ npm install -g angular-cli
# 初始化 npm 环境
$ npm install
# 生产构建
$ npm run build:relase
$ ls dist/
ok-stack
```

## 部署项目
### 具备条件
- 一台Linux服务器（x86）
- 一个IP
- 一个域名 
- 一个证书
- Nginx 代理
- 配置代理以及IP、域名、证书（请参考相关文档）
### 部署项目

拷贝输出 `dist/ok-stack`到服务器nginx页面目录：`/usr/share/nginx/html/`

### 配置 Nginx 反向代理
准备如下配置文件：`{your_domain}.conf` 放于：`/etc/nginx/sites-available/`目录，内容如下：

```shell

# {your_domain} 是占位符，实际需要替换成域名
# proxy_pass 指向okstack后端服务器
# 证书文件server.crt、server.key位于如下位置：
# /etc/nginx/cert/{your_domain}/server.crt;
# /etc/nginx/cert/{your_domain}/server.key;

server {
        listen 80 ;
        listen [::]:80 ;
        server_name {your_domain};
        return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name {your_domain};

    root /usr/share/nginx/html/ok-stack;

    location / {
      try_files $uri $uri/ /index.html;
    }

     location /api/open/ {
        proxy_cache off;
        proxy_set_header Host $proxy_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://localhost:8000/;
    }

    location /api/auth/ {
        proxy_cache off;
        proxy_set_header Host $proxy_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://localhost:9000/;
    }

    location /api/sys/ {
        proxy_cache off;
        proxy_set_header Host $proxy_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://localhost:9100/;
    }

    location /api/org/ {
        proxy_cache off;
        proxy_set_header Host $proxy_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://localhost:9200/;
    }

    location /api/chat/ {
        proxy_cache off;
        proxy_set_header Host $proxy_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://localhost:9300/;
    }

    location /api/billing/ {
        proxy_cache off;
        proxy_set_header Host $proxy_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://localhost:9400/;
    }

    index index.html index.htm;
    error_page 404 /static/404.html;

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/x-icon application/octet-stream application/wasm;
    gzip_vary on;
    gzip_proxied no-cache no-store private expired auth;
    gzip_min_length 512;

    ssl_certificate cert/{your_domain}/server.crt;
    ssl_certificate_key cert/{your_domain}/server.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
}

````

### 重载或启动 Nginx 服务器

```shell
# 重启
systemctl restart nginx.service
# 重载
nginx -s reload
```

最后，则前端配置完成访问：https://{your_domain} 即可进入界面，注册和登录即可。

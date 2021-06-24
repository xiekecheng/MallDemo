const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res)=>{
        // 找到每次请求的区别 - 请求路径 -req.url
        console.log(req.url);
    if(req.url==='/favicon.ico'){
        res.end()
    }else{
        if(req.url==='/src/home.html'){
            let html = fs.readFileSync('./src/home.html')
            res.end(html)
        }else if(req.url==='/node_modules/normalize.css/normalize.css'){
            let css = fs.readFileSync('./node_modules/normalize.css/normalize.css')
            res.end(css)
        }else if(req.url==='/node_modules//bootstrap/dist/css/bootstrap.min.css'){
            let css = fs.readFileSync('./node_modules//bootstrap/dist/css/bootstrap.min.css')
            res.end(css)
        }else if(req.url==='/src/css/common.css'){
            let css = fs.readFileSync('./src/css/common.css')
            res.end(css)
        }else if(req.url==='/src/css/home.css'){
            let css = fs.readFileSync('./src/css/home.css')
            res.end(css)
        }else if(req.url==='/node_modules/jquery/dist/jquery.min.js'){
            let js = fs.readFileSync('./node_modules/jquery/dist/jquery.min.js')
            res.end(js)
        }else if(req.url==='/node_modules/layui-layer/dist/layer.js'){
            let js = fs.readFileSync('./node_modules/layui-layer/dist/layer.js')
            res.end(js)
        }else if(req.url==='/src/js/common.js'){
            let js = fs.readFileSync('./src/js/common.js')
            res.end(js)
        }else if(req.url==='/src/js/home.js'){
            let js = fs.readFileSync('./src/js/home.js')
            res.end(js)
        }else if(req.url==='/src/js/cookie.js'){
            let js = fs.readFileSync('./src/js/cookie.js')
            res.end(js)
        }else if(req.url==='/src/images/jdbanner1.jpg.webp'){
            let webp = fs.readFileSync('./src/images/jdbanner1.jpg.webp')
            res.end(webp)
        }else if(req.url==='/node_modules/bootstrap/dist/css/bootstrap.min.css.map'){
            let webp = fs.readFileSync('./node_modules/bootstrap/dist/css/bootstrap.min.css.map')
            res.end(webp)
        }else if(req.url==='/src/images/jdbanner2.jpg.webp'){
            let webp = fs.readFileSync('./src/images/jdbanner2.jpg.webp')
            res.end(webp)
        }else if(req.url==='/node_modules/bootstrap/dist/css/bootstrap.min.css.map'){
            let webp = fs.readFileSync('./node_modules/bootstrap/dist/css/bootstrap.min.css.map')
            res.end(webp)
        }else if(req.url==='/src/images/jdbanner3.png.webp'){
            let webp = fs.readFileSync('./src/images/jdbanner3.png.webp')
            res.end(webp)
        }
    }
})

server.listen('8080',()=>{
    console.log('server is running at http://127.0.0.1:8080');
})
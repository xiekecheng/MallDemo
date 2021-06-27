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
        }

        else if(req.url.includes("/node_modules")){
            let data = fs.readFileSync('.'+req.url)
            res.end(data)
        }

        else if(req.url.includes('/css')){
            let css = fs.readFileSync('.'+req.url)
            res.setHeader('content-type','text/css')
            res.end(css)
        }
        else if(req.url.includes('/js')){
            let js = fs.readFileSync('.'+req.url)
            res.setHeader('content-type','application/javascript')
            res.end(js)
        }
        
        // else if(req.url==='/node_modules/normalize.css/normalize.css'){
        //     let css = fs.readFileSync('./node_modules/normalize.css/normalize.css')
        //     res.end(css)
        // }
        // else if(req.url==='/node_modules//bootstrap/dist/css/bootstrap.min.css'){
        //     let css = fs.readFileSync('./node_modules//bootstrap/dist/css/bootstrap.min.css')
        //     res.end(css)
        // }


        /*  css
        else if(req.url==='/src/css/common.css'){
            let css = fs.readFileSync('./src/css/common.css')
            res.end(css)
        }else if(req.url==='/src/css/home.css'){
            let css = fs.readFileSync('./src/css/home.css')
            res.end(css)
        }
        */

        // else if(req.url==='/node_modules/jquery/dist/jquery.min.js'){
        //     let js = fs.readFileSync('./node_modules/jquery/dist/jquery.min.js')
        //     res.setHeader('content-type','image/webp')
        //     res.end(js)
        // }
        // else if(req.url==='/node_modules/layui-layer/dist/layer.js'){
        //     let js = fs.readFileSync('./node_modules/layui-layer/dist/layer.js')
        //     res.setHeader('content-type','image/webp')
        //     res.end(js)
        // }
        // else if(req.url==='/node_modules/bootstrap/dist/css/bootstrap.min.css.map'){
        //     let map = fs.readFileSync('./node_modules/bootstrap/dist/css/bootstrap.min.css.map')
        //     res.end(map)
        // }

        /*
        else if(req.url==='/src/js/common.js'){
            let js = fs.readFileSync('./src/js/common.js')
            res.setHeader('content-type','application/javascript')
            res.end(js)
        }else if(req.url==='/src/js/home.js'){
            let js = fs.readFileSync('./src/js/home.js')
            res.setHeader('content-type','application/javascript')
            res.end(js)
        }else if(req.url==='/src/js/cookie.js'){
            let js = fs.readFileSync('./src/js/cookie.js')
            res.setHeader('content-type','application/javascript')
            res.end(js)
        }
        else if(req.url==='/src/js/carousel.js'){
            let webp = fs.readFileSync('./src/js/carousel.js')
            res.end(webp)
        }
        */




        else if(req.url==='/src/images/jdbanner1.jpg.webp'){
            let webp = fs.readFileSync('./src/images/jdbanner1.jpg.webp')
            res.setHeader('content-type','image/webp')
            res.end(webp)
        }
        else if(req.url==='/src/images/jdbanner2.jpg.webp'){
            let webp = fs.readFileSync('./src/images/jdbanner2.jpg.webp')
            res.setHeader('content-type','image/webp')
            res.end(webp)
        }

        else if(req.url==='/src/images/jdbanner3.png.webp'){
            res.setHeader('content-type','image/webp')
            let webp = fs.readFileSync('./src/images/jdbanner3.png.webp')
            res.end(webp)
        }
        
        
        else if(req.url==='/src/images/user-plus-status.png'){
            let webp = fs.readFileSync('./src/images/user-plus-status.png')
            res.end(webp)
        }else if(req.url==='/src/images/ico_service.png'){
            let webp = fs.readFileSync('./src/images/ico_service.png')
            res.end(webp)
        }else if(req.url==='/src/images/common.png'){
            let webp = fs.readFileSync('./src/images/common.png')
            res.end(webp)
        }else if(req.url==='/src/favicon.ico'){
            let webp = fs.readFileSync('./src/favicon.ico')
            res.end(webp)
        }
    }
})

server.listen('8080',()=>{
    console.log('server is running at http://127.0.0.1:8080');
})
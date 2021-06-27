const fs = require('fs')
const http = require('http')

http.createServer((req,res)=>{
    // if(req.url==='/favicon.ico'){
    //     let data = fs.readFileSync()
    // }


    if(fs.existsSync('.'+req.url)){
        let data = fs.readFileSync('.'+req.url)
        res.end(data)
    }else{
        res.statusCode = 404
        res.statusMessage = 'Not Found'
        var html = `
        <h1>404 Not Found</h1>
        <p>访问的页面不存在</p>
        `
        res.setHeader('content-type','text/html;charset=utf8')
        res.end(html)
    }
}).listen(8080,()=>{
    console.log('server had started');
})


const http=require("http")
const fs=require("fs")
const {parse}=require("querystring")

let server=http.createServer((req,res)=>{
    if(req.method==="POST"){
        if(req.headers["content-type"]==="application/x-www-form-urlencoded"){
            let body="";
            req.on("data",(chunks)=>{
                body+=chunks;
            })
            req.on("end",()=>{
                console.log(parse(body))
                res.end("message Sent")
            })
        }else{
            res.end("not a form data")
        }
    }else{
        if(req.url==="/" || req.url==="/home"){
            res.writeHead(200,"Okay",{"content-type":"text/html"});
            let data=fs.readFileSync("./home.html","utf-8")
            res.end(data)
        }else if(req.url==="/about"){
            res.writeHead(200,"Okay",{"content-type":"text/html"});
            //streams
            let data=fs.createReadStream("./about.html","utf-8");
            data.pipe(res)
        }else if(req.url==="/css"){
            res.writeHead(200,"Okay",{"content-type":"text/css"});
            //streams
            let data=fs.createReadStream("./style.css","utf-8");
            data.pipe(res)
        }else if(req.url==="/contact"){
            res.writeHead(200,"Okay",{"content-type":"text/html"});
            //streams
            let data=fs.createReadStream("./contact.html","utf-8");
            data.pipe(res)
        }
        else{
            res.writeHead(404,"Not found",{"content-type":"text/html"});
            let data=fs.createReadStream("./pageNotFound.html","utf-8");
            data.pipe(res)
        }
    }
    })
server.listen(5000,(err)=>{
    if(err){console.log(err)};
    console.log("server is on 5000...");
})
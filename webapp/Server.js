const http=require('http');
const fs=require('fs');
var qs=require('querystring');
var wp='';
var jsFile='';
var cssFile='';
http.createServer((req,res)=>{
    switch(req.url){
case'/':
res.writeHead(200,{'Content-Type':'text/html'});
file=fs.readFileSync('./appdata/Form.html');
res.end(file);
break;
case'/MainPage.html':
res.writeHead(200,{'Content-Type':'text/html'});
file=fs.readFileSync('./appdata/MainPage.html');
res.end(file);
break;
    }
}).listen(3000,()=>console.log('Server is working'));

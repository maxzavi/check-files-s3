const { log } = require('console')
const https = require('https')
const urls3 ="s3.us-south.cloud-object-storage.appdomain.cloud"

const getS3Result = async (data)=>{
    const result =[]
    const requests =[] 
    data.forEach(item=>{
        const a =  searchImageInS3(item.filename)
        requests.push(a)
    })
    const r = Promise.all(requests)
    .then((rs)=>{  
        for(let i=0; i<data.length; i++){
            result.push({
                filename:data[i].filename,
                dateFile:data[i].dateFile,
                statuscode: rs[i] 
            })
        }
    })
    await r
    return result
}

const searchImageInS3= async (filename)=>{
    const options = {
        host: urls3,
        path: `/imagen-vtex/${filename}`,
        method: 'GET'
    }; 
    let p = new Promise((resolve)=>{
        const req = https.request(options, (res) =>{
            resolve(res.statusCode);
            res.setEncoding("utf8");
            //res.on("data",  (chunk) =>{
            //});
        })
        req.on('error', (err) => {
            log(err)
            resolve(500);
        });
        req.end();    
    })
    return await p
}

module.exports ={
    getS3Result
}
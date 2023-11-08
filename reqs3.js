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
        for(let i=0; i<data.length ; i++){
            result.push({
                filename:data[i].filename,
                dateFile:data[i].dateFile,
                result: rs[i] 
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
    } 
    let p = new Promise((resolve)=>{
        const req = https.request(options, (res) =>{
            //console.log(res.headers);
            const { 'last-modified': last_modified } = res.headers
            //console.log(new Date(last_modified).toISOString());
            const last_modifiedf = new Date(last_modified).toISOString()
            resolve({
                status:res.statusCode,
                last_modified: last_modifiedf
            })
            //res.setEncoding("utf8")
            //res.on("data",  (chunk) =>{
            //})
        })
        req.on('error', (err) => {
            log(err)
            resolve({
                status:500
            })
        })
        req.end()    
    })
    return await p
}

module.exports ={
    getS3Result
}
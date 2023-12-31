const { log } = require('console')

const { writeFile,cleanFile,getLines } = require('./file.js')
const { getS3Result } = require('./reqs3.js')
const { exit } = require('process')

const main= async ()=>{
    const errFile="files/data.err"
    const errFile500="files/data500.err"
    
    const dataOut="files/data.out"
    const blockSize=20

    cleanFile(errFile)
    cleanFile(dataOut)
    cleanFile(errFile500)
    
    const dataFile = await getLines("files/data.in",blockSize)
    for(let i=0 ;i<dataFile.blocks.length ;i++){
        const resp=await getS3Result (dataFile.blocks[i])
        resp.forEach(item=>{
            log(item)
            writeFile(dataOut,`${item.filename}\t${item.dateFile}\t${item.result.status}\t${item.result.last_modified}`)
            if(item.result.status=== 404){
                writeFile(errFile,`${item.filename}\t${item.dateFile}\t${item.result.status}`)
            }
            if(item.result.status=== 500){
                writeFile(errFile500,`${item.filename}\t${item.dateFile}`)
            }
        })
    }
    console.log('End')
}

main()
exit

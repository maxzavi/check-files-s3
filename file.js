const { log } = require('console');
const fs = require('fs');
const axios = require('axios')

const writeFile=(filename,content)=>{
    try {
        fs.writeFileSync(filename, content+ "\n",{ flag: 'a+' });
      } catch (err) {
        console.error(err);
      }
}

const cleanFile=(filename)=>{
    try {
        fs.writeFileSync(filename, '' );
    } catch (err) {
        console.error(err);
    }
}

const getLines= async (filename, blocksize)=>{
    try {
        const result={blocks:[]}
        let block=[]
        const data = await fs.promises.readFile(filename, 'utf8')
        const lines = data.split(/\r?\n/)
        let i=0;
        lines.forEach(line=>{
            const row = line.split(/\t/)
            const filename  = row[0]
            const dateFile = row[1]
            i++
            block.push({
                filename,
                dateFile
            })
            if (i>=blocksize){
                result.blocks.push(block);
                block=[];
                i=0;
            }
        })
        if(block.length>0){
            result.blocks.push(block);
        }
        return result
    }
    catch(err) {
        console.log(err)
    }
}

module.exports={
    writeFile,
    cleanFile,
    getLines
}
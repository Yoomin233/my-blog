const fs = require('fs')
const path = require('path')

let fileList = []

// readdir
fs.readdirSync('./', 'utf8').forEach(fileName => {
  if (fileName.endsWith('md')) {
    const filePath = path.resolve(__dirname, fileName)
    const {mtime, birthtime} = fs.statSync(filePath)
    fileList.push({
      fileName,
      filePath,
      title: fileName.slice(9).replace(/\-/g, ' ').replace(/\..*?$/, ''),
      mtime,
      birthtime,
    })
  }
})

fileList.forEach(file => {
  if (!file.titleImg) {
    const content = fs.readFileSync(file.filePath, 'utf-8')
    const titleImg = content.match()
    console.log(content)
  }
})

const files = {
  total: fileList.length,
  fileList: fileList.sort((a, b) => a.matime - b.mtime)
}

console.log(files)
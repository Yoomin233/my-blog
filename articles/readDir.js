const fs = require('fs-extra')
const path = require('path')

// readdir to a list and filter the .md file
fs.readdir('./', 'utf8')
  .then(async relativeFileNameList => {
    // filter out un-md ending files
    relativeFileNameList = relativeFileNameList.filter(fileName => fileName.endsWith('md'))
    // output
    const fileList = []
    // read file stats
    const mdStatList = await Promise.all(relativeFileNameList.map( fileName => fs.stat(fileName)))
    // generate result
    mdStatList.forEach((fileStat, index) => {
      const fileName = relativeFileNameList[index]
      const filePath = path.resolve(__dirname, fileName)
      const {mtime, birthtime} = fileStat
      fileList.push({
        fileName,
        filePath,
        title: fileName.slice(9).replace(/\-/g, ' ').replace(/\..*?$/, ''),
        mtime,
        birthtime
      })
    })
    // read stored fileList
    if (!fs.existsSync('./articleList.json')) {
      await fs.createFile('./articleList.json')
      await fs.writeJson('./articleList.json', {
        "total": 0,
        "list": []
      }, 'utf-8')
    }
    const storedFileList = await fs.readJson('./articleList.json', 'utf-8')
    // sort
    return {
      generatedFileList: fileList.sort((a, b) => b.mtime - a.mtime),
      storedFileList
    }
    // for (let fileName in list) {
    //   if (fileName.endsWith('md')) {
    //     const filePath = path.resolve(__dirname, fileName)
    //     const { mtime, birthtime } = await fs.stat(filePath)
    //     fileList.push({
    //       fileName,
    //       filePath,
    //       title: fileName.slice(9).replace(/\-/g, ' ').replace(/\..*?$/, ''),
    //       mtime,
    //       birthtime,
    //     })
    //   }
    // }
    // return fileList.sort((a, b) => a.matime - b.mtime)
  })
  .then(async ({generatedFileList, storedFileList}) => {
    // if no content, write initial content
    storedFileList = storedFileList.list
    for (let index = generatedFileList.length - 1; index >= 0 ; index--) {
      // diff, if not exist, then write titleImg (and everything else)
      const fileInfo = generatedFileList[index]
      if (!storedFileList[index]) {
        const fileContent = await fs.readFile(fileInfo.filePath, 'utf-8')
        storedFileList[index] = Object.assign(
          {},
          fileInfo,
          {titleImg: fileContent.match(/!\[img\]\(([^\s]*?)\s/) ? fileContent.match(/!\[img\]\(([^\s]*?)\s/)[1] : 'https://placekitten.com/800/200?image=12'}
        )
        console.log('new record added! title: ' + fileInfo.title)
      } else {
        // else check the mtime prop
        if (fileInfo.mtime !== storedFileList[index]['mtime']) {
          storedFileList[index]['mtime'] = fileInfo.mtime
        }
      }
    }
    await fs.writeJson('./articleList.json', {
      list: storedFileList,
      total: storedFileList.length
    }, 'utf-8')
  })
  .catch(e => console.log(e))
  
const fs = require('fs-extra')
const path = require('path')

// readdir to a list and filter the .md file
fs.readdir(path.resolve(__dirname, './'), 'utf8')
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
      generatedFileList: fileList.sort((a, b) => a.birthtime - b.birthtime),
      storedFileList
    }
  })
  .then(async ({generatedFileList, storedFileList}) => {
    // if no content, write initial content
    storedFileList = storedFileList.list
    for (let index = 0; index < generatedFileList.length ; index++) {
      // diff, if not exist, then write titleImg (and everything else) to the head of the storedList
      const fileInfo = generatedFileList[index]
      if (!storedFileList[index]) {
        const fileContent = await fs.readFile(fileInfo.filePath, 'utf-8')
        // add new file to the temp arr
        storedFileList.unshift(Object.assign(
          {},
          fileInfo,
          {titleImg: fileContent.match(/\!\[.*\]\((.*)\)/) ? 
            fileContent.match(/\!\[.*\]\((.*)\)/)[1] : 
            'https://placekitten.com/800/200?image=12'}
        ))
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
    console.log(`successfully written ${storedFileList.length} records`)
  })
  .catch(e => console.log(e, e.stack))
  
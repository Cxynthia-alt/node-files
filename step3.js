const fs = require('fs')
const axios = require('axios')

const args = process.argv.slice(2)
const outputIndex = args.findIndex(arg => arg.startsWith('--out'))
let outputFileName;
let input;

if (outputIndex >= 0) {
  outputFileName = args[1]
  input = args.pop()
} else {
  input = process.argv[2]
}



function cat(path, fileName) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log("Error:", err)
      process.kill(1)
    }
    if (fileName) {
      saveFile(fileName, data)
    }
    console.log(data)
  })

}

function webCat(url) {
  axios.get(`${url}`).then(function (resp) {
    const fileName = new URL(`${url}`).hostname
    saveFile(fileName, resp.data)
  })
    .catch((err) => { console.log("Error: ", err) })
}



function saveFile(fileName, data) {
  fs.writeFile(fileName, data, 'utf8', function (err) {
    if (err) {
      console.log("Error:", err)
      process.kill(1)
    }
    console.log(data.slice(0, 80), '...')
  })
}


function catWrite(path, fileName, outputFileName) {
  fs.writeFile(outputFileName, data, 'utf8', function (err) {
    if (err) {
      console.log("Couldn't write", outputFileName + ':')
      console.log(err)
      process.exit(1)
    }
  })
}

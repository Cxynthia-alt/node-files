const fs = require('fs')
const axios = require('axios')
const input = process.argv[2]

if (input.startsWith('http://') || input.startsWith('https://')) {
  webCat(process.argv[2])
} else {
  cat(process.argv[2])
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

const fs = require('fs')
const axios = require('axios')

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log("Error:", err)
      process.kill(1)
    }
    console.log(data)
  })
}

function webCat(url) {
  axios.get(`${url}`).then(function (resp) {
    console.log(resp.data.slice(0, 80), '...')
  })
    .catch((err) => { console.log("Error: ", err) })
}

const input = process.argv[2]
if (input.startsWith('http://') || input.startsWith('https://')) {
  webCat(process.argv[2])
} else {
  cat(process.argv[2])
}

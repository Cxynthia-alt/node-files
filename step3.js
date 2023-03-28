const fs = require('fs')
const axios = require('axios')
const process = require('process');

let path, out


if (process.argv[2] === '--out') {
  out = process.argv[3]
  path = process.argv[4]
} else {
  path = process.argv[2]
}

if (path.startsWith('http://') || path.startsWith('https://')) {
  webCat(path, out)
} else {
  cat(path, out)
}


function cat(path, out) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log("Error:", err)
      process.kill(1)
    }
    else {
      saveFile(data, out)
    }
  })

}

function webCat(url, out) {
  const res = axios.get(`${url}`)
  res.then(function (resp) {
    const fileName = new URL(`${url}`).hostname
    saveFile(resp.data, fileName)
  })
    .catch((err) => { console.log("Error: ", err) })
}



function saveFile(data, fileName) {
  if (fileName) {
    fs.writeFile(fileName, data, 'utf8', function (err) {
      if (err) {
        console.log("Error:", err)
        process.kill(1)
      }
    })
  } else {
    console.log('Write failed. Plz print data dn fileName', data, fileName);
  }

}

const request = require("request")
const fs = require("fs")


async function upload(bin, file_name, file_data) {
    request.post("https://dev.filebin.net", {
        headers: {
            bin: bin,
            filename: file_name
        },
        body: file_data
    }, function (err, res, body) {
        var data = res.body;
            data = JSON.parse(data)
            
            console.log(typeof data)
    })
}

module.exports = {
    upload: upload
}

upload("server-gg-testing1", "package.json", "{ 'message': 'hey' }")
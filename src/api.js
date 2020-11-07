const request = require("request")
const fs = require("fs");


/**
 * Uploads a file and content to a random bin on 'dev.filebin.net'.
 * 
 * @param {string} file_name 
 * @param {any} file_data 
 * @returns {object} 
 * @throws {string} 'No data given'
 */
async function upload(file_name, file_data) {
    return new Promise(resolve => {
        var characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var bin_id = [];
    
        if (!file_name || !file_data) resolve({
            message: "No data given"
        })

        bin_id.push(characters[Math.floor(Math.random() * characters.length)])
        bin_id.push(characters[Math.floor(Math.random() * characters.length)])
        bin_id.push(characters[Math.floor(Math.random() * characters.length)])
        bin_id.push(characters[Math.floor(Math.random() * characters.length)])
        bin_id.push(characters[Math.floor(Math.random() * characters.length)])
        bin_id.push(characters[Math.floor(Math.random() * characters.length)])
        bin_id.push(characters[Math.floor(Math.random() * characters.length)])
        bin_id.push(characters[Math.floor(Math.random() * characters.length)])
        bin_id.push(characters[Math.floor(Math.random() * characters.length)])
        bin_id.push(characters[Math.floor(Math.random() * characters.length)])
        bin_id.push(characters[Math.floor(Math.random() * characters.length)])
        bin_id.push(characters[Math.floor(Math.random() * characters.length)])
    
        bin_id = bin_id.join("");
    
        request.post("https://dev.filebin.net", {
            headers: {
                bin: bin_id,
                filename: file_name
            },
            body: file_data,
        }, function (err, res, body) {
            var data = JSON.parse(res.body);
    
            resolve({
                url: `https://dev.filebin.net/${data.bin.id}`,
                bin_id: data.bin.id,
                file_size: data.file.bytes,
                expires_in: data.bin.expired_at
            });
        })
    })
}

module.exports = {
    upload: upload
}
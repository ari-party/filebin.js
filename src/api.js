const request = require("request")
const fs = require("fs")

/**
 * Uploads a file and content to a random bin on 'dev.filebin.net'.
 * 
 * @param {string} file_name This will be the name that will show up as the file.
 * @param {any} file_data The content of the file.
 * @returns {object} View example of the response at https://github.com/HashedDev/filebin.js#upload.
 * @throws {object} { message: "No data given/Error" }
 */
async function upload(file_name, file_data) {
    return new Promise(resolve => {
        var characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var bin_id = [];
    
        if (!file_name || !file_data) resolve({
            message: "No data given/Error"
        });

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
                bin_url: `https://dev.filebin.net/${data.bin.id}`,
                file_url: `https://dev.filebin.net/${data.bin.id}/${file_name}`,
                bin_id: data.bin.id,
                file_size: data.file.bytes,
                expires_in: data.bin.expired_at
            });
        })
    })
}

/**
 * Downloads a file from 'dev.filebin.net'.
 * 
 * @param {string} bin_id
 * @param {string} file_name Requires file exstension.
 * @param {string} path Path (This includes the name of the file it will go in.)
 * @returns {object} { path: "(path where it is downloaded)" }
 * @throws {object} { message: "No data given/Error" }
 */
async function download(bin_id, file_name, path) {
    return new Promise(resolve => {
        if (!bin_id || !file_name || !path) resolve({
            message: "No data given/Error"
        });

        const writeStream = fs.createWriteStream(path)

        request({
            uri: `https://dev.filebin.net/${bin_id}/${file_name}`,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
                'Cache-Control': 'max-age=0',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
            },
            gzip: true
        }).pipe(writeStream)
            .on("finish", () => {
                resolve({ path: path })
            })
            .on("error", (err) => {
                resolve(err);
            })
    })
}

/**
 * Download a entire bin to a folder.
 * 
 * @param {string} bin_id
 * @param {string} path 
 * @returns {string} { path: "(path where it is downloaded)", filesDownloaded: [{ file_name: '...', file_url: 'https://dev.filebin.net/.../...', file_size_bytes: ... }] }
 * @throws {object} { message: "No data given/Error" }
 */
async function downloadBin(bin_id, path)  {
    return new Promise(resolve => {
        if (!bin_id || !path) resolve({
            message: "No data given/Error"
        });

        getInfo(bin_id).then(bin => {
            const binFiles = bin.bin_files

            var forEach_processed = 0

            binFiles.forEach(file => {
                forEach_processed++
                download(bin_id, file.file_name, `${path}/${file.file_name}`)
                if (binFiles.length === forEach_processed) return callback();
            })

            function callback() {
                resolve(
                    {
                        path: path,
                        filesDownloaded: binFiles
                    }
                )
            }
        })
    })
}

/**
 * Get information about a bin from 'dev.filebin.net'
 * 
 * @param {string} bin_id 
 * @returns {object} { bin_id: '...', bin_size_bytes: ..., bin_files_size: ..., bin_files: [{ file_name '...', file_url: 'https://dev.filebin.net/.../...', file_size_bytes: ... }] }
 * @throws {object} { message: "No data given/Error" }
 */
async function getInfo(bin_id) {
    return new Promise(resolve => {
        if (!bin_id) resolve({
            message: "No data given/Error"
        });

        request.get({
            uri: `https://dev.filebin.net/${bin_id}`,
            headers: {
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
            },
            gzip: true
        }, function (err, res, body) {
            const data = JSON.parse(res.body)
                var bin_files = []
                
                data.files.forEach(file => {
                    bin_files.push(
                        {
                            file_name: file.filename,
                            file_url: `https://dev.filebin.net/${data.bin.id}/${file.filename}`,
                            file_size_bytes: file.bytes
                        }
                    )
                })

                resolve({
                    bin_id: data.bin.id,
                    bin_size_bytes: data.bin.bytes,
                    bin_files_size: data.bin.files,
                    bin_files: bin_files
                });
        })
    })
}

module.exports = {
    upload: upload,
    download: download,
    downloadBin: downloadBin,
    getInfo: getInfo
}
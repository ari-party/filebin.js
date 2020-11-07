# Under Development ⚠

This package is currently being worked on, don't expect everything to work as planned.

__Note:__ Bugs as suggestions can be told in the [issues tab](https://github.com/HashedDev/filebin.js/issues).

*We do not recommend uploading large files.*

# filebin.js 🗑

A javascript api for filebin.net

[![npm version](https://badge.fury.io/js/filebin.js.svg)](https://badge.fury.io/js/filebin.js)

---

### Example Code ✏

#### upload

```js
const filebin = require("filebin.js")

filebin.upload("your file name", "the content of that file").then(promise => {

})

// If you would log 'promise', it would return:
{
    bin_url: 'https://dev.filebin.net/...', // String
    file_url: 'https://dev.filebin.net/.../...', // String
    bin_id: '...', // String
    file_size: ..., // Returns in bytes (There will not be a 'b' for bytes included.) - Integer
    expires_in: '...' // Date (year-month-dayThour:minute:second:miliseconds) - String
}
```

#### download

```js
const filebin = require("filebin.js")

filebin.download("bin id", "file name", "path to download to").then(promise => {

})

// If you would log 'promise', it would return:
{
    path: "...", // String
    file_name: "..." // String
}
```

#### getInfo

```js
const filebin = require("filebin.js")

filebin.getInfo('bin id').then(promise => {

})

// If you would log 'promise', it would return:
{
    bin_id: '...', // String
    bin_size_bytes: ..., // Returns in bytes (There will not be a 'b' for bytes included.) - Integer
    bin_files_size: ..., // Integer
    bin_files: [ // Array
        {
            file_name: '...', // String
            file_url: 'https://dev.filebin.net/.../...', // String
            file_size_bytes: ... // Returns in bytes (There will not be a 'b' for bytes included.) - Integer
        }
    ]
}
```

#### downloadBin

```js
const filebin = require("filebin.js")

filebin.downloadBin('bin id', "path to download to").then(promise => {

})

// If you would log 'promise', it would return:
{
    path: "(path where it is downloaded)",
    filesDownloaded: [
        {
            file_name: '...', // String
            file_url: 'https://dev.filebin.net/.../...', // String
            file_size_bytes: ... // Returns in bytes (There will not be a 'b' for bytes included.) - Integer
        }
    ]
}
```

---

## Checklist 📃

- [x] Upload file
- [x] Download file
- [x] Get bin info
- [x] Download Bin

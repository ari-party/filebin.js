# Deprecated
# filebin.js 🗑
A javascript api for filebin.net<br/>
I made this when I was relatively young, don't take it for granted

[![npm version](https://badge.fury.io/js/filebin.js.svg)](https://badge.fury.io/js/filebin.js)

---

### Example ✏

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
    file_size: ..., // Returns in bits (There will not be a 'b'for bits included.) - Integer
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
    path: "...",
    file_name: "..."
}
```

#### getInfo

```js
const filebin = require("filebin.js")

filebin.getInfo('bin id').then(promise => {

})

// If you would log 'promise', it would return:
{
    bin_id: '...',
    bin_size_bytes: ...,
    bin_files_size: ...,
    bin_files: [
        {
            file_name: '...',
            file_url: 'https://dev.filebin.net/.../...',
            file_size_bytes: ...
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
            file_name: '...',
            file_url: 'https://dev.filebin.net/.../...',
            file_size_bytes: ...
        }
    ]
}
```

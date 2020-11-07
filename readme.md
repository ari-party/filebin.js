# Under Development ⚠

This package is currently being worked on, don't expect everything to work as planned.

__Note:__ Bugs as suggestions can be told in the [issues tab](https://github.com/HashedDev/filebin.js/issues)

*We do not recommend uploading large files.*

# filebin.js 🗑
A javascript api for filebin.net

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
"(path where it is downloaded)"
```

---
## Checklist 📃

- [X] Upload file
- [x] Download file
- [ ] Get bin info

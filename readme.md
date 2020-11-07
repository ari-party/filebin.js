# Under Development
This package is currently being worked on, don't expect everything to work as planned.

# filebin.js
A javascript api for filebin.net

### Example Code
#### upload
```js
const filebin = require("filebin.js")

filebin.upload("your file name", "the content of that file").then(promise => {

})

// If you would log promise, it would return:
{
    url: 'https://dev.filebin.net/...', // String
    bin_id: '...', // String
    file_size: ..., // Returns in bits (There will not be a 'b'for bits included.) - Integer
    expires_in: '...' // Date (year-month-dayThour:minute:second:miliseconds) - String
}
```

## Checklist

- [x] Upload file
- [ ] Download file
- [ ] Get bin info

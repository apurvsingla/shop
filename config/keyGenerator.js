const crypto = require('crypto');

crypto.randomBytes(32, (err,buf) => {
    console.table(`${buf.toString('hex')}`);
})
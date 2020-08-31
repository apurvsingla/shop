const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const PRODUCT_PATH = path.join('/uploads/winter')

const winterSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    productDesc: {
        type: String
    },
    price: {
        type: Number,
        default:0
    },
    uploadedOn: {
        type: Date,
        default: Date.now()
    },
    file: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

let storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, path.join(__dirname, '..', PRODUCT_PATH)); 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()); 
    } 
}); 

//static methods
winterSchema.statics.uploadedProduct = multer({storage: storage}).single('file');
winterSchema.statics.productPath = PRODUCT_PATH;

const WinterCollection = mongoose.model('winterCollection', winterSchema);

module.exports = WinterCollection;
const path = require('path');
const fs = require('fs');
const Upload = require('../models/upload');
const Winter = require('../models/winter');
const SummerCollection = require('../models/summerProduct');
const WinterCollection = require('../models/winterProducts');

//summer
module.exports.summerPage = async (req,res) => {
    let product = await Upload.find({});
    return res.render('uploadSummerImage', {
        title: "Summer Collection",
        product: product
    })
}

module.exports.summerCollection = async (req,res) => {
    let summerProduct = await SummerCollection.find({});
    return res.render('summerCollectionImage', {
        title: "Summer Collection",
        product: summerProduct
    });
};

module.exports.summerCollectionImage = async (req,res) => {
    try {
        let upload = await SummerCollection.findById({_id: req.params.id});
        SummerCollection.uploadedProduct(req, res, function(err) {
            if (err) {
                console.log('*****Multer Error: ', err);
            }
            if (req.file) {
                if (upload.file !== "") {
                    fs.unlinkSync(path.join(__dirname, '..', upload.file));
                }
                upload.file = SummerCollection.productPath + '/' + req.file.filename
            }
            upload.save();
            return res.redirect('back');
        })
    } catch (err) {
        console.log(err)
        return res.redirect('back');
    }
}

module.exports.uploadSummerImage = async function(req, res) {
        try {
            let upload = await Upload.findById({_id: req.params.id});
            Upload.uploadedProduct(req, res, function(err) {
                if (err) {
                    console.log('*****Multer Error: ', err);
                }
                if (req.file) {
                    if (upload.file !== "") {
                        fs.unlinkSync(path.join(__dirname, '..', upload.file));
                    }
                    upload.file = Upload.productPath + '/' + req.file.filename
                }
                upload.save();
                return res.redirect('back');
            })
        } catch (err) {
            console.log(err)
            return res.redirect('back');
        }
}

module.exports.summer = async (req,res) => {
    let product = await Upload.find({});
    return res.render('product', {
        title: "Summer Collection",
        product: product
    })
}

module.exports.summerProduct = async (req,res) => {
    let product = await SummerCollection.find({});
    return res.render('summerProducts', {
        title: "Summer Collection",
        product: product
    })
}



//winter
module.exports.winter = async (req,res) => {
    let winter = await Winter.find({});
    return res.render('winter', {
        title: "Winter Collection",
        winter: winter
    })
}


module.exports.winterPage = async (req,res) => {
    let winter = await Winter.find({});
    return res.render('uploadWinterImage', {
        title: "Winter Collection",
        winter: winter
    })
}


module.exports.uploadWinterImage = async (req,res) => {
    try {
        let winter = await Winter.findById({_id: req.params.id});
        Winter.uploadedProduct(req, res, function(err) {
            if (err) {
                console.log('*****Multer Error: ', err);
            }
            if (req.file) {
                if (winter.file) {
                    fs.unlinkSync(path.join(__dirname, '..', upload.file));
                }
                winter.file = Winter.productPath + '/' + req.file.filename
            }
            winter.save();
            return res.redirect('back');
        })
    } catch (err) {
        console.log(err)
        return res.redirect('back');
    }
};


module.exports.winterCollection = async (req,res) => {
    let winterProduct = await WinterCollection.find({});
    return res.render('winterCollectionImage', {
        title: "Winter Collection",
        product: winterProduct
    });
};

module.exports.winterCollectionImage = async (req,res) => {
    try {
        let upload = await WinterCollection.findById({_id: req.params.id});
        WinterCollection.uploadedProduct(req, res, function(err) {
            if (err) {
                console.log('*****Multer Error: ', err);
            }
            if (req.file) {
                if (upload.file !== "") {
                    fs.unlinkSync(path.join(__dirname, '..', upload.file));
                }
                upload.file = WinterCollection.productPath + '/' + req.file.filename
            }
            upload.save();
            return res.redirect('back');
        })
    } catch (err) {
        console.log(err)
        return res.redirect('back');
    }
}
module.exports.winterProduct = async (req,res) => {
    let product = await WinterCollection.find({});
    return res.render('winterProducts', {
        title: "Winter Collection",
        product: product
    })
}


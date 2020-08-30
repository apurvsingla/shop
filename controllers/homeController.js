
const asyncPage = (name, data) => async(req,res) => {
    return res.render(name, {title: data,})
}

module.exports.home = asyncPage('home', 'Home');

module.exports.cart = asyncPage('shop-cart', 'Cart');

module.exports.done = asyncPage('done', 'Successfull');

module.exports.admin = asyncPage('admin', 'Admin')

const path = require('path')

module.exports = {
    viewPath: path.join(__dirname,'../views'),
    node_modules_path:path.join(__dirname,'../node_modules'),
    public_path:path.join(__dirname,'../public'),
    uploadDir: path.join(__dirname,'../public/uploads')
}
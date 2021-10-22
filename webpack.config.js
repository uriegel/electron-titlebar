var path = require("path")

module.exports = {
    entry: '/src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        library: "web-electron-titlebar",
        libraryTarget: "umd"
    }
}
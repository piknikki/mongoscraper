// this is like the index.js file for sequelize, but doesn't have as much stuff.
// just points to the other two models, since mongo will look for the index.js first
module.exports = {
    Article: require("./Article"),
    Note: require("./Note")
}
var ReactTools = require('react-tools');

require("babel-register");

module.exports = {
    process: function(src) {
        return ReactTools.transform(src, { harmony: true });
    }
};
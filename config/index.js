var configValues = require('./config');

module.exports = {
    getDbConnectionString : function() {
        return `mongodb://${configValues.username}:${configValues.password}@ds161048.mlab.com:61048/nodetodo`;
    }
};
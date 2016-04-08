var _ = require('lodash');

function typeFromType(type) {
  
}

module.exports = {
  schemaNameFromId: function(id) { return id.split('/').pop(); },
  pathFromProperty: function(property) {
    var type = _.capitalize(property.type);
    if (type === 'Integer') type = 'Number';
  }
}

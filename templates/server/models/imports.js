var _ = require('lodash');

module.exports = {
  schemaNameFromId: function(id) { return id.split('/').pop(); },
  pathFromProperty: function(property) {
    var type = _.capitalize(property.type);
    if (type === 'Integer') type = 'Number';
  }
}

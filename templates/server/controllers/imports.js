var _ = require('lodash')
  , pluralize = require('pluralize');

function schemaNameFromId(id) { return id.split('/').pop(); }

module.exports = {
  schemaNameFromId: schemaNameFromId,
  pathFromProperty: function(property, key, required) {
    var type;
    if (property.type) {
      type = _.capitalize(property.type);
    } else {
      type = 'Schema.ObjectId'
    }
    var path = '{\n    type: ';
    path += type;
    if (_.includes(required, key)) {
      path += ",\n    required: true";
    }
    switch (type) {
      case 'String':
        path += ",\n    trim: true";
        break;
      case 'Schema.ObjectId':
        path += ",\n    ref: '" + schemaNameFromId(property.$ref) + "'";
        break;
    }
    path += '\n  }';
    return path;
  },
  pluralize: pluralize
}

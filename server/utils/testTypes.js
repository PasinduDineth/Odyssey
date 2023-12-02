const stringStore = {
    'UI': 'ui',
    'ACCEPTANCE': 'acceptance',
    'API': 'api'
  };
  
  function getTestTypes(type) {
    return stringStore[type];
  }
  
  module.exports = getTestTypes;

module.exports = {
  extractValidProps: function({
    body, validProps=[]
  }) {
    const cleanObject = {};
    validProps.forEach(prop => {
      cleanObject[prop] = body[prop]
    });
    return cleanObject
  },
  trimUndefinedProps: function (target) {
    const cleanObject = {};
    Object.keys(target).forEach(prop => {
      target[prop] ? cleanObject[prop] = target[prop] : null
    })
    return cleanObject
  },

  isValidTelephoneNumber: function (telephoneNumber) {
    const tenNumberRegExp = /^0\d{9}$/ ;
    const twelveNumberRegExp = /^\+?233\d{9}$/ ;

    if (!(/\d+/.test(telephoneNumber))) {
      return false
    }
  
    if (tenNumberRegExp.test(telephoneNumber) || twelveNumberRegExp.test(telephoneNumber)) {
      return true
    }
  
    return false
  }
}

module.exports = function (arr) {
  if (!arr) {
    return arr
  }
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    arr.slice().sort(compare('price'))
    return arr[0].price
  }
  function compare(property) {
    return function(a,b){
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
  }
}

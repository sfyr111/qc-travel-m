let devRootPath = 'http://192.168.16.210:8080/qc-travel/'
let proRootPath = 'http://jl.17cai.com/security/'
let rootPath = process.env.NODE_ENV === "production" ? proRootPath : devRootPath
let imgPath = process.env.NODE_ENV === "production" ? "http://jl.17cai.com/static/img/" : "http://127.0.0.1/static/img/"
const configUrl = {
  imgPath,
  test: {
    pattern: /test.json/,
    dataUrl: 'test.json'
  },
  //	机票城市查询
  cityAir: {
  	pattern: /cityAir.json/,
    dataUrl: rootPath + 'security/aircraft/all_air_city_info'
  },
  //	机票城市模糊查询
  cityAirKey: {
    pattern: /cityAir.json/,
    dataUrl: rootPath + 'security/aircraft/search_air_city_info'
  },
}
export default configUrl

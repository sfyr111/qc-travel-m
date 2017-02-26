let devRootPath = 'http://192.168.16.210:8091/qc-resume/security/'
let proRootPath = 'http://jl.17cai.com/security/'
let rootPath = process.env.NODE_ENV === "production" ? proRootPath : proRootPath
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
    dataUrl: 'cityAir.json'
  },
}
export default configUrl

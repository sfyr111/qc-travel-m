let devRootPath = 'http://192.168.16.210:8080/qc-travel/'
let proRootPath = 'http://jl.17cai.com/security/'
let rootPath = process.env.NODE_ENV === "production" ? proRootPath : devRootPath
let imgPath = process.env.NODE_ENV === "production" ? "http://travel.17cai.com/static/img/" : "http://travel.17cai.com/static/img/"
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
  //	机票查询
  airList: {
    pattern: /cityAir.json/,
    dataUrl: rootPath + 'security/aircraft/go_aircraft_list_page'
  },
  //  杭奔经停
  airChange: {
    pattern: /cityAir.json/,
    dataUrl: rootPath + 'security/aircraft/flight_provision_city'
  },
  //酒店城市模糊查询
  hotelCityInput: {
    dataUrl: rootPath + 'security/hotel/search_hotel_city_info'
  },
  //  酒店热门城市
  hotelCity: {
    dataUrl: rootPath + 'security/hotel/get_hotel_city_info_of_mobile'
  }
}
export default configUrl

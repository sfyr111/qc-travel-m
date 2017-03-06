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
  //  航班经停
  airChange: {
    pattern: /cityAir.json/,
    dataUrl: rootPath + 'security/aircraft/flight_provision_city'
  },
  //  机票下单
  airBook: {
    pattern: /cityAir.json/,
    dataUrl: rootPath + 'security/aircraft/book_aircraft'
  },
  //  乘客查询
  passQuery: {
    pattern: /cityAir.json/,
    dataUrl: rootPath + 'security/passenger/get_passenger_info'
  },
  //  乘客保存
  passSave: {
    pattern: /cityAir.json/,
    dataUrl: rootPath + 'security/passenger/update_passenger_info'
  },
  //  地址列表
  addressList: {
    //pattern: /hotelSearchList.json/,
    dataUrl: rootPath + 'security/invoice/query_adddress_list'
  },
  // 新增地址
  addressSave: {
    //pattern: /hotelSearchList.json/,
    dataUrl: rootPath + 'security/invoice/add_or_edit_adddress'
  },
  //酒店城市模糊查询
  hotelCityInput: {
    dataUrl: rootPath + 'security/hotel/search_hotel_city_info'
  },
  //  酒店热门城市
  hotelCity: {
    dataUrl: rootPath + 'security/hotel/get_hotel_city_info_of_mobile'
  },
  //  酒店位置区域
  hotelArea: {
    dataUrl: rootPath + 'security/hotel/get_hotel_area'
  },
  //  酒店位置区域
  hotelList: {
    dataUrl: rootPath + 'security/hotel/get_hotel_search_data'
  },
  //  酒店详情
  hotelDetail: {
    dataUrl: rootPath + 'security/hotel/get_hotel_detail'
  },
  //  酒店房型房价
  hotelRoomTypePrice: {
    dataUrl: rootPath + 'security/hotel/get_hotel_room_type'
  },
  //  酒店评论
  hotelComment: {
    dataUrl: rootPath + 'security/hotel/get_hotel_comment'
  },
  // 机票订单列表
  listOrderAir: {
    dataUrl: rootPath + 'security/aircraft/user_flight_order_list'
  },
  // 机票订单详情
  OrderAirDetail: {
    dataUrl: rootPath + 'security/aircraft/flight_order_detail'
  },
  // 机票订单列表
  listOrderHotel: {
    dataUrl: rootPath + 'security/hotel/user_hotel_order_list'
  },
  // 酒店订单详情
  OrderHotelDetail: {
    dataUrl: rootPath + 'security/hotel/user_hotel_order_detail'
  },
}
export default configUrl

<template>
	<transition name="slide">
		<div id="big_map"></div>
	</transition>
</template>

<style lang="less">
#big_map{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>

<script>
export default {
	data () {
		return {
			longitude: '',
			latitude: '',
			hotelName: ''
		}
	},
	created () {
		let query = this.$route.query
		this.longitude = query.longitude
		this.latitude = query.latitude
		this.hotelName = query.hotelName
	},

	mounted () {
		//	初始化地图
		this.loadBMPScript()
	},

	methods: {
		//	动态插入地图script
    loadBMPScript () {
    	let self = this
  		var script = document.querySelector('#getMap')
  		if (!script) {
  			script = document.createElement("script")
  			script.type = "text/javascript"
  			script.src = "http://api.map.baidu.com/api?v=2.0&ak=QfPA2I3xDcMBoGFmpcKxbWHz&callback=init"
  			script.id = 'getMap'
  			document.body.appendChild(script);

  			script.onload = function () {
  				setTimeout(function () {
  					self.initBMP()
  				}, 1500)
  			}
  		}
  		else {
  			this.initBMP ()
  		}
  	},

  	//	初始化百度地图
  	initBMP () {
  		let self = this
			var point = new BMap.Point(self.longitude, self.latitude) // 创建点坐标
			self.map = new BMap.Map("big_map")            // 创建Map实例
			self.map.centerAndZoom(point,15)
			self.map.addControl(new BMap.NavigationControl());

			self.map.enableScrollWheelZoom()                 //启用滚轮放大缩小
			
			//坐标转换完之后的回调函数
			var translateCallback = function (data){
				if (data.status) {
					console.log('转换坐标失败')
					return
				}
				var marker = new BMap.Marker(data.points[0]);
				self.map.addOverlay(marker);
				var opts = {
				  position : point,    // 指定文本标注所在的地理位置
				  offset   : new BMap.Size(-50, -30)    //设置文本偏移量
				}
				var label = new BMap.Label(self.hotelName, opts);  // 创建文本标注对象
				label.setStyle({
					 color : "#666",
					 fontSize : "12px",
					 height : "26px",
					 lineHeight : "26px",
					 fontFamily:"微软雅黑",
					 border: '1px solid #ddd',
					 maxWidth: '84px',
					 padding: '0 10px',
					 display: 'inline-block',
					 'max-width': '300px'
				 });
				marker.setLabel(label);
				self.map.setCenter(data.points[0]);
			}

			setTimeout(function(){ 
	        var convertor = new BMap.Convertor();
	        var pointArr = [];
	        pointArr.push(point);
	        convertor.translate(pointArr, 3, 5, translateCallback)
	    }, 1000);
  	},
	}
}
</script>
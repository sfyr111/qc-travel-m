<template>
	<div>
		<div class="trip_box" v-for="trip in tripList">
			<div class="trip_hd clearfix">
				<span class="fl trip_city">{{trip.depCityName}}-{{trip.arrCityName}}</span>
				<span class="fr trip_change" 
					@click="showTip(sourceId,trip.airways,trip.depCityCode,trip.arrCityCode,trip.depdate,trip.fareitemid,trip.seatcode)">退改签></span>
			</div>
			<div class="trip_cont">
				<div class="trip_no">
					<img :src="imgPrifx+trip.airways+'.png'" alt="">
					<span>{{trip.airwaysCn}}{{trip.flightNo}}&nbsp;|&nbsp;</span>
					<span>{{trip.seatcodeCn}}</span>
				</div>
				<div class="trip_info">
					<div class="trip_dep">
						<span class="trip_date">{{trip.depdate}}</span>
						<span class="trip_time">{{trip.deptime.substring(0,2)+':'+trip.deptime.substring(2,4)}}</span>
						<span class="trip_airport">{{trip.depairdrome}}{{trip.depTerminal}}</span>
					</div>
					<div class="arrow">
						<i class="icon iconfont icon-jiantouyou"></i>
					</div>
					<div class="trip_arr">
						<span class="trip_date">{{trip.arrdate}}</span>
						<span class="trip_time">{{trip.arrtime.substring(0,2)+':'+trip.arrtime.substring(2,4)}}</span>
						<span class="trip_airport">{{trip.arrairdrome}}{{trip.arrTerminal}}</span>
					</div>
				</div>
			</div>			
			<div class="trip_price">
				机票价：<em>￥{{trip.price}}&nbsp;</em>&nbsp;|&nbsp;
				基建费：<em>￥{{trip.buildfee}}</em>&nbsp;/人
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.trip_box {
		margin: .22rem .20rem 0 .20rem;
		padding: .14rem .14rem 0;
		border-radius: .06rem;
		background-color: #ffffff;
		.trip_hd {
			line-height: .62rem;
			padding-left: .10rem;
			border-bottom: 1px solid #dddddd;
			.trip_city {
				font-size: .32rem;
			}
			.trip_change {
				color: #32abfb;
			}
		}
		.trip_cont {
			border-bottom: 1px dashed #dddddd;
			.trip_no {
				line-height: .60rem;
				img {
					display: inline-block;
    				vertical-align: -.04rem;
					width: .30rem;
					height: .30rem;
				}
			}
			.trip_info {
				display: flex;
				.trip_dep {
					flex: 3.5;
					text-align: right;
					span {
						display: block;
					}
				}
				.trip_arr {
					flex: 3.5;
					text-align: left;
					span {
						display: block;
					}
				}
				.arrow {
					flex: 2;
					margin: 0 .20rem;
					position: relative;
					text-align: center;
					i {
						vertical-align: -.4rem;
					    color: #bbbbbb;
					}
				}
				.trip_date {
					color: #666666;
				}
				.trip_time {
					line-height: .40rem;
					font-size: .30rem;
				}
				.trip_airport {
					padding-bottom: .20rem;
				}
			}
		}		
		.trip_price {
			line-height: .60rem;
			text-align: left;
			padding-left: .20rem;
			em {
				color: #ee3633;
			}
		}
	}
</style>
<script>
	import configUrl from '../../data/configUrl'
	export default {
		props: {
			tripList: {
				type: Array
			}
		},
		computed: {
			imgPrifx () {
		      	return configUrl.imgPath
		    },
		    sourceId () {
		    	return this.$route.query.sourceId
		    }
		},
		methods: {
			showTip (sourceId, airways, depCityCode, arrCityCode, depdate, fareitemid, seatcode) {
		        this.$emit('show-tip', sourceId, airways, depCityCode, arrCityCode, depdate, fareitemid, seatcode)
		    }
		}
	}
</script>
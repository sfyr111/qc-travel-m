<template>
	<div class="hotel_check_info bg_ff">
		<ul>
			<li>
				<div class="border-bottom-dashed border ver-center clearfix">
					<span class="fl color_66 ver-center">房间数</span>
					<div class="fl middle bsizing">{{roomNum}}间</div>
					<span class="fr"><i class="icon iconfont">&#xe65e;</i></span>

					<select v-model="roomNum" @change="selectRoomNum">
						<option :value="$index" v-for="$index in num">{{ $index }}</option>
					</select>
				</div>
			</li>
			<li>
				<div class="border-bottom-dashed border" v-for="(item, index) in livePerson" :key="index">
					<dl class="clearfix">
						<label>
							<dt class="fl color_66 ver-center">入住人</dt>
							<dd class="fl middle bsizing">
								<input :value="item.name" @blur="inputBlur(index, $event)">
							</dd>
						</label>
					</dl>
				</div>
			</li>
			<li>
				<div class="border-bottom-dashed border ver-center clearfix">
					<label>
						<span class="fl color_66 ver-center">联系电话</span>
						<div class="fl middle bsizing">
							<input type="number" v-model="phone">
						</div>
					</label>
				</div>
			</li>
		</ul>

		<!-- 选择房间数弹层 -->
		<!-- <div class="select_room_num none">
			<ul>
				<li v-for="$index in 5" class="clearfix ver-middle">
					{{ $index }}
					<span class="ver-middle">
						<i class="icon iconfont">&#xe664;</i>
					</span>
				</li>
			</ul>
		</div> -->
	</div>
</template>

<style lang="less">
.hotel_check_info {
	margin-bottom: .2rem;
	
	ul:first-of-type{
		li {
			padding: 0 .48rem;
			font-size: .26rem;
			
			input {
				width: 100%;
				height: .86rem;
			}

			select {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
			.ver-center {
				height: .86rem;
			}

			span.color_66, dt.color_66{
				width: 1.2rem;
				height: .86rem;
			}

			.middle{
				width: 5rem;
				padding: 0 .2rem;
			}

			.fr{
				width: .68rem;
				text-align: right;
			}
		}

		li:last-child .ver-center:before{
			display: none;
		}
	}

	.select_room_num{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		z-index: 100;

		ul {
			position: absolute;
			bottom: 0;
			left: 0;
			background: #fff;
			width: 100%;

			li {
				height: .7rem;
				text-align: center;
				position: relative;

				span{
					height: .7rem;
					position: absolute;
					top: 0;
					right: .6rem;
				}
			}
		}
	}
}
</style>

<script>
export default {
	props: {
		num: {
			type: Number,
			default: 0
		}
	},
	data () {
		return {
			roomNum: 1,			//	房间数
			livePerson: [{name: ''}],		//	入住人
			phone: ''				//	联系电话
		}
	},

	methods: {
		//	选择房间数
		selectRoomNum () {
			let len = this.livePerson.length

			//	添加入住人
			if (len < this.roomNum) {
				let person = {name: ''}
				for (var i = 0; i < this.roomNum - len; i ++) {
					this.livePerson.push(person)
				}
			}

			//	减少联系人
			if (len > this.roomNum) {
				this.livePerson = this.livePerson.slice(0, this.roomNum)
			}
			this.$emit('select-room-num', this.roomNum)
		},

		inputBlur (index, e) {
			let val = e.target.value
			this.$set(this.livePerson, index, {name: val})
		},

		getlivePersonArr () {
			let push = true
			let arr = []
			this.livePerson.forEach(function (item) {
				if (!item.name) {
					push = false
					return
				}
				arr.push(item.name)
			})

			return {
				arr: arr,
				isComplete: push
			}
		}
	}
}
</script>
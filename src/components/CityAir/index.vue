<template>
  <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
    <div class="box" v-show="show">

      <div class="search_box" :class="{ 'search_keys' : showMask }" @click="mask()">
        <div class="search">
          <i class="icon iconfont icon-sousuo"></i>
          <input class="search_words" type="text" placeholder="中文/全拼/简拼" v-model="key" @input="searchKey()">
          <i v-if="showMask" class="icon iconfont icon-quxiao" @click.stop="clrKeys()"></i>
        </div>
      </div>

      <div v-if="showMask" class="mask" @click="hideBox()"></div>

      <div v-if="key && showMask" class="search_key_list">
        <ul v-if="key && cityQuery && cityQuery.length==0">
          <li><span>无结果</span></li>
        </ul>
        <ul v-if="key && cityQuery && cityQuery.length>0">
          <li v-for="city in cityQuery" @click="selectCity(city)">
            <span>{{city.cityCn || city[1]}}</span>
          </li>
        </ul>
      </div>

      <div class="city_box" v-if="cityList && cityList.length>0">
        <dl class="clearfix city_hot" v-if="cityList[0].div === '热门城市'">
          <dt>{{cityList[0].div}}</dt>
          <dd v-for="(city, index) in cityList[0].info" :class="{ 'active' : city.cityCn == activeCity.cityName || city.name === activeCity.cityName}" @click="selectCity(city)">
            {{city.cityCn || city.name}}
          </dd>
        </dl>
        <dl class="clearfix city" v-for="cityObj in cityList.slice(1, cityList.length)" v-if="cityObj.info && cityObj.info.length>0">
          <dt name="A">
            {{cityObj.div}}
          </dt>
          <dd v-for="(city, index) in cityObj.info" :class="{ 'active' : city.cityCn == activeCity.cityName || city.name === activeCity.cityName }" @click="selectCity(city)">
            <span>{{city.cityCn || city.name}}</span>
          </dd>
        </dl>
      </div>

      <ul class="nav_box" v-if="cityList && cityList.length>0">
        <li v-for="city in cityList" v-if="city.info && city.info.length>0" @click="selectCity(city)">{{city.div.substring(0, 2)}}</li>
      </ul>
    </div>
  </transition>
</template>
<style scoped>
  .box {
    position: absolute;
    top: 0;
    width: 100%;
    min-height: 100%;
    background-color: #e6e6e6;
    z-index: 1000;
  }
  .search_box {
    position: fixed;
    top: 0;
    background-color: #e6e6e6;
  }
  .search {
    margin: .24rem .26rem;
    padding: .20rem;
    width: 6.52rem;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    background-color: #ffffff;
    color: #999999;
  }
  .search input {
    width: 6.00rem;
    height: .3rem;
  }
  .search input::-webkit-input-placeholder { /* WebKit browsers */
     color:#999;
  }
  .search_keys {
    width: 100%;
  }
  .search_keys .search {
    margin: .24rem 0;
    width: 100%;
  }
  .icon-quxiao {
    position: absolute;
    right: .2rem;
  }
  .mask {
    position: fixed;
    top: 1.30rem;
    z-index: 9;
    background-color: #333333;
    opacity: .75;
    width: 100%;
    height: 100%;
  }
  .search_key_list {
    width: 100%;
    max-height: 100%;
    background: #fff;
    position: fixed;
    top: 1.3rem;
    z-index: 99;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

  }
   .search_key_list li:last-child{
    padding-bottom: 1.5rem;
   }
  .search_key_list li {
    padding-left: .28rem;
    height: .74rem;
    line-height: .74rem;
    background-color: #ffffff;
  }
  .search_key_list li span {
    display: inline-block;
    width: 100%;
    border-bottom: 1px solid #cccccc;
  }
  .city_box {
    margin-top: 1.30rem;
  }
  .city_hot {
    background-color: #ffffff;
    padding: .36rem .28rem;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
  }
  .city_hot dt {
    margin-bottom: .2rem;
  }
  .city_hot dd {
    float: left;
    padding: .1rem .2rem;
    width: 1.2rem;
    text-align: center;
  }
  .city_hot dd.active {
    color: #ee3434;
    background-color: #fee5e4;
  }
  .city dt {
    height: .6rem;
    line-height: .6rem;
    padding-left: .28rem;
    background-color: #dddddd;
  }
  .city dd {
    padding-left: .28rem;
    height: .74rem;
    line-height: .74rem;
    background-color: #ffffff;
  }
  .city dd.active {
    color: #ee3434;
  }
  .city dd span {
    display: inline-block;
    width: 100%;
    border-bottom: 1px solid #cccccc;
  }
  .city dd:last-child span {
    border: none;
  }
   dt {
    font-size: .3rem;
  }
  .nav_box {
    position: fixed;
    top: 1.30rem;
    right: .10rem;
    bottom: 0;
    display: flex;
    flex-direction: column;
    min-height: -webkit-calc(100% - 1.20rem);
    color: #1ba1ba;
  }
  .nav_box li {
    width: .80rem;
    text-align: center;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
</style>
<script>
  import { debounce } from 'vux'
	export default {
		props: {
      show: {
      	type: Boolean,
        default: false
      },
      cityList: {
      	type: Array
      },
      cityQuery: {
      	type: Array
      },
      activeCity: {
      	type: Object
      }
    },
    data () {
			return {
        showMask: false,
        key: '',
        inputTimer: null   // 输入请求节流
      }
    },
    methods: {
      selectCity (city) {
      	this.$emit('getCity', city)
        this.hideBox()
      },
      mask () {
      	this.showMask = !this.showMask
      },
      clrKeys () {
        this.key = ''
      },
      hideBox () {
        this.key = ''
        this.showMask = false
      },
      searchKey () {
      	if (!this.key) {
      		return
        }

        if (this.inputTimer) {
          clearTimeout(this.inputTimer)
        }

        this.inputTimer = setTimeout(function () {
          this.$emit('search-key', this.key)
        }.bind(this), 500)
      }
    }
	}
</script>

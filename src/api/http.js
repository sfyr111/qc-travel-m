import $http from 'superagent'
//import store from '../vuex/store'
import { showLoading } from '../components/Loading'
import showTips from '../components/ShowTips'

/**
* 合并对象
* @private
* @method merge
* @param {Object} defaultOptions
* @param {Object} options  
* @return {Object} 返回已合并对象
*/
function merge(defaultOptions, options) {
    if (typeof (options) !== 'object') {
        options = {};
    }
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            defaultOptions[key] = options[key];
        }
    }
    return defaultOptions;
}

var request = {
    /**
    * 从store中获取当前用户的信息，包含token，id，username等
    * @private
    * @method currentUser
    * @return {Object} 用户信息对象
    */
    currentUser: function () {
        return store.state.myAccount
    },
    /**
    * 传入资源名，返回拼接的完整路径
    * @private
    * @method makeUrl
    * @param {Object} endpoint
    * @return {String} url
    */
    makeUrl: function (endpoint) {
        return `${ENV.baseURL}/${endpoint}`
    },
    /**
    * 公用http请求方法，根据参数发起请求，返回promise对象
    * @private
    * @method makeRequest
    * @param {Object} url 
    * @param {Object} options
    * @return {Object} description
    */
    makeRequest: function (url, options) {
        var devAuthInfo;
        var defaultOptions = {
            url: url,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                'Accept': 'application/json'
            }
        }
        //本地开发环境下为每个请求添加webLappToken进行通信
        if(process.env.NODE_ENV !== 'production' && localStorage.getItem('auth')){
            devAuthInfo = JSON.parse(localStorage.getItem('auth'))
        }
        
        var params = merge(defaultOptions, options || {})

        //如果需要传输数据
        if (options && options.data) {
            params.data = options.data
        }
        //如果需要认证
        if (options && options.needAuth) {
            delete params.needAuth
            var u = this.currentUser()
            params.headers['Authentication-Token'] = u.authentication_token
        }
        //需要全局loading
        if (options && options.loading) {
            console.info(`start loading ${params.url}`)
            showLoading(true)
        }
        return new Promise(function (resolve, reject) {
            var httpClient = $http[params.type.toLowerCase()](params.url)
            if(params.headers){
                httpClient.set(params.headers)
            }
            if(params.type.toLowerCase() == 'get' && params.data){
                httpClient.query(params.data)
            }
            if(params.type.toLowerCase() != 'get' && params.data){
                httpClient.send(params.data)
            }
            //如果是本地localhost环境则为每个请求加上webtoken等信息
            if(devAuthInfo){
                httpClient.query(devAuthInfo)
            }
            httpClient.end(function (err, res) {
                console.info(`stop loading ${params.url}`)
                showLoading(false)
                if (err) {
                   //如果有传入错误提示
                   options.errMsg ? showTips(options.errMsg) : void(0)
                   return reject(err); 
                }
                //console.log(res.body)
                resolve(res);
            })
        })
    },
    /**
    * 模块入口,组装url,发起请求
    * @private
    * @method fetch
    * @param {Object} endpoint 资源名
    * @param {Object} options  请求方法等
    * @return {Object} description
    */
    fetch: function (url, options) {
        //如果urlAssemble为false, 则不组装url前缀
        /*if(options && options.urlAssemble === false){
            return this.makeRequest(`${ENV.serverRootUrl}${endpoint}`, options)
        }*/
        return this.makeRequest(url, options)
    }
}


export default request
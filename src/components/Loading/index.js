import loadingSvg from '../../assets/loading.svg'


/**
* 判断一个元素是否显示
* @private
* @method isVisible
* @param {Object} elem 原生element对象
* @return {Boolean} true/false 
*/
function isVisible(elem) {
  return elem.offsetWidth > 0 || elem.offsetHeight > 0;
}

/**
* 切换loading动画
* @private
* @method function
* @param {Object} show 是否显示
*/
export function showLoading(show) {
    var loading = document.getElementById('loading')
    if (!loading) {
        loading = document.createElement('img');
        loading.id = 'loading';
        loading.className = 'loading';
        loading.src = loadingSvg
        document.body.appendChild(loading)
    }
    showLoading = function (show) {
        //已经显示
        if (show && isVisible(loading)) {
            return
        } 
        //未显示
        if (show && !isVisible(loading)) {
            return loading.style.display = 'block';
        }
        //隐藏
        loading.style.display = 'none';
        
    }
    showLoading(show)
}

import vue from 'vue'


export default vue.directive('scroll-bottom', {
    timer: null,
    checkBottom: function (throttle, distance, loadMore) {
		throttle = throttle || 300
		distance = distance || 30
        if (this.timer) {
            clearTimeout(this.timer)
        }
        
        var self = this
        this.timer = setTimeout(function() {
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
                clientHeight = document.documentElement.clientHeight,
                bodyHeight = document.body.scrollHeight;

            //滚动到底部
            if (bodyHeight - clientHeight - scrollTop < distance) {
            		console.log('底部了')
                    loadMore()
               	//self.vm && self.vm.$dispatch('scrollBottom');
            }
        }, throttle)
    },
    bind: function (el, binding, vnode) {
      document.addEventListener('scroll', function () {
      	binding.def.checkBottom(binding.value.throttle, binding.value.distance, binding.value.loadMore)
      }, false)
    },
    unbind: function (el, binding) {
    	console.log('unbind')
        document.removeEventListener('scroll', binding.def.checkBottom, false);
    }
})
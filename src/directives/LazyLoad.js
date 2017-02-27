/*eslint-disable */
import vue from 'vue'


export default vue.directive('lazy-load', {
    clientHeight: document.documentElement.clientHeight,
    timer: null,
    isInit: true,
    elArr: [],
    imgLoadStyle: [
        'width& .5rem',
        'height& .5rem',
        'position& absolute',
        'top& 50%',
        'left& 50%',
        'transform& translate(-50%, -50%)',
        '-webkit-transform& translate(-50%, -50%)',
        'background& url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ3aGl0ZSI+CiAgPHBhdGggb3BhY2l0eT0iLjI1IiBkPSJNMTYgMCBBMTYgMTYgMCAwIDAgMTYgMzIgQTE2IDE2IDAgMCAwIDE2IDAgTTE2IDQgQTEyIDEyIDAgMCAxIDE2IDI4IEExMiAxMiAwIDAgMSAxNiA0Ii8+CiAgPHBhdGggZD0iTTE2IDAgQTE2IDE2IDAgMCAxIDMyIDE2IEwyOCAxNiBBMTIgMTIgMCAwIDAgMTYgNHoiPgogICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGZyb209IjAgMTYgMTYiIHRvPSIzNjAgMTYgMTYiIGR1cj0iMC44cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+CiAgPC9wYXRoPgo8L3N2Zz4K) no-repeat',
        'background-size& contain'
    ],
    setImgSrc: function (el, src) {
        if(el.getBoundingClientRect().top >= 0 - el.offsetHeight / 2 && el.getBoundingClientRect().top <= this.clientHeight  -  el.offsetHeight / 2){
            let span = document.createElement('span')
            let img = document.createElement('img')
            for(var i = 0; i < this.imgLoadStyle.length; i ++){
                var loadStyle = this.imgLoadStyle[i].split('&')
                span.style[loadStyle[0]] = loadStyle[1]
            }
            
            
            el.appendChild(span)
            setTimeout(function () {
              img.src = src
              el.appendChild(img)
            }, 500)
            
            img.onload = function(){
                el.isLoad = true
                setTimeout(function(){
                    span.style.display = 'none'
                }, 100)
            }
        }
    },
    lazyLoad: function (el, src) {
      var self = this
      if(this.def.timer){
          clearTimeout(this.def.timer)
      }
     
      this.def.timer = setTimeout(function(){
          for (var i = 0; i < self.def.elArr.length; i ++) {
              var el = self.def.elArr[i].el
              if (el.isLoad) {
                  continue;
              }
              var src = self.def.elArr[i].src
              self.def.setImgSrc(el, src)
          }
      }, 300)
    },
    bind: function (el, binding, vnode) {
      //console.log(binding.def.elArr.length)
      //  如果加载完成
      console.log(binding.value.isInit)
      let opt = {
        el: el,
        src: binding.value.src
      }
      binding.def.elArr.push(opt)
      

      if(binding.def.isInit){
          	binding.def.lazyLoad.bind(binding)()
          	binding.def.isInit = false
      }
      window.addEventListener('scroll', binding.def.lazyLoad.bind(binding), false)
    },
    unbind: function (el, binding, vnode) {
        console.log('unbind')
        binding.def.isInit = true
         binding.def.elArr = []
        window.removeEventListener('scroll', binding.def.lazyLoad, false);
    }
})
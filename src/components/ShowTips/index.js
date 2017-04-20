let timer = null

export default function (str, delay) {
	delay = delay ? delay : 2000
	let showTips = document.getElementById('showtips')
	
	if (!showTips) {
		showTips = document.createElement('div')
		showTips.id = 'showtips'
		var style = {
				background: 'black',
				padding: '.2rem .4rem',
				color: '#fff',
				position: 'fixed',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				'-webkit-transform': 'translate(-50%, -50%)',
				'border-radius': '5px',
				'z-index': '10000',
				'font-size': '.28rem',
				background: 'rgba(0,0,0,.7)'
		}
		var keyArr = Object.keys(style)
		for (var i = 0; i < keyArr.length; i ++) {
			showTips.style[keyArr[i]] = style[keyArr[i]]
		}
		
		document.body.appendChild(showTips)
	} else {
		showTips.style.display = 'block'
	}

	if (timer) {
		clearTimeout(timer)
	}

	showTips.innerHTML = str

	timer = setTimeout(function () {
		showTips.style.display = 'none'
	}, delay)
}
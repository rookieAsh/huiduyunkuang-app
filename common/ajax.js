import webUrl from './url.js'
const ajax = (url, data, successCallback,failCallBack,type="POST") => {
	var token = uni.getStorageSync('token');
     data.token = token;
	 uni.request({
		url: webUrl.webUrl + url,
		data: data,
		method: type || 'POST',
		dataType: 'json',
		header: {
			"x-requested-with":"XMLHttpRequest",
			"content-type": "application/x-www-form-urlencoded",
			"token": token
		},
		success: (res) => {
			// console.log(url+"--->"+JSON.stringify(data)+"--->"+JSON.stringify(res.data));
			var code = res.data.state;
			if (code == 0 || code==1 || code==2) {
				successCallback(res.data);
			}else if(code==undefined){
				successCallback(res.data);
			}else {
				uni.showToast({
					title: res.data.message,
					icon: "none",
					duration: 2000
				})
				if(failCallBack){
					failCallBack(res.data);
				}
			}
		},
		fail: () => {
			// this.$tools.toast('连接失败,请稍后再试');
		}
	})
}
export default ajax

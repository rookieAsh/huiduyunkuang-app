	
	import webUrl from './url.js'
	
	export const appUpload = ()=>{
		uni.request({
			url: webUrl.webUrl + '/register/appUpdateInfomation',
			method: 'POST',
			dataType: 'json',
			header: {
				"x-requested-with":"XMLHttpRequest",
				"content-type": "application/x-www-form-urlencoded",
				"token": uni.getStorageSync('token')
			},
			success: (res) => {
				console.log(res)
				var code = res.data.state;
				console.log(code)
				if (code == 0) {
					plus.runtime.getProperty(plus.runtime.appid, function(inf) {
						if(res.data.data.version != inf.version){
							var androidLink = res.data.data.version_link;
							var iosLink = res.data.data.iphone_link;
							uni.getSystemInfo({
							    success: function (res) {
							        if(res.platform == "android") {
										downWgt(androidLink)
									}else{
										downWgt(iosLink)
									}
							    }
							});
							
						}
					})
				}	
			}
		})
	}
	export const downWgt = (downloadWgtUrl)=> {
		// w = plus.nativeUI.showWaiting("更新文件...");
		//热更包的url地址
		uni.showLoading({
			title:'更新版本...',
			mask: true
		})
		console.log(downloadWgtUrl)
		var wgtOption = {};
		var dtask = plus.downloader.createDownload(downloadWgtUrl, wgtOption, function(d, status) {
			console.log('开始下载...');
			// 下载完成
			if (status == 200) {
			
			} else {
				showToast("更新失败!请稍后再试!" + status)	
			}
		});
		
		dtask.addEventListener("statechanged", function(task, status) {
			switch (task.state) {
				case 1: // 开始
					console.log("开始下载...");
					break;
				case 2: // 已连接到服务器
					console.log("链接到服务器...");
					break;
				case 3: // 已接收到数据                                
					var a = Math.floor(task.downloadedSize / task.totalSize * 100) + '%';
					//console.log(a)
					// document.getElementById('demo1').style.width = a
					break;
				case 4: // 下载完成
					console.log("下载完成！");
					install(task);
					break;
			}
		}, false);
		dtask.start();
	}
	
  const install = (task)=> {
		plus.runtime.install(task.filename, {
			force: true
		}, function() {
			uni.hideLoading();
			uni.showModal({
			    title: '提示',
			    content: '更新完毕，将重启应用',
				showCancel:false,
			    success: function (res) {
			        // w.close();
			        plus.runtime.restart();
			    }
			});
		}, function(err) {
			showToast(err.message)
		});
}

const tools = {};
// 后退
tools.back = (step) => {
	uni.navigateBack({
		delta: step
	});
};

// 成功执行后返回
tools.setTimeout = (val) =>{
	setTimeout(()=>{
		uni.navigateBack({
			delta: 1
		});
	},val)
};

// 复制
tools.copy=(val)=>{
	uni.setClipboardData({
		data:val,
		success() {
			uni.showToast({
				title: '复制成功',
				duration:2000,
				icon:"none"
			})
		}	
	})
}

// 未登录状态跳转
tools.goNavigiteTo=(path)=>{
	var token = uni.getStorageSync('token');
	if(!token) {
		uni.showToast({
			title:"用户未登录，请先登录",
			icon:"none",
			duration:1500
		})
		setTimeout(()=>{
			uni.navigateTo({
				url:'../login/login'
			})
		},1500)
		
	}else {
		uni.navigateTo({
			url:path
		})	
	}
}

//暂未开放
tools.noOpen=(val)=>{
    uni.showToast({
        title: val,
        duration:2000,
        icon:"none"
    })
}

//弹出消息
tools.toast=(val)=>{
	uni.showToast({
		title:val,
		icon:"none",
		duration:2000
	})
}

//页面跳转
tools.jump=(path,value1,value2,value3)=>{
	uni.navigateTo({
		url:path+'?='+'&value1='+value1+'&value2='+value2+'&value3='+value3
	})
}

//跳转到 tabBar页面
tools.jumpTo=(path)=>{
	uni.switchTab({
		url:path
	})
}


//将时间戳转化为固定格式
tools.formatTime = (value,type) => {
	var dataTime="";
    var data = new Date();
    data.setTime(value);
    var year   =  data.getFullYear();
    var month_temp=data.getMonth()+1;
    var month  =  month_temp<10?'0'+month_temp: month_temp;
    var day    =  data.getDate()<10?'0'+data.getDate(): data.getDate();
    var hour   =  data.getHours()<10?'0'+data.getHours(): data.getHours();
    var minute =  data.getMinutes()<10?'0'+data.getMinutes(): data.getMinutes();
    var second =  data.getSeconds()<10?'0'+data.getSeconds(): data.getSeconds();
    if(type == "YMD"){
        dataTime =  year + "-"+ month + "-" + day;
    }else if(type == "YMDHMS"){
        dataTime = year + "-"+month + "-" + day + " " +hour+ ":"+minute+":" +second;
    }else if(type == "HMS"){
        dataTime = hour+":" + minute+":" + second;
    }else if(type == "YM"){
        dataTime = year + "-" + month;
    }
    return dataTime;//将格式化后的字符串输出到前端显示
}
tools.formatTime2=(value)=>{
	var timeValue=value.replace(/-/g,"/");
	var T_pos = timeValue.indexOf('T');
	var year_month_day = timeValue.substr(0,T_pos);
	var hour_minute_second = timeValue.substr(T_pos+1,8);
	var new_datetime = year_month_day+" "+hour_minute_second;
	var dateee = new Date(new_datetime).toJSON();
	var sjc=new Date(dateee).getTime();
	var chinaT=sjc+8*3600*1000;
	var date=tools.formatTime(chinaT,'YMDHMS');
	return date;
},

//保留小数点
tools.number = (value,type) => {
    if(value==null || value==''){
        value=0;
    }
    //处理科学计数法
    value=value.toFixed(8);
    var arr=(value+"").split(".");
    var a1=arr[0];
    var a2=0;
    if(arr.length>1){
        a2=arr[1];
        if(a2.length>type){
            a2=a2.substring(0,type);
        }
    }
    value= Number(a1+"."+a2);
    return Number(value).toFixed(type)
}

tools.prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

export default tools


import Vue from 'vue'

 Vue.filter('formatTime',(value,type) => {
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
}) 

  Vue.filter('number',(value,type) => {
    if(value==null ||value==''){
        value=0;
    }
	value=parseFloat(value);
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
})  


 Vue.filter('number2',(value,type) => {
    if(value==null ||value==''){
        value=0;
    }
	value=parseFloat(value);
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
})  


//隐藏手机号
Vue.filter('conceal',(tel)=>{
	return tel.substring(0, 3)+"****"+tel.substr(tel.length-4);
})


//隐藏邮箱
Vue.filter('hideEmailInfo',(email)=>{
	if (String (email).indexOf ('@') > 0) {
	    let newEmail, str = email.split('@'), _s = '';
	
	    if (str[0].length > 4) {
	        _s = str[0].substr (0, 4);
	        for (let i = 0; i < str[0].length - 4; i++) {
	            _s += '*';
	        }
	    } else {
	        _s = str[0].substr (0, 1);
	        for (let i = 0; i < str[0].length - 1; i++) {
	            _s += '*';
	        }
	    }
	    newEmail = _s + '@' + str[1];
	    return newEmail;
	} else {
	    return email;
	}
})

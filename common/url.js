
//const IP= "192.168.2.8:8081";  //本地
//const IP= "47.241.93.117:8081";  //测试 正式
const IP= "www.grayclouds.cn";
var ISHTTPS = true;

const webUrl = (ISHTTPS?'https://':'http://') + IP;
const websocketUrl = (ISHTTPS?'wss://':'ws://') + IP;
const slideURL = webUrl+"/search/downloadSlide?id=";
const currnecyURL = webUrl+"/search/currencyById?id=";
const currnecyNameURL = webUrl+"/search/currencyByName?name=";
const basePthURL = webUrl+"/search/download?path=";
export default { 
	webUrl:webUrl,
	websocketUrl:websocketUrl,
	slideURL:slideURL,
	currnecyURL:currnecyURL,
	currnecyNameURL:currnecyNameURL,
	basePthURL:basePthURL,
}




webpackJsonp([0],{"+E39":function(e,t,n){e.exports=!n("S82l")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},"+ZMJ":function(e,t,n){var r=n("lOnJ");e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)}}return function(){return e.apply(t,arguments)}}},"77Pl":function(e,t,n){var r=n("EqjI");e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},"7KvD":function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},"9bBU":function(e,t,n){n("mClu");var r=n("FeBl").Object;e.exports=function(e,t,n){return r.defineProperty(e,t,n)}},C4MV:function(e,t,n){e.exports={default:n("9bBU"),__esModule:!0}},D2L2:function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},EqjI:function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},FeBl:function(e,t){var n=e.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n)},MmMw:function(e,t,n){var r=n("EqjI");e.exports=function(e,t){if(!r(e))return e;var n,i;if(t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;if("function"==typeof(n=e.valueOf)&&!r(i=n.call(e)))return i;if(!t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},ON07:function(e,t,n){var r=n("EqjI"),i=n("7KvD").document,s=r(i)&&r(i.createElement);e.exports=function(e){return s?i.createElement(e):{}}},S82l:function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},SfB7:function(e,t,n){e.exports=!n("+E39")&&!n("S82l")(function(){return 7!=Object.defineProperty(n("ON07")("div"),"a",{get:function(){return 7}}).a})},"Ve+o":function(e,t){},X8DO:function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},YDJp:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,i=n("bOdI"),s=n.n(i),o=n("mvHQ"),a=n.n(o),c={data:function(){return{socketUrl:"ws://47.75.214.188:8157/websocket/trade",tradeId:7,websocket:"",init:!0,currencyQuantity:0,currencyTradeQuantity:0,currencyId:"",currencyName:"",currencyTradeId:0,currencyTradeName:"",sellQuantity:0,currentPrice:0,tradeMaxPrice:0,tradeMinPrice:0,showEncyMoeny:0,rise:"0.00",tradeNums:0,tradeMoney:0,coin:"",interval:5,_datafeed:"",_configuration:"",_symbolSearch:"",_symbolsStorage:"",_barsPulseUpdater:"",_quotesPulseUpdater:"",_enableLogging:"",_initializationFinished:"",_callbacks:"",websocketCallable:[],_requestsPending:0,_exchangesList:[],_exchangesWaitingForData:{},_exchangesDataCache:{},_symbolsInfo:{},_symbolsList:[],_subscribers:[],chart:"",submitType:1,submitPrice:0,submitQuantity:0,cancelId:"",encyMoeny:1,digits:2,trade_timer:"",k_timer:"",list:"",collectList:[]}},mounted:function(){this.socket(),document.title=this.$route.query.name;var e=this.$route.query.using;void 0!=e&&""!=e&&(this.tradeId=e)},beforeDestroy:function(){this.clearTime(),this.websocket.close()},methods:(r={getUni:function(e){0==e?(uni.postMessage({data:{tradeType:0,tradeVer:"买入",data:"1",tradeId:this.tradeId}}),uni.switchTab({url:"/pages/trade/trade"})):(uni.postMessage({data:{tradeType:1,tradeVer:"卖出",data:"2",tradeId:this.tradeId}}),uni.switchTab({url:"/pages/trade/trade"}))},back:function(){this.$router.push("/home/contract")},clearTime:function(){window.clearInterval(this.trade_timer),window.clearInterval(this.k_timer)},initallinfo:function(e){this.tradeId=e,this.initAll(),this.initK()},getNum:function(e,t){var n=(e+"").split("."),r=n[0],i=0;return n.length>1&&(i=n[1]).length>t&&(i=i.substring(0,t)),Number(r+"."+i)},getNumByDist:function(e){for(var t="0.",n=0;n<e-1;n++)t+="0";return Number(t+="1")},getParameterByName:function(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(location.search);return null===t?"":decodeURIComponent(t[1].replace(/\+/g," "))},setTradeTime:function(){var e=this;this.trade_timer=setInterval(function(){e.getTradeInfo()},1e3)},getTradeInfo:function(){var e={method:"trade"};e.tradeId=this.tradeId,this.send(a()(e))},socket:function(){"WebSocket"in window?this.websocket=new WebSocket(this.socketUrl):this.$tool.message({message:"Not support websocket"}),this.websocket.onerror=this.onerror,this.websocket.onopen=this.onopen,this.websocket.onmessage=this.onmessage,this.websocket.onclose=this.onclose},onopen:function(){console.log("WebSocket连接成功"),this.getTradeInfo(),this.initK(),this.setTradeTime()},onerror:function(){console.log("WebSocket连接失败")},onmessage:function(e){var t=e.data;0==(t=this.parseJSONorNot(t)).code?(this.websocketCallable.shift()(t),t=this.parseJSONorNot(t)):1==t.code?this.showTradeData(t):2==t.code||3==t.code||t.code},onclose:function(){console.log("WebSocket连接关闭")},send:function(e,t){t&&this.websocketCallable.push(t),this.websocket.send(e)},showTradeData:function(e){if(1==(e=this.parseJSONorNot(e)).code){this.buyList=e.obj.buyList,this.sellMax=e.obj.sellMax,this.buyMax=e.obj.buyMax,this.sellList=e.obj.sellList.reverse(),this.recordList=e.obj.recordList;var t=e.obj.tradeInfo;this.currentPrice=t.currentPrice,this.showEncyMoeny=t.showEncyMoeny,this.rise=t.rise,this.tradeMoney=t.tradeMoney,this.coin=t.con,"ECNY"!=this.currencyName&&(this.encyMoeny=t.encyMoeny)}else this.$tool.message({message:e.msg})},initK:function(){this._datafeed=this.UDFCompatibleDatafeed(1e3);document.body.clientWidth||document.documentElement.clientWidth;var e=this;this.onReady(function(t){e.chart=window.widget=new TradingView.widget({symbol:e.tradeId,interval:e.interval,container_id:"tv_chart_container",datafeed:e._datafeed,library_path:"./static/js/charting_library/",custom_css_url:"chart.css",locale:"zh",timezone:"Asia/Shanghai",theme:"Light",width:"100%",height:"100%",fullscreen:!1,drawings_access:{type:"white",tools:[{name:"Regression Trend"}]},disabled_features:["save_chart_properties_to_local_storage","chart_crosshair_menu","header_symbol_search","header_screenshot","volume_force_overlay","timeframes_toolbar"," header_widget_dom_node","control_bar","header_settings","symbol_info","header_compare","right_bar_stays_on_scroll","context_menus","edit_buttons_in_legend"],enabled_features:["property_pages"],client_id:"ehgex.com",user_id:"public_user_id",widgetbar:{details:!0},toolbar_bg:"#131e31",loading_screen:{backgroundColor:"#131e31"},hide_top_toolbar:"true",studies_overrides:{"volume.volume.color.0":"#6ba583","volume.volume.color.1":"#d75442","volume.volume.transparency":75},overrides:{"paneProperties.legendProperties.showLegend":!1,"paneProperties.bottomMargin":5,"paneProperties.topMargin":12,volumePaneSize:"small","paneProperties.background":"#131e31","paneProperties.vertGridProperties.color":"rgba(255,255,255,.08)","paneProperties.horzGridProperties.color":"rgba(255,255,255,.08)","symbolWatermarkProperties.transparency":90,"scalesProperties.textColor":"rgba(255,255,255,.8)","mainSeriesProperties.candleStyle.drawBorder":!1,"mainSeriesProperties.candleStyle":{upColor:"#6ba583",downColor:"#d75442",drawWick:!0,drawBorder:!1,borderColor:"#131e31",borderUpColor:"#131e31",borderDownColor:"#d75442",wickColor:"#1c2630",wickUpColor:"#6ba583",wickDownColor:"#d75442",barColorsOnPrevClose:!1}}}),widget.onChartReady(function(){widget.chart().createStudy("Moving Average Exponential",!1,!1,[5],null,{"Plot.color.0":"#ff9500","Plot.linewidth":2}),widget.chart().createStudy("Moving Average",!1,!1,[10],null,{"Plot.color.0":"#b92e5d","Plot.linewidth":2}),widget.chart().createStudy("Moving Average",!1,!1,[20],null,{"Plot.color.0":"#b4ad14","Plot.linewidth":2}),widget.chart().createStudy("Moving Average",!1,!1,[60],null,{"Plot.color.0":"#107efa","Plot.linewidth":2})})})},parseJSONorNot:function(e){return"string"==typeof e?JSON.parse(e):e},UDFCompatibleDatafeed:function(e){return this._configuration=void 0,this._symbolSearch=null,this._symbolsStorage=null,this._barsPulseUpdater=this.DataPulseUpdater(this,e||1e4),this._quotesPulseUpdater=this.QuotesPulseUpdater(this),this._enableLogging=!1,this._initializationFinished=!1,this._callbacks={},this._initialize(),this},_initialize:function(){this._setupWithConfiguration(this.defaultConfiguration())},defaultConfiguration:function(){return{supports_search:!0,supports_group_request:!1,supported_resolutions:["1","5","15","30","60","D","W"],supports_marks:!1,supports_timescale_marks:!1}},_setupWithConfiguration:function(e){this._configuration=e,e.exchanges||(e.exchanges=[]);var t=e.supported_resolutions||e.supportedResolutions;e.supported_resolutions=t;var n=e.symbols_types||e.symbolsTypes;if(e.symbols_types=n,!e.supports_search&&!e.supports_group_request)throw new Error("Unsupported datafeed configuration. Must either support search, or support group request");e.supports_search||(that._symbolSearch=that.SymbolSearchComponent(this)),e.supports_group_request?this._symbolsStorage=that.SymbolsStorage(this):this.onInitialized(),this._fireEvent("configuration_ready"),this._logMessage("Initialized with "+a()(e))},onInitialized:function(){this._initializationFinished=!0,this._fireEvent("initialized")},_fireEvent:function(e,t){if(this._callbacks.hasOwnProperty(e)){for(var n=this._callbacks[e],r=0;r<n.length;++r)n[r](t);this._callbacks[e]=[]}},_logMessage:function(e){if(this._enableLogging)new Date},onReady:function(e){var t=this;this._configuration?setTimeout(function(){e(t._configuration)},0):this.on("configuration_ready",function(){e(t._configuration)})},on:function(e,t){return this._callbacks.hasOwnProperty(e)||(this._callbacks[e]=[]),this._callbacks[e].push(t),this},_send:function(e,t,n){t.method=e;var r=a()(t);console.log(r),this.send(r,n)},SymbolsStorage:function(e){this._datafeed=e,this._exchangesList=["NYSE","FOREX","AMEX"],this._exchangesWaitingForData={},this._exchangesDataCache={},this._symbolsInfo={},this._symbolsList=[],this._requestFullSymbolsList()},resolveSymbol:function(e,t,n){var r=this;setTimeout(function(){r._symbolsInfo.hasOwnProperty(e)?t(r._symbolsInfo[e]):n("invalid symbol")},0)},SymbolSearchComponent:function(e){this._datafeed=e},searchSymbols:function(e,t){if(!this._datafeed._symbolsStorage)throw new Error("Cannot use local symbol search when no groups information is available");for(var n=this._datafeed._symbolsStorage,r=[],i=!e.searchString||0===e.searchString.length,s=e.searchString.toUpperCase(),o=0;o<n._symbolsList.length;++o){var a=n._symbolsList[o],c=n._symbolsInfo[a];if(!(e.type&&e.type.length>0&&c.type!==e.type)&&!(e.exchange&&e.exchange.length>0&&c.exchange!==e.exchange)){var u=c.name.toUpperCase().indexOf(s),l=c.description.toUpperCase().indexOf(s);if(i||u>=0||l>=0){for(var d=!1,h=0;h<r.length;h++)if(r[h].item===c){d=!0;break}if(!d){var f=u>=0?u:8e3+l;r.push({item:c,weight:f})}}}}e.onResultReadyCallback(r.sort(function(e,t){return e.weight-t.weight}).map(function(e){var t=e.item;return{symbol:t.name,full_name:t.full_name,description:t.description,exchange:t.exchange,params:[],type:t.type,ticker:t.name}}).slice(0,Math.min(r.length,t)))},DataPulseUpdater:function(e,t){this._datafeed=e,this._subscribers={},this._requestsPending=0;var n=this;void 0!==t&&t>0&&(this.k_timer=setInterval(function(){if(!(n._requestsPending>0))for(var e in n._subscribers){var t=n._subscribers[e],r=t.resolution,i=parseInt((new Date).valueOf()/1e3),s=i-n.periodLengthSeconds(r,10);n._requestsPending++,function(t){n.getBars(t.symbolInfo,r,s,i,function(r){if(n._requestsPending--,n._subscribers.hasOwnProperty(e)&&0!==r.length){var i=r[r.length-1];if(isNaN(t.lastBarTime)||!(i.time<t.lastBarTime)){var s=t.listeners;if(!isNaN(t.lastBarTime)&&i.time>t.lastBarTime){if(r.length<2)throw new Error("Not enough bars in history for proper pulse update. Need at least 2.");for(var o=r[r.length-2],a=0;a<s.length;++a)s[a](o)}for(t.lastBarTime=i.time,a=0;a<s.length;++a)s[a](i)}}},function(){n._requestsPending--})}(t)}},t))},unsubscribeDataListener:function(e){this._datafeed._logMessage("Unsubscribing "+e),delete this._subscribers[e]},subscribeDataListener:function(e,t,n,r){this._datafeed._logMessage("Subscribing "+r),this._subscribers.hasOwnProperty(r)||(this._subscribers[r]={symbolInfo:e,resolution:t,lastBarTime:NaN,listeners:[]}),this._subscribers[r].listeners.push(n)},periodLengthSeconds:function(e,t){return 24*("D"===e?t:"M"===e?31*t:"W"===e?7*t:t*e/1440)*60*60},QuotesPulseUpdater:function(e){this._datafeed=e,this._subscribers={},this._updateInterval=6e4,this._fastUpdateInterval=1e4,this._requestsPending=0},_updateQuotes:function(e){if(!(this._requestsPending>0)){var t=this;for(var n in this._subscribers){this._requestsPending++;var r=this._subscribers[n];this._datafeed.getQuotes(e(r),function(e,n){return function(r){if(t._requestsPending--,t._subscribers.hasOwnProperty(n))for(var i=0;i<e.length;++i)e[i](r)}}(r.listeners,n),function(e){t._requestsPending--})}}},subscribeBars:function(e,t,n,r,i){this.subscribeDataListener(e,t,n,r,i)},unsubscribeBars:function(e){this.unsubscribeDataListener(e)}},s()(r,"resolveSymbol",function(e,t,n){var r=this;if(r._initializationFinished){var i=Date.now();r._logMessage("Resolve requested"),r._configuration.supports_group_request?r._initializationFinished?r._symbolsStorage.resolveSymbol(e,s,n):this.on("initialized",function(){r._symbolsStorage.resolveSymbol(e,s,n)}):this._send("symbols",{tradeId:r.tradeId},function(e){var t=r.parseJSONorNot(e);t.code&&0!=t.code?n("unknown_symbol"):s(t.obj)})}else this.on("initialized",function(){r.resolveSymbol(e,t,n)});function s(e){var n=e;r.postProcessSymbolInfo&&(n=r.postProcessSymbolInfo(n)),r._logMessage("Symbol resolved: "+(Date.now()-i)),t(n)}}),s()(r,"getBars",function(e,t,n,r,i,s){var o=this;if(n>0&&(n+"").length>10)throw new Error(["Got a JS time instead of Unix one.",n,r]);var a={tradeId:e.ticker.toUpperCase(),resolution:t,from:n,to:r};this._send("kData",a,function(e){var t=o.parseJSONorNot(e),n=0==t.code&&t.obj.length<=0;if(0===t.code||n){var r=t.obj;console.log(t.obj),i(r,{noData:n,nextTime:t.nb||t.nextTime})}else s&&s(t.code)})}),r)},u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"full"},[n("div",{staticClass:"content"},[n("div",{staticClass:"headerInfo increase"},[n("div",{staticClass:"headerInfoLeft "},[n("h3",{staticClass:"total",class:e.rise>=0?"green":"red"},[e._v(e._s(e.currentPrice))]),e._v(" "),n("div",{staticClass:"zdf"},[e._v(" 涨跌幅"),n("span",{class:e.rise>=0?"green":"red"},[e._v(" "+e._s(e.rise)+"%")])])]),e._v(" "),n("div",{staticClass:"headerInfoRight"},[n("div",{staticClass:"labWap"},[n("div",[n("div",{staticClass:"text"},[e._v("高")]),e._v(" "),n("div",{staticClass:"num"},[e._v(e._s(e.tradeMaxPrice))])]),e._v(" "),n("div",[n("div",{staticClass:"text"},[e._v("低")]),e._v(" "),n("div",{staticClass:"num"},[e._v(e._s(e.tradeMinPrice))])]),e._v(" "),n("div",[n("div",{staticClass:"text"},[e._v("24H")]),e._v(" "),n("div",{staticClass:"num"},[e._v(e._s(e.tradeNums))])])])])]),e._v(" "),n("div",{attrs:{id:"tv_chart_container"}}),e._v(" "),n("div",{staticClass:"btn-list"},[n("button",{staticClass:"btn btn1",attrs:{type:"button"},on:{click:function(t){e.getUni(0)}}},[e._v("买入")]),e._v(" "),n("button",{staticClass:"btn btn2",attrs:{type:"button"},on:{click:function(t){e.getUni(1)}}},[e._v("卖出")])])])])},staticRenderFns:[]};var l=n("VU/8")(c,u,!1,function(e){n("Ve+o")},"data-v-3df9d7ff",null);t.default=l.exports},bOdI:function(e,t,n){"use strict";t.__esModule=!0;var r,i=n("C4MV"),s=(r=i)&&r.__esModule?r:{default:r};t.default=function(e,t,n){return t in e?(0,s.default)(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},evD5:function(e,t,n){var r=n("77Pl"),i=n("SfB7"),s=n("MmMw"),o=Object.defineProperty;t.f=n("+E39")?Object.defineProperty:function(e,t,n){if(r(e),t=s(t,!0),r(n),i)try{return o(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},hJx8:function(e,t,n){var r=n("evD5"),i=n("X8DO");e.exports=n("+E39")?function(e,t,n){return r.f(e,t,i(1,n))}:function(e,t,n){return e[t]=n,e}},kM2E:function(e,t,n){var r=n("7KvD"),i=n("FeBl"),s=n("+ZMJ"),o=n("hJx8"),a=n("D2L2"),c=function(e,t,n){var u,l,d,h=e&c.F,f=e&c.G,_=e&c.S,p=e&c.P,b=e&c.B,g=e&c.W,v=f?i:i[t]||(i[t]={}),m=v.prototype,y=f?r:_?r[t]:(r[t]||{}).prototype;for(u in f&&(n=t),n)(l=!h&&y&&void 0!==y[u])&&a(v,u)||(d=l?y[u]:n[u],v[u]=f&&"function"!=typeof y[u]?n[u]:b&&l?s(d,r):g&&y[u]==d?function(e){var t=function(t,n,r){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,r)}return e.apply(this,arguments)};return t.prototype=e.prototype,t}(d):p&&"function"==typeof d?s(Function.call,d):d,p&&((v.virtual||(v.virtual={}))[u]=d,e&c.R&&m&&!m[u]&&o(m,u,d)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,e.exports=c},lOnJ:function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},mClu:function(e,t,n){var r=n("kM2E");r(r.S+r.F*!n("+E39"),"Object",{defineProperty:n("evD5").f})},mvHQ:function(e,t,n){e.exports={default:n("qkKv"),__esModule:!0}},qkKv:function(e,t,n){var r=n("FeBl"),i=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return i.stringify.apply(i,arguments)}}});
//# sourceMappingURL=0.48fad36408841019c8ce.js.map
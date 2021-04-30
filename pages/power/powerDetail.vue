<template>
	<view class="page">
		<view class="placeholder50"></view>
		<view class="pic margin0">
			<image src="../../static/images/app/yunsuanli.png" mode=""></image>
		</view>
		<view class="countDowm margin30-0 padding-row30 flex-between align-center">
			<view class="left flex">
				<view class="name">{{ tabIndex == 0 ? 'BTC':'ETH'}}</view>
				<view class="str">现货开挖</view>
			</view>
			
			<view class="flex">
				<u-count-down class="count-down-demo"  :timestamp="timestamp" :separator="separator" :showBorder="showBorder"
				:separator-color="separatorColor" :showDays="showDays" :fontSize="fontSize" @change="change" ref="uCountDown"
				:border-color="borderColor" :color="color" @end="end" bg-color="rgb(250, 250, 250)" :hideZeroDay="hideZeroDay">
				</u-count-down>
				<text style="font-size: 24rpx;color: rgba(0,0,0,0.5);padding-left: 10rpx;">后结束</text>
			</view>
		</view>
		<view class="price padding-row30">￥{{obj.unitprice}}</view>
		<view class="mineName padding-row30">矿机型号：{{obj.name}}</view>
		<view class="time padding-row30">开始挖矿时间：{{obj.mining_time}}</view>
		
		<view class="infoBox margin30-0 padding20">
			<view class="th flex">
				<view class="thLi">算力总量</view>
				<view class="thLi">算力周期</view>
				<view class="thLi">单{{ tabIndex == 0 ? 'T':'M'}}价格</view>
			</view>
			<view class="td flex">
				<view class="tdLi">{{obj.cloud_hashrate}}{{ tabIndex == 0 ? 'T':'M'}}</view>
				<view class="tdLi">{{obj.period}}</view>
				<view class="tdLi">￥{{obj.unitprice}}</view>
			</view>
			<view class="placeholder30"></view>
			<view class="th flex">
				<view class="thLi">矿机机型</view>
				<view class="thLi">电费</view>
				<view class="thLi">平台管理费</view>
			</view>
			<view class="td flex">
				<view class="tdLi ellipsis">{{obj.name}}</view>
				<view class="tdLi">{{obj.electric_charge}}元/KW*h</view>
				<view class="tdLi">{{obj.opera_cost}}%</view>
			</view>
		</view> 
			
		
		
		<view class="checkbox fixed flex align-center">   
			<checkbox-group @change="checkboxChange">
				<checkbox  :checked="checked" color="#F16C00"/>
			</checkbox-group>
			<view class="tip" style="transform: translateY(2rpx);">我已阅读并同意 <text @click="show = true">矿机租赁/购买协议</text></view>
		</view>
		
		<view class="bottomOp flex-between align-center fixed">
			<view class="left flex align-center">
				<text>数量</text>
				<view class="div relative" @click="down()">
					<u-icon name="minus" color="#000" size="26" class="absolute-auto"></u-icon>
				</view>
				<input type="number" placeholder="1" v-model="quantity" placeholder-style="color:#000;font-size:28rpx" disabled/>
				<view class="div relative" @click="quantity++">
					<u-icon name="plus" color="#000" size="30" class="absolute-auto"></u-icon>
				</view>
			</view>
			<view class="btn text-center" @click="giLink()">购买 ￥{{ cost }}</view>
		</view>
		
		<view class="h2 padding30 flex align-center">
			<text :class="{ver:ver==0}" @click="select(0)">产品说明</text>
			<text :class="{ver:ver==1}" @click="select(1)">矿机配置</text>
		</view>
		
		<view class="text padding-row30" v-html="mineConfig.description" v-if="ver==0"></view>
		
		<view class="cnt margin0" v-else>
			<view class="cell_th flex">
					<view class="li">挖矿币种</view>
					<view class="li">{{mineConfig.dig_currency}}</view>
				</view>
				<view class="cell_td flex">
					<view class="li">额定算力</view>
					<view class="li">{{mineConfig.calculate_rating}}</view>
				</view>
				<view class="cell_td flex">
					<view class="li">显卡型号</view>
					<view class="li">{{mineConfig.card_model}}</view>
				</view>
				<view class="cell_td flex">
					<view class="li">显存</view>
					<view class="li">{{mineConfig.video_memory}}</view>
				</view>
				<view class="cell_td flex">
					<view class="li">墙上功耗</view>
					<view class="li">{{mineConfig.power_diss}}KW*h</view>
				</view>
			<!-- 	<view class="cell_td flex">
					<view class="li">电源效率</view>
					<view class="li">2000瓦</view>
				</view> -->
				<view class="cell_td flex">
					<view class="li">外形尺寸</view>
					<view class="li">{{mineConfig.dimensions}}</view>
				</view>
				<view class="cell_td flex">
					<view class="li">整机重量</view>
					<view class="li">{{mineConfig.total_weight}}</view>
				</view>
				<view class="cell_td flex">
					<view class="li">冷却</view>
					<view class="li">{{mineConfig.refrigeration}}</view>
				</view>
				<view class="cell_td flex">
					<view class="li">工作温度</view>
					<view class="li">{{mineConfig.working_tempe}}</view>
				</view>
				<view class="cell_td flex">
					<view class="li">电源连接方式</view>
					<view class="li">{{mineConfig.power_conn_mode}}</view>
				</view>
			<!-- 	<view class="cell_td flex">
					<view class="li">CPU</view>
					<view class="li">Inter(R) Celeron(R) CPU </view>
				</view> -->
				<view class="cell_td flex">
					<view class="li">内存</view>
					<view class="li">{{mineConfig.memory}}</view>
				</view>
				<view class="cell_td flex">
					<view class="li">系统类型</view>
					<view class="li">{{mineConfig.os_type}}</view>
				</view>
				<view class="cell_td flex">
					<view class="li">生产厂家</view>
					<view class="li">{{mineConfig.manufacturer}}</view>
				</view>
		</view>
		
		<u-popup v-model="show" :mask="true" :mode="mode" border-radius="10">
			<view class="popBot">
				<view class="title text-center">矿机／算力租赁（购买）、委托管理服务协议</view>
					<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" >
						<view class="txt">尊敬的用户朋友：</view>
						<view class="text">灰度云矿（以下简称我们）致力于挖矿即服务的信条，使用最新技术提供多算法、多币种的云挖矿服务。通过将矿机／算力出售／租赁给客户，并同步提供矿机／算力委托管理和挖矿维护业务，为客户提供不同规模的加密数字货币挖矿能力的一站式解决方案。</view>
						<view class="text">以下为我们的服务条款，通过您在我们网站平台的操作，我们将共同受到服务条款的约束，通过服务条款建立法律上的权利义务关系。请您先仔细阅读本服务条款内容，充分理解本协议及各条款，尤其是字体加粗部分。如果您对本合约内容有任何疑问，请勿进行下一步操作。</view>
						<view class="text">您使用平台服务、通过网络页面确认或以其他方式接受本协议，即视为您已充分理解本协议所有条款，并同意与我们订立本协议。</view>
						<view class="text">如您在同意订立本协议之前，对本协议内容存在疑虑或异议，请您联系我们，以便我们为您进行解释和说明，使您能够充分理解，从而帮助您自主决定是否接受本协议及是否使用我们的服务。</view>
						
						<view class="text">根据《中华人民共和国合同法》等有关法律、法规的规定，经双方平等、自愿协商，特就客户向灰度云矿租赁（购买）矿机／算力并委托灰度云矿提供托管服务事宜，达成以下一致条款，以供双方共同遵照执行：</view>
						
						<view class="h4">一、矿机的租赁（购买）</view>
						<view class="text">1.1灰度云矿向您提供租赁（购买）委托管理服务的矿机／算力信息见关联订单。</view>

						<view class="text">1.2 租赁或者购买矿机／算力：灰度云矿向用户提供本协议所附带订单内指定型号和数量的矿机／算力，用户可以选择租赁或或购买的方式来取得矿机／算力在本协议期限内的使用权或者所有权；</view>
						<view class="text">但无论采用租赁方式还是购买的方式，用户均应同步委托灰度云矿对矿机进行委托管理，以便于实现用户算力的最大化，最大限度保障用户的权益；若用户以购买方式委托灰度云矿对矿机管理一年以上，用户有权在提前书面通知灰度云矿的情况下（一般为提前30日通知，以使得灰度云矿有充分的准备时间），解除矿机的委托管理服务，并自行安排运输将矿机提货至用户预先准备的地址。</view>

						<view class="h4">二、矿机委托管理服务内容</view>
						<view class="text">2.1场地配套服务：灰度云矿为租赁或购买矿机的用户提供主机场地、电力配套、宽带网络配套、安全监控及主机管理和故障的排查并协助甲方或厂家进行维修等托管服务。</view>
						
						<view class="text">2.2日常监控服务：灰度云矿进行日常监控，以保证用户租赁或购买并委托管理的矿机平稳运行。</view>
						
						<view class="text">2.3 网络与信息安全保障：灰度云矿有按要求配合国家有关部门处理互联网络与信息安全工作的义务。</view>
						
						<view class="text">2.4 矿机的安全和赔偿：灰度云矿应保证甲方委托管理的设备的安全，保证不丢失、不被破坏。如果产生丢失、破坏的情况，乙方应照价赔偿甲方设备。</view>
						
						<view class="text">2.5 矿机的运输：对于用户购买的矿机，灰度云矿负责国内发往国外之间的运输、物流以及运输过程的中保险保价，运费按实际发生金额向用户收取，但灰度云矿选择运输、保险之前应提前通知用户和用户确定选择何种运输方式和投保哪种类型的保险及其他相关事宜，以保障用户的前述费用负担在合理的市场价格范围内（注意该运输的约定不适用于购买矿机用户的自提矿机）。</view>
						
						<view class="h4">三、收益结算：</view>
						<view class="text">3.1 当前所选产品的挖矿收益采取日结方式结算，挖矿收益为实际算力所得收益扣除电费，扣除运营维护费后所得，灰度云矿将在每个挖矿日结束后24小时内发放当日收益到用户账户。</view>
						<view class="text">3.2 丰水期与枯水期涉及到矿机流转，预计每年将有30天的停机转场期。矿机停机期间，矿机不扣电费，没有收益。加速挖矿产品将在用户回本后重新分配挖矿收入：</view>
						<view class="text">回本前：</view>
						<view class="text">用户：100%挖矿收入；平台：0%</view>
						<view class="text">回本后：</view>
						<view class="text">用户：85%挖矿收入；平台：15%</view>
						<view class="h4">四、租赁和委托管理的期限</view>
						<view class="text">4.1 无论采取租赁或者购买的方式，用户委托管理的矿机，其运行期限为：约定租赁时长或12个月（自用户支付租赁或购买费用时起算，本网站会另行书面通知用户起算期限）。用户不承担运维费用。</view>
						<view class="text">4.2 若用户采取购买方式，且委托管理的矿机运行时长超过1年，则用户有权在第一个委托管理周期届满前提前30日书面通知灰度云矿，以解除灰度云矿的托管授权，灰度云矿可与用户协商在适当时间停止矿机的运行，并配合客户对矿机的运输工作。但灰度云矿自矿机交付用户指定的第一承运人时不再承担矿机的任何管理责任，尤其是矿机自身的安全责任和自身损坏赔偿责任及对任何第三方造成损害的赔偿责任。</view>
						
						<view class="text">4.3 若用户在协议“4.2条”的情况下，在委托管理期限届满后超过90还未提货的，则灰度云矿有权收取一定的保管费用。</view>
						<view class="h4">五、服务终止条款：</view>
						<view class="text">满足以下条款之一，服务即自动终止。</view>
						<view class="text">5.1 若挖矿收益不足以抵扣电费，灰度云矿将暂时关闭受影响的矿机，并按用户预留的联系方式通知用户充缴；若停机90天仍不满足开机条件，将下架矿机并联系用户处理，用户将获得60天处理期以充缴电费重新开机；若逾期或无法取得联系，将视为用户放弃矿机且服务自动终止。</view>
						<view class="text">5.2 由于发生不能预见、不能避免或不能克服的客观事件造成的损失，导致矿场无法继续运营时，服务将提前终止，灰度云矿不对此承担赔偿责任。</view>
						<view class="text">5.3 丰水期枯水期转换时将产生矿机转场期，转场期间不收取电费且不产生挖矿收入，每次转场期预计为15天，受不可控因素影响或适当延长。</view>
						<view class="text">5.4 丰水期或发生电力不稳定情况，将可能临时停机或算力下线，停机时不收取电费且不产生挖矿收入，损益累计月结。</view>    
						<view class="h4">六、费用负担</view>
						<view class="text">用户需要向灰度云矿支付的费用有年度矿机租赁费，矿机永久购买费用、委托管理费用和基础电费等；请注意，下单并支付成功后，订单将无法撤销和退款。特殊产品类别将在购买页面公示收费项目及方式，请仔细阅读购买页面产品详情。以充分理解费用负担。</view>
						<view class="h4">七、用户和灰度云矿的权利义务关系</view>
						<view class="text">7.1 用户需要知悉：灰度云矿并非一个矿机的销售商，用户如果采用购买矿机的方式，矿机的所有权通过占有改定的方式转移，但用户必须同时使用灰度云矿的委托管理服务一年以上才能够拥有矿机的占有和处分权能。</view>
						<view class="text">7.2 用户如果在主机上安装软件，所需要的软件版权／许可／使用权由灰度云矿帮助提供；非双方另有书面约定，客户承认灰度云矿向甲方提供的任何资料、软件、数据等的权利属于灰度云矿，用户无权复制、传播、转让、许可或提供他人使用这些资源，否则应承担相应的责任。</view>
						<view class="text">7.3 灰度云矿向用户提供购买矿机的保修服务，其保修期限、范围等条款受生产商三包服务约束，所购产品保修期为自产品验收合格之日起。若甲方超过本合同约定期限未验收或提出异议的，则自产品到达甲方指定收货地点第25小时起算180日为保修期。</view>
						<view class="text">7.4 用户和灰度云矿均应严格履行本协议的各项约定，任何一方违约的，则守约方有权向违约方发送书面通知，违约方应自收到书面通知后7个工作日内向守约方书面说明理由，若未在约定期限说明理由，又未予以更正的，则作为客户的守约方有权采取举报、诉讼或仲裁等救济措施，灰度云矿则有权采取其他合法技术措施以实现自力救济，但保留通过诉讼、仲裁方式维护自身权益的权利。</view>
						<view class="h4">八、关于用户算力最大化的法律声明</view>
						<view class="text">灰度云矿致力于为用户提供一站式数字货币算力解决方案，但数字货币算力带来的收益，受到对应数字货币市场总算力状况，某一时段的数字货币挖矿分配方案、对应币值波动等多个方面的影响，而这些都是不可预测的。每个客户都必须就购买或租赁矿机／算力带来的收益作出独立判断，并应在选择是否购买或租赁矿机／算力时考虑风险和自身情况。灰度云矿不承诺收益，且不对客户挖矿收益承担责任。</view>
						<view class="h4">九、协议变更、解除、终止和权利义务的转让</view>
						<view class="text">9.1 协议变更:灰度云矿保留根据市场的需要，不定期修改交易方式、托管时长等协议内容的权利，如果根据诚实信用原则是被认为合理的或必要的。</view>
						<view class="text">9.2 协议解除与终止</view>
						<view class="text">9.2.1 您在使用平台服务的过程中，如果有下列情形发生，我们可以单方面解除本协议：</view>
						<view class="text">9.2.2 您的账户因任何原因注销的；</view>
						<view class="text">9.2.3冒用他人名义、盗用他人账户使用平台服务的；</view>
						<view class="text">9.2.4 为非法目的使用平台服务的；</view>
						<view class="text">9.2.5从事任何可能侵害平台系统、资料之行为；</view>
						<view class="text">9.2.6违反任何法律法规、本协议约定的；</view>
						<view class="text">9.2.7监管机构认为平台提供的服务不再符合相关监管规定的；</view>
						<view class="text">9.2.8除上述原因外，我们可以根据风险及自身业务运营情况需要终止向您提供某些服务，届时公司将会视情况公告或告知。鉴于这属于正常商业决策行为，如因此导致您无法使用平台服务服务受到限制的，您理解我们无须对此承担责任。</view>
						<view class="text">9.3 权利义务的转让我们可以基于平台服务的需要，变更或增加履约主体，如您继续使用平台服务的，视为同意变更后的主体或新增的主体作为与您履约的相对方。</view>
						<view class="h4">十、争议的解决</view>
						<view class="text">本协议的订立、效力、解释、履行及争议的解决均适用中华人民共和国法律。在协议履行期间，凡由本协议引起的或与本协议有关的一切争议、纠纷，当事人应首先协商解决。协商不成，各方一致同意提交被告方所在地人民法院通过诉讼方式解决。</view>
						<view class="h4">十一、通知</view>	
						<view class="text">本协议履行过程中，我们向您发出的书面通知方式包括邮寄纸质通知、灰度云矿网站公告、电子邮件、机短信和传真等方式。</view>	
						<view class="h4">十二、其他</view>
						<view class="text">12.1本协议的附件及各项补充、修订或变更，为本协议不可分割的组成部分，与本协议正文具有同等法律效力。</view>
						<view class="text">12.2 本协议各方应按法律法规及相关规定各自承担与本协议相关的税费。</view>
						<view class="text">12.3 本协议未尽事宜，由双方协商处理，或者按国家有关法律、法规的规定执行。</view>

					</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
        data() {
            return {
				timestamp: '',
				separator: 'colon',
				showBorder: true,
				color: '#FFAB57',
				showDays: true,
				fontSize: 20,
				separatorColor: '#FFAB57',
				borderColor:"#FFAB57",
				hideZeroDay:true,
				quantity:5,
				checked:false,
				mode:'center',
				show:false,
				scrollTop:0,
				obj:{},
				ver:0,
				price:'',
				cost:'',
				tabIndex:'',
				status:'',
				mineConfig:{},
            }
        },
		watch:{
			quantity(){
				this.cost = this.quantity * this.price
			}
		},
		onLoad(opt) {
			this.price = opt.price
			this.tabIndex = opt.index
			this.obj = uni.getStorageSync('data')
		},
        onShow() {
			this.init()
			this.getMineInfo()
			this.cost = this.quantity * this.price
        },
        methods: {
			init(){
				this.$Ajax("/Autnentication/selectAuthenticationZt",{
					userId:uni.getStorageSync('hdUserInfo').userid
				},(res)=>{
					this.status = res.data[0].flg;
				})
			},
			select(index){
				this.ver = index;	
			},
			// 获取矿机配置
			getMineInfo(){
				this.$Ajax('/MartianOrePool/selectMillConfig',{
					productId:this.obj.productId
				},(res)=>{
					this.mineConfig = res.data[0]
				})
			},
			giLink(){
				this.$Ajax('/register/checkJymimaZt',{
					userId:uni.getStorageSync('hdUserInfo').userid
				},(res)=>{
					if(res.data==0){
						this.$u.toast('请先设置交易密码')
						setTimeout(()=>{
							this.$tools.jump('../login/setTradePwd')
						},1000)
					}else{
						if(this.status==0){
							this.$u.toast("用户未认证，请前往认证")
							setTimeout(()=>{
								this.$tools.jump("../my/certification")
							},1000)
							return
						}
						if(this.status==1){
							this.$u.toast("认证审核中，请等待系统审核")
							return
						}
						if(!this.checked) return this.$u.toast("请确认已阅读矿机租赁、购买协议！")
						uni.navigateTo({
							url:'./buyPower?orderId='+this.obj.productId+'&number='+this.quantity + '&index='+this.tabIndex
						})
					}
				})
				
			},
			checkboxChange(e){
				if(e.detail.value.length===0){
					this.checked = false
				}else {
					this.checked = true
				}
			},
			change(){},
			end(){},
			down(){
				let str = this.tabIndex == 0 ? 'T':'M'
				if(this.quantity===5){
					return this.$u.toast(`最低购买数量为5${str}`)
				}
				this.quantity--
			}
        }
    }
</script>

<style lang="less" scoped>
.page {
	padding-bottom: 180rpx;
	.popBot {
		width: 600rpx;
		height: 800rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		// padding-bottom: 30rpx;
		.title {
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #F16C00;
			height: 82rpx;
			line-height: 82rpx;
		}
		.scroll-Y {
			width: 100%;
			height: 700rpx;
			.txt {
				padding: 20rpx;
				color: #666;
				font-size: 24rpx;
			}
			.text {
				padding: 0 20rpx;
				color: #666;
				font-size: 24rpx;
				text-indent: 2em;
			}
			.h4 {
				color: #000;
				font-size: 28rpx;
				font-weight: 600;
				padding: 20rpx;
			}
		}
	}
}
	.pic {
		width: 365rpx;
		height: 270rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.countDowm {
		width: 690rpx;
		height: 60rpx;
		background: #FFF7F0;
		border-radius: 10rpx;
		.left {
			width: 200rpx;
			height: 42rpx;
			background: url("../../static/images/app/item_title_bg.png") no-repeat;
			background-size: 100% 100%;
			.name {
				width: 70rpx;
				font-size: 20rpx;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 42rpx;
				text-align: center;
			}
			.str {
				width: 130rpx;
				text-align: center;
				color: #323232;
				font-size: 20rpx;
				line-height: 42rpx;
			}
		}
	}
	
	.price {
		color: #F16C00;
		font-size: 36rpx;
		font-weight: 600;
		margin-top: 20rpx;
		text {
			color: rgba(0,0,0,0.5);
			font-size: 24rpx;
			text-decoration: line-through;
			padding-left: 10rpx;
		}
	}
	.mineName {
		font-size: 30rpx;
		font-weight: 500;
		color: #000000;
		margin-top: 10rpx;
	}
	.time {
		color: rgba(0,0,0,0.7);
		font-size: 26rpx;
		margin-top: 15rpx;
	}
	
	.infoBox {
		width: 690rpx;
		background-color: #FFF7F0;
		border-radius: 10rpx;
		.th {
			width: 100%;
			.thLi {
				width: 28%;
				color: rgba(0,0,0,0.5);
				font-size: 24rpx;
			}
			.thLi:nth-child(1){
				width: 44%;
			}
		}
		.td {
			color: #000;
			margin-top: 10rpx;
			.tdLi {
				width: 28%;
				font-size: 24rpx;
				font-weight: 600;
				text {
					color: rgba(0,0,0,0.5);
					font-size: 20rpx;
				}
			}
			.tdLi:nth-child(1){
				width: 44%;
			}
		}
	}
	
	.h2 {
		text {
			font-size: 24rpx;
			color: #000000;
			padding-right: 20rpx;
		}
		.ver {
			font-size: 30rpx;
			font-weight: 700;
		}
	}
	.cnt {
		width: 690rpx;
		border: 1rpx solid #999;
		border-bottom: none;
		.color {
			
		}
		.cell_th {
			width: 100%;
			height: 50rpx;
			font-size: 30rpx;
			font-weight: 700;
			border-bottom: 1rpx solid #999;
			.li {
				width: 60%;
				line-height: 50rpx;
				padding-left: 15rpx;
			}
			.li:nth-child(1){
				width: 40%;
				border-right: 1rpx solid #999;
			}
		}
		.cell_td {
			.li {
				width: 60%;
				font-size: 24rpx;
				line-height: 50rpx;
				padding-left: 15rpx;
				border-bottom: 1rpx solid #999;
			}
			.li:nth-child(1){
				width: 40%;
				border-right: 1rpx solid #999;
			}
		}
	}
	
	.text {
		color: rgba(0,0,0,0.5);
		font-size: 24rpx;
		margin-bottom: 20rpx;
	}
	
	.checkbox {
		width: 100%;
		height: 60rpx;
		background-color: #F1F1F1;
		z-index: 99;
		bottom: 110rpx;
		line-height: 60rpx;
		padding-left: 30rpx;
		.tip {
			font-size: 24rpx;
			color: #000000;
			text {
				color: #F16C00;
			}
		}
	}
	.bottomOp {
		width: 100%;
		height: 110rpx;
		background-color: #F1F1F1;
		z-index: 99;
		bottom: 0;
		.btn {
			width: 250rpx;
			line-height: 110rpx;
			background: #F16C00;
			font-size: 30rpx;
			font-weight: 600;
			color: #fff;
		}
		.left {
			padding-left: 30rpx;
			text {
				color: #000;
				font-size: 32rpx;
				margin-right: 30rpx;
			}
			.div {
				width: 66rpx;
				height: 66rpx;
				line-height: 60rpx;
				background: #fff;
				color: #000;
				font-size: 42rpx;
			}
			input {
				width: 80rpx;
				height: 66rpx;
				background: #fff;
				text-align: center;
				margin: 0 10rpx;
				color: #000;
				font-size: 28rpx;
			}
		}
	}
</style>
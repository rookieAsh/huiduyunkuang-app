<template>
	<view class="page">
		<!-- <view class="placeholder30"></view> -->
		<template v-if="ver==1">
			<view class="padding30">
				<view class="h2">比特币（Bitcoin）挖矿教程</view>
				<view class="text">比特币（Bitcoin，简称BTC）是最早的数字货币之一，比特币网络构建了一个去中心化的支付系统，目前是市值最大的数字货币。</view>
				<view class="text">比特币采用SHA256d加密算法，总量2100万枚。目前，比特币挖矿需要通过专业的ASIC矿机进行，常见的矿机有蚂蚁S17、S15、S9，神马M20、M10、M30，芯动T2、T3， 阿瓦隆A741、A821、A921，翼比特E9、E11等。</view>
				
				<view class="h4">1. 注册灰度云矿帐户</view>
				<view class="text">灰度云矿比特币挖矿方式为用户名挖矿，需注册帐户并获取用户名。访问灰度云矿官网，根据指引完成注册即可获取灰度云矿用户名，登录帐户后，在个人中心查看用户名。</view>
				<view class="h4">2. 获取并添加钱包地址</view>
				<view class="text">您可以通过如下方式获取比特币钱包地址，以接收挖矿收益。</view>
				<view class="h6">1) 全节点钱包</view>
				<view class="text">点击下载获得全节点钱包。全节点占用硬盘空间较大（200G以上），如硬盘空间不足，可以使用交易所或其他第三方钱包。</view>
				<view class="h6">2) 交易所钱包</view>
				<view class="text">币安、OKEx、火币等。注册交易所帐户并找到比特币（BTC）充值，即可获取交易所钱包地址。</view>
				<view class="h6">注意：各国对交易所监管政策不同，相关风险由矿工自行承担。</view>
				<view class="h6">3) 移动端钱包</view>
				<view class="text">可下载Cobo等移动端钱包。获取比特币钱包地址后，请在帐户中绑定钱包地址。登录灰度云矿帐户，并在帐户设置-付款设置中按照提示完成钱包地址绑定及激活。</view>
				<view class="text">在灰度云矿挖比特币，可以额外获得VCASH、ELA和NMC赠币，具体情况请查看VCASH奖励详情和ELA和NMC详情以绑定赠币地址。</view>
				<view class="h4">3. 设置挖矿参数</view>
				<view class="text">在浏览器地址栏输入矿机IP地址，进入矿机后台，或使用矿机官方提供的批量管理软件设置以下信息：</view>
				<view class="text">User/Worker：灰度云矿用户名.矿工号（这里填写的是第一步注册中设置的F2Pool灰度云矿用户名，不是钱包地址或email。用户名和矿工号使用英文句号“.”隔开；矿工号为自定义，可以是数字或字母组合）</view>
				<view class="text">Password：任意设置，如123检查以上信息无误后，保存设置，片刻后矿机开始运行，即可坐享收益。</view>
				<view class="text">Pool 2，Pool 3的挖矿信息，可以参照上述方法进行填写即可，这两部分作为备用矿池，当矿机与Pool 1连接出现问题时，会自动切换到Pool 2或Pool 3。</view>
				<view class="h4">4. 矿机监控及收益查看</view>
				<view class="text">机器运行片刻并提交数据给矿池之后，即可查看矿机运行状态和收益情况，可以通过登录灰度云矿官网，在我的首页和矿工管理页面，查看收益情况和矿机状态。也可以通过灰度云矿App（点击下载），登录后即可查看。</view>
				<view class="text">对比特币挖矿有疑问，需要寻求帮助，可以加入灰度云矿。</view>
			</view>
		</template>
			
		<template v-if="ver==2">
			<view class="padding30">
				<view class="h2">以太坊（Ethereum）挖矿教程</view>
				<view class="text">以太坊（Ethereum，简称ETH）是一个开源的、集成智能合约功能的公共区块链平台。目前，以太坊采用PoW共识，挖矿算法为Ethash（也称DaggerHashimoto），支持GPU矿机和一些定制化矿机挖矿。</view>
				<view class="text">灰度云矿支持使用灰度云矿用户名和以太坊钱包地址进行以太坊挖矿，两种参与方式的挖矿收益相同。</view>
				<view class="h4">1. 挖矿设备和环境</view>
				<view class="text">挖矿设备：GPU（NVIDIA或AMD，显存不低于5G ）和部分ASIC矿机。</view>
				<view class="text">操作系统：Windows、Linux。</view>
				<view class="text">虚拟内存：单张GPU设置6G虚拟内存（如6张GPU则设置36G）。</view>
				<view class="text">挖矿软件：minerOS、轻松矿工、开源矿工、PhoenixMiner、Bminer、lolMiner、NBMiner等。</view>
				<view class="h4">2. 获取钱包地址</view>
				<view class="h6">1) 全节点钱包</view>
				<view class="text">以太坊全节点钱包占用硬盘空间较大（200G以上），如有需要可自行搜索下载。</view>
				<view class="h6">2) 交易所钱包</view>
				<view class="text">币安、OKEx等。几乎所有交易所都支持ETH充值和交易，注册交易所，找到ETH充值即可获取钱包地址。</view>
				<view class="h6">注意：各国对交易所监管政策不同，相关风险由矿工自行承担。</view>
				
				<view class="h4">3) App及Web钱包</view>
				<view class="text"></view>
				<view class="text">Cobo、imToken、MetaMask等。</view>
				<view class="h6">如采用用户名方式挖矿，请通过以下途径完成帐户设置：</view>
				<view class="text">访问 灰度云矿官网，注册 灰度云矿帐户，将之前获取到的ETH钱包地址绑定到挖矿账户中，根据页面指引完成绑定和激活。请查询详细注册教程。</view>
				<view class="text">其中，挖矿帐户名即为用户名，在使用用户名挖矿时，填写对应的用户名或子帐户名。</view>
				
				<view class="h4">3. 获取挖矿软件</view>
				<view class="h6">1) 原版挖矿软件</view>
				<view class="text">可下载PhoenixMiner、Bminer、lolMiner、TeamRedMiner、NBMiner、GMiner等原创内核。</view>
				<view class="h6">2) 版本</view>
				<view class="text">版本已为矿工创建好了批处理文件，默认矿池为 灰度云矿，您可只需把配置参数中的钱包地址替换为自己的钱包地址，保存设置即可。可在谷歌云端硬盘（需科学上网）下载。</view>
				<view class="h6">3) 挖矿系统</view>
				<view class="text">minerOS：基于Linux开发的显卡矿机管理系统，支持云端批量管理矿机。系统ROM支持U盘和无盘方式安装，内置Claymore、Bminer、ccminer、EWBF等第三方原版挖矿软件。</view>
				<view class="text">轻松矿工：支持90+币种，可以一键批量切换矿池、币种、钱包；批量一键升级内核、软件、驱动；一键批量超频，不依赖小飞机。</view>
				<view class="text">开源矿工：开源矿工是一款国人开发的显卡挖矿开源软件，一键开挖ETH、GRIN等各种显卡币种；支持超频、群控，在线升级；追求矿工功能和开发者工具的完备；所有源代码开源，永不增加矿工额外支出。</view>
				<view class="h4">4. 设置挖矿参数</view>
				<view class="h6">1) minerOS挖矿设置（NVIDIA及AMD显卡）</view>
				<view class="text">第一次使用minerOS的用户请先查看教程。</view>
				<view class="text">建立ETH挖矿模板，默认矿池为 (账户)，填写你的灰度云矿用户名或ETH钱包地址，应用到矿机即可。</view>
				<view class="h6">2) PhoenixMiner挖矿设置（Nvidia及AMD显卡）</view>
				<view class="tetxt">通过上述途径获取PhoenixMiner挖矿软件，选择“将文件解压缩到当前文件夹”，找到“start.bat”批处理文件。</view>
				<view class="text">右键点击“start.bat”批处理文件，选择“编辑”，各项参数设置如下：PhoenixMiner.exe -epool eth. .com:6688 -ewal username -worker worker_name -pass x</view>
				<view class="text">其中username为你的灰度云矿用户名或ETH钱包地址。</view>
				<view class="text">worker_name为矿机编号，自定义即可如编号或字母组合（不能有特殊字符）。修改时只把对应的字符修改掉，空格、标点均不要增减。</view>
				<view class="text">核实所填信息无误后，保存并退出“start.bat”文件，然后双击运行此修改过的“start.bat”批处理文件即开始挖矿。</view>
				<view class="h6">3) Bminer挖矿设置（Nvidia及AMD显卡）</view>
				<view class="text">通过上述途径获取Bminer挖矿软件，选择“将文件解压缩到当前文件夹”，找到“start.bat”批处理文件。</view>
				<view class="text">右键点击“start.bat”批处理文件，选择“编辑”，各项参数设置如下：bminer -uri ethstratum://username.worker_name@eth. .com:6688</view>
				<view class="text">Bminer支持4G显存的显卡在Linux环境下继续挖ETH，挖矿参数设置如下：./bminer -uri ethstratum://username.worker_name@eth. .com:6688 -ethash-allocation 4081</view>
				
				<view class="text">其中-ethash-allocation，设置范围是4080-4090</view>
				<view class="text">其中username为你的灰度云矿用户名或ETH钱包地址。</view>
				<view class="text">worker_name为矿机编号，自定义即可如编号或字母组合（不能有特殊字符）。修改时只把对应的字符修改掉，空格、标点均不要增减。</view>
				<view class="text">核实所填信息无误后，保存并退出“start.bat”文件，然后双击运行此修改过的“start.bat”批处理文件即开始挖矿。</view>
				<view class="h6">4) lolMiner挖矿设置（Nvidia及AMD显卡）</view>
				<view class="text">通过上述途径获取lolMiner挖矿软件，选择“将文件解压缩到当前文件夹”，找到“start.bat”批处理文件。</view>
				<view class="text">右键点击“start.bat”批处理文件，选择“编辑”，各项参数设置如下：lolMiner.exe --algo ETHASH --pool eth. .com:6688 --user username.worker_name </view>
				<view class="text">lolMiner支持4G显存的显卡继续挖ETH，挖矿参数设置如下：lolMiner.exe --algo ETHASH --pool eth. .com:6688 --user username.worker_name --4g-alloc-size 4024 --keepfree 8 其中username为你的灰度云矿用户名或ETH钱包地址。</view>
				<view class="text">worker_name为矿机编号，自定义即可如编号或字母组合（不能有特殊字符）。修改时只把对应的字符修改掉，空格、标点均不要增减。</view>
				<view class="text">核实所填信息无误后，保存并退出“start.bat”文件，然后双击运行此修改过的“start.bat”批处理文件即开始挖矿。</view>
				<view class="h6">5) ASIC矿机挖矿设置</view>
				<view class="text">可选用芯动A10，A10Pro或者Linzhi 凤等矿机。在电脑浏览器地址栏输入矿机IP地址，进入矿机后台，或使用矿机官方提供的批量管理软件设置以下信息：Pool /URL：stratum+tcp://eth. .com:6688 </view>
				
				<view class="text">User/Worker：灰度云矿用户名.矿工号（这里填写的是灰度云矿用户名，不是钱包地址，也不是邮箱号。灰度云矿用户名和矿工号使用英文句号“.”隔开；矿工号为自定义，可以是数字或字母组合，如testf2.001）</view>
				<view class="text">Password：任意设置，如123检查以上信息无误后，保存设置，片刻后矿机开始运行，即可坐享收益。</view>
				<view class="h4">5. 矿机监控及收益查看</view>
				<view class="text">机器运行片刻并提交数据给矿池之后，即可查看矿机运行状态和收益情况。</view>
				<view class="h6">1) 用户名挖矿</view>
				<view class="text">如采用灰度云矿用户名挖矿，可以登录 灰度云矿官网，在右上角切换币种至ETH，在我的首页和矿工管理页面，查看收益情况和矿机状态；</view>
				<view class="text">也可以使用灰度云矿App，登录后即可查看相关信息。</view>
				<view class="h6">2) 钱包地址挖矿</view>
				<view class="text">如采用ETH钱包地址挖矿，则可以访问 灰度云矿官网，在右上角搜索栏输入ETH钱包地址，币种选择ETH，点击“查看”，即可查看矿机状态和收益情况。</view>
				<view class="text">也可以使用 灰度云矿App，在首页选择右上方图标进入“快速查看”，输入ETH钱包地址，币种选择ETH，点击按钮即可查看相关信息。</view>
				<view class="text">如对以太坊挖矿有疑问、需要帮助，可以添加QQ群咨询客服。 灰度云矿官方ETH/ETC/ETP/CLO群：343148122。</view>
			</view>
		</template>
		
		<template v-if="ver==3">
			<view class="padding30">
				<view class="h2">莱特币（Litecoin）挖矿教程</view>
				<view class="text">莱特币（Litecoin，简称LTC）是一种去中心化的数字货币，也是早期数字货币之一。目前市值居数字货币市值排行榜前10。</view>
				<view class="text">莱特币采用Scrypt算法挖矿，支持ASIC矿机挖矿（显卡和CPU挖LTC算力太低，已被淘汰），常见的莱特币ASIC矿机有蚂蚁L3+、L3++，芯动A4、A4+、A6，泛思X6等。</view>
				<view class="h4">1. 注册 帐户</view>
				<view class="text"> 灰度云矿莱特币挖矿方式为用户名挖矿，需注册帐户并获取用户名。访问 灰度云矿官网，根据指引完成注册即可获取灰度云矿用户名，登录帐户后，在个人中心查看用户名。</view>
				<view class="h4">2. 获取并添加钱包地址</view>
				<view class="text">您可以通过如下方式获取莱特币钱包地址，以接收挖矿收益。</view>
				<view class="h6">1) 全节点钱包</view>
				<view class="text">点击下载获得全节点钱包。全节点占用硬盘空间较大（200G以上），如硬盘空间不足，可以使用交易所或其他第三方钱包。</view>
				<view class="h6">2) 交易所钱包</view>
				<view class="text">币安、OKEx、火币等。注册交易所帐户并找到莱特币（LTC）充值，即可获取交易所钱包地址。</view>
				<view class="h6">注意：各国对交易所监管政策不同，相关风险由矿工自行承担。</view>
				<view class="h6">3) 移动端钱包</view>
				<view class="text">可下载Cobo等移动端钱包。获取莱特币钱包地址后，请在帐户中绑定钱包地址。登录灰度云矿帐户，并在帐户设置-付款设置中按照提示完成钱包地址绑定及激活。</view>
				<view class="h4">3. 设置挖矿参数</view>
				<view class="text">在浏览器地址栏输入矿机IP地址，进入矿机后台，或使用矿机官方提供的批量管理软件设置以下信息：</view>
				<view class="text">User/Worker：灰度云矿用户名.矿工号（这里填写的是第一步注册中设置的 灰度云矿用户名，不是钱包地址或email。用户名和矿工号使用英文句号“.”隔开；矿工号为自定义，可以是数字或字母组合）</view>
				<view class="text">Password：任意设置，如123检查以上信息无误后，保存设置，片刻后矿机开始运行，即可坐享收益。</view>
				<view class="text">Pool 2，Pool 3的挖矿信息，可以参照上述方法进行填写即可，这两部分作为备用矿池，当矿机与Pool 1连接出现问题时，会自动切换到Pool 2或Pool 3。</view>
				<view class="h4">4. 矿机监控及收益查看</view>
				<view class="text">机器运行片刻并提交数据给矿池之后，即可查看矿机运行状态和收益情况，可以通过登录 灰度云矿官网，在我的首页和矿工管理页面，查看收益情况和矿机状态。</view>
				<view class="text">也可以通过灰度云矿App，登录后即可查看。</view>
				<view class="text">对LTC挖矿有疑问，需要寻求帮助，可以添加QQ群</view>
			</view>			
		</template>	
		
		<template v-if="ver==4">
			<view class="padding30">
				<view class="text">币印矿池页面分为算力、矿机数、收益及算力曲线几个部分。算力即矿池收到来自矿机的有效算力数值统计，矿机即矿池检测在线有效矿机的数量，收益即矿工的收益，算力图表即以曲线方式呈现矿机算力，分为“1小时”为单位和“1天”为单位。</view>
				<view class="text">当您连入矿池时，可能出现后台显示多台矿机在工作但是矿池端仅显示1台。</view>
				<image src="../../static/images/info_imgs/ver4_1.jpg" style="width: 100%;height: 300rpx;"></image>
				<view class="text">请在矿机后台查看矿机名，是否全部矿机都为相同的名称。若为相同的名称，修改为不同名称即可显示为多台矿机。（矿机名相同导致矿池仅显示一台矿机并不会影响您的算力，算力为全部矿机算力之和。）</view>
				<image src="../../static/images/info_imgs/ver4_2.jpg" style="width: 100%;height: 220rpx;"></image>
				<view class="text">Worker处的格式为矿工名.矿机名,矿工名即子账户名</view>
			</view>
		</template>
		
		<template v-if="ver==5">
			<view class="padding30">
				<view class="h4">直接进入矿机后台升级</view>
				<li>进入矿机后台后，进入Upgrade升级页面</li>
				<image src="../../static/images/info_imgs/ver5_1.jpg" style="width: 690rpx;height: 110rpx;"></image>
				<li>蚂蚁矿机</li>
				<image src="../../static/images/info_imgs/ver5_2.jpg" style="width: 690rpx;height: 410rpx;"></image>
				<li>阿瓦隆矿机</li>
				<image src="../../static/images/info_imgs/ver5_3.jpg" style="width: 690rpx;height: 600rpx;"></image>
				<li>芯动矿机</li>
				<image src="../../static/images/info_imgs/ver5_4.jpg" style="width: 690rpx;height: 660rpx;"></image>
				<li>翼比特矿机(选择要上传的相关固件并保存升级 )</li>
				<image src="../../static/images/info_imgs/ver5_5.jpg" style="width: 690rpx;height: 150rpx;"></image>
			</view>
		</template>
		
		
		<template v-if="ver==6">
			<view class="padding30">
				<view class="h4">什么挖矿地址？</view>
				<view class="text">比特币是一个去中心化的网络架构，通过节点来转发新交易和新区块。而矿机、矿池也同时形成了另一个网络。这个网络分成矿机、矿池、钱包等几个主要部分。其中矿机与矿池之间的通讯协议是stratum，呈现到矿机后台即被称作挖矿地址，矿机来接受来自矿池的job，矿池接收来自矿机的share，以btc为例，挖矿地址为：</view>			
				<li>stratum+tcp://btc.ss.poolin.com:443</li>
				<li>stratum+tcp://btc.ss.poolin.com:1883</li>
				<li>stratum+tcp://btc.ss.poolin.com:25</li>
				<view class="h4">什么是ping？</view>
				<view class="text">ping用于确定本地主机是否能与另一台主机成功交换（发送与接收）数据包，再根据返回的信息，就可以推断运行是否正常、网络是否通畅等。</view>
				<view class="h4">为何ping？</view>
				<view class="text">矿机与矿池之间是依靠网络进行链接，网络状态很大程度上决定了矿机与矿池间的通信。在Windows系列的操作系统中，我们都可以使用ping命令来解决网络中出现的路由问题具体操作如下：</view>
				<view class="h6">1.与矿机的局域网相同的电脑，搜索框中输入cmd，选择”命令提示符“工具。</view>
				<image src="../../static/images/info_imgs/ver6_1.jpg" style="width: 100%;height: 450rpx;"></image>
				<view class="h6">2.输入ping btc.ss.poolin.com即可。（以btc为例，若为其他币种则改为其他币种挖矿地址即可）</view>
				<li>cmd中输入ping btc.ss.poolin.com按Enter键，查看”数据包“结果即可。</li>
				<li>若需要一直ping，在cmd中输入ping btc.ss.poolin.com -t即可，按ctrl+c即可停止。</li>
				<image src="../../static/images/info_imgs/ver6_2.jpg" style="width: 100%;height: 260rpx;"></image>
				<view class="text">（ping BTC挖矿地址示例）</view>
				
				<view class="h4">其他情况？</view>
				<image src="../../static/images/info_imgs/ver6_3.jpg" style="width: 100%;height: 80rpx;"></image>
				<li>域名解析失败的显示为”请检查该名称，然后重试。多为断网或dns解析失败才会出现，请检查网线是否连接正常。</li>
				<image src="../../static/images/info_imgs/ver6_4.jpg" style="width: 100%;height: 260rpx;"></image>
				<li>域名解析正常的显示为”数据包：已发送 = x，已接受 = x，丢失 = x（x%丢失）“等信息，正常网络下丢失为0%，若您出现丢失大于0的情况，请您前往speedtest.cn查询网络状况，并与运营商联系。</li>
			</view>
		</template>
		
		<template v-if="ver==7">
			<view class="padding30">
				<view class="text">目前市场有上很多不同的矿机厂商及矿机类型，不同机器的安装流程大体相同，包括硬件拆包、硬件连接、设备通电、软件准备、矿池连接、坐等收益等。具体流程可参考各矿机厂商的使用说明。</view>
				<view class="text">蚂蚁矿机：
					<text @click="jump('https://support.bitmain.com/hc/zh-cn/community/topics')">
						https://support.bitmain.com/hc/zh-cn/community/topics
					</text>
				</view>
				<view class="text">阿瓦隆矿机：
					<text @click="jump('http://www.avalonminer.shop/support')">
						http://www.avalonminer.shop/support</text>
				</view>
				<view class="text">翼比特矿机：
					<text @click="jump('http://mall.ebang.com.cn/cms/articlelist.html?id=2')">
						http://mall.ebang.com.cn/cms/articlelist.html?id=2
					</text>
				</view>
				
				<view class="text">神马矿机：
					<text @click="jump('https://pangolinminer.com/support/')">
						https://pangolinminer.com/support
					</text>
					
				</view>
				<view class="text">如果您在矿机安装中遇到问题，建议直接联系矿机厂商。同时，也欢迎各位与灰度云矿团队分享探讨。</view>
			</view>
		</template>

		<template v-if="ver==8">
			<view class="padding30">
				<view class="h4">通常用户可以通过如下方式查找矿机IP</view>
				<li>登录矿机所连接的路由器（适用于机器数量较少的情况）</li>
				<view class="h6">1）访问路由器的IP，进入路由器登录页面（执行此操作的电脑需连接着此路由器），输入密码登录。</view>
				<image src="../../static/images/info_imgs/ver8_1.png" style="width: 690rpx;height: 580rpx;"></image>
				<view class="h6">2）点击终端设备，即可看到此路由器下所有连接的设备IP。通常蚂蚁矿机会显示“蚂蚁矿机”字样，对应的即为此矿机的IP。将此IP直接输入到浏览器的地址栏即可。</view>
				<image src="../../static/images/info_imgs/ver8_2.jpg" style="width: 690rpx;height: 400rpx;"></image>
				<li>使用IP Scanner工具扫描IP（适用于机器数量较少的情况）</li>
				<view class="text">若用户不知道路由器的IP，可通过IP Scanner工具扫描获取IP。</view>
				<view class="text">1）将电脑和矿机连接到同一路由器</view>
				<view class="text">2）在电脑上打开命令行文件(Windows+R键），输入ipconfig/all，然后按回车键</view>
				<view class="text">3）命令行文件中的IPV4地址即为您电脑的IP，此处查看到的是192.168.1.146，即电脑当前所在网段为192.168.1.x</view>
				<image src="../../static/images/info_imgs/ver8_3.jpg" style="width: 690rpx;height: 420rpx;"></image>
				<image src="../../static/images/info_imgs/ver8_4.jpg" style="width: 690rpx;height: 780rpx;"></image>
				<view class="text">4）下载IP Scanner（网上有各种版本）并打开，输入IP段，此处输入192.168.1.0-254（前三位数字根据自己电脑中获取的IP进行修改，后面的0-254通常都填写0-254即可），点击扫描即可查到此路由器下连接的所有设备的IP。用户可以通过名称/制造商识别矿机，也有部分矿机扫描时不显示名称/制造商，如下方的192.168.1.90。</view>
				<image src="../../static/images/info_imgs/ver8_5.jpg" style="width: 690rpx;height: 320rpx;"></image>
				<li>使用IP Reporter功能获取IP（矿机数量多或者少都可用此方法，但只适用于矿机上有IP Reporter键的矿机，主要为蚂蚁矿机）</li>
				<view class="text">1）根据您的矿机品牌，前往矿机厂商下载IP Reporter软件</view>
				<view class="text">2）打开软件，点击“start"</view>
				<view class="text">3）按住矿机上的IP按键1秒后松开</view>
				<image src="../../static/images/info_imgs/ver8_6.jpg" style="width: 690rpx;height: 500rpx;"></image>
				<view class="text">4）电脑上即会收到IP地址的反馈</view>
				<image src="../../static/images/info_imgs/ver8_7.jpg" style="width: 690rpx;height: 600rpx;"></image>
				<li>使用矿机批量管理工具设置IP</li>
				<view class="text">用此方法可快速批量的设置矿机的IP，具体使用细节可参考各类批量管理工具的官方说明。</view>
			</view>
		</template>

		<template v-if="ver==9">
			<view class="padding30">
				<view class="text">为了方便矿机管理，通常用户会在收到机器，登录矿机后台之后，给矿机设置一个固定的IP地址，即静态IP。静态IP可通过如下方式设置</view>
				<view class="h4">1.找到矿机IP并访问（关于如何查找IP可查询文章“如何查找IP？”），登录后点击Network下的Settings，即可看到如下页面</view>
				<view class="text">Status中的IP：指的是目前此矿机的IP地址</view>
				<view class="text">Protocol里包括DHCP和Static两个选项，其中：</view>
				<view class="text">DHCP：动态IP，即矿机联网以后会根据所连接的网络，随机分配一个IP</view>
				<view class="text">Static：静态IP，即不管矿机连接哪个网络，始终只使用此界面中给设定的IP地址</view>
				<image src="../../static/images/info_imgs/ver8_8.jpg" style="width: 690rpx;height: 400rpx;"></image>
				<view class="h4">2.Protocol中选择Static，并在IP Address中输入一个IP地址，假设此处输入192.168.1.200（原IP为192.168.1.147），点击页面右下角的”Save&Apply"保存设置。</view>
				<image src="../../static/images/info_imgs/ver9_1.jpg" style="width: 690rpx;height: 400rpx;"></image>
				<view class="h4">3.在浏览器地址栏中输入修改后的IP地址，此处为192.168.1.200，即可重新登录此矿机后台。</view>
			</view>
		</template>

		<template v-if="ver==10">
			<view class="padding30">
				<view class="h2">什么挖矿协议？</view>
				<view class="text">比特币是一个去中心化的网络架构，通过节点来转发新交易和新区块。而矿机、矿池也同时形成了另一个网络。这个网络分成矿机、矿池、钱包等几个主要部分。这些网络之间的链接则被称为挖矿协议，其中矿机与矿池之间的通讯协议是stratum，呈现到矿机后台即被称作挖矿地址，矿机来接受来自矿池的job，矿池接收来自矿机的share，以btc为例，挖矿地址为：</view>
				<li>stratum+tcp://btc.ss.poolin.com:443</li>
				<li>stratum+tcp://btc.ss.poolin.com:1883</li>
				<li>stratum+tcp://btc.ss.poolin.com:25</li>	
				<view class="text">除了矿池与矿工网络中经常使用的stratum挖矿协议，矿工也可以使用ip地址与矿池链接，进行挖矿。当您的域名地址即挖矿地址解析出现问题时，建议您暂时使用ip地址挖矿。（出于安全性及隐私性考虑，服务器ip地址将会进行定期升级更新，若持续使用此ip地址挖矿可能出现无法链接矿池的问题）</view>
				<view class="h2">如何查找ip地址？</view>
				<view class="h4">1.与矿机的局域网相同的电脑，搜索框中输入cmd，选择”命令提示符“工具。</view>
				<image src="../../static/images/info_imgs/ver10_1.png" style="width: 690rpx;height: 600rpx;"></image>
				<view class="h4">2.输入ping btc.ss.poolin.com查询挖矿地址所对应的服务器的ip地址。（以btc为例）</view>
				<image src="../../static/images/info_imgs/ver10_2.jpg" style="width: 690rpx;height: 400rpx;"></image>
				<view class="h4">3.将获取的ip地址加上矿池的端口号，填写到矿机后台，即可使用ip地址挖矿。（建议仅修改第一挖矿地址即可）</view>
				<image src="../../static/images/info_imgs/ver10_3.jpg" style="width: 690rpx;height: 200rpx;"></image>
				<view class="text">端口号：服务器一般都是通过识别端口号来识别任务的。而挖矿地址链接币印矿池的端口号即为443、1883和25。</view>
				<view class="h2">什么情况使用ip地址挖矿？</view>
				<view class="text">当您的域名地址即挖矿地址解析出现问题时，建议您暂时使用ip地址挖矿。（出于安全性及隐私性考虑，服务器ip地址将会进行定期升级更新，若持续使用此ip地址挖矿可能出现无法链接矿池的问题）</view>
				<view class="h2">如何判断域名地址即挖矿地址解析出现问题？</view>
				<view class="text">cmd中输入ping btc.ss.poolin.com按Enter键。通过ping挖矿地址结果判断</view>
				<li>域名解析失败的显示为”请检查该名称，然后重试。“，多为断网或dns解析失败才会出现，请检查网线是否连接正常。</li>
				<image src="../../static/images/info_imgs/ver10_4.jpg" style="width: 690rpx;height: 200rpx;"></image>
				<li>⦁	域名解析正常的显示为”数据包：已发送 = x，已接受 = x，丢失 = x（x%丢失）“等信息，正常网络下丢失为0%，若您出现丢失大于0的情况，请您前往speedtest.cn查询网络状况，并与运营商联系。</li>
				<view class="h2">如何通过ping查看网络问题？</view>
				<view class="text">cmd中输入ping btc.ss.poolin.com按Enter键，查看”数据包“结果即可。若需要一直ping，在cmd中输入ping btc.ss.poolin.com -t即可，按ctrl+c即可停止。</view>
			</view>
		</template>
		
		<template v-if="ver==11">
			<view class="padding30">
				<view class="h2">首先了解矿机使用注意事项：</view>
				<view class="text">1、电源建议比矿机的功耗高出20%或以上。</view>
				<view class="text">2、矿机连接的路由器或交换机，不能使用带POE功能的。</view>
				<view class="text">3、矿机只能通过有线方式连接到路由器或交换机。</view>
				<view class="text">4、建议使用温度为10至35度。</view>
				<view class="text">5、建议使用环境湿度在65%以下。</view>
				<view class="text">6、注意防尘和防柳絮，以免腐蚀运算板或造成矿机的热量散不出去。</view>
				<view class="text">7、进矿机后台，必须使用谷歌或火狐浏览器。</view>
				
				<view class="h2">一、准备工作</view>
				<view class="text">使用矿机挖矿之前，先检查挖矿设备是否完好齐全。</view>
				<view class="text">挖矿设备包括：电源，电源线，矿机，以及一台管理矿机的PC。</view>
				<view class="text">新机检查</view>
				<view class="text">1、包裹外观检查    在新机收到签收时，要检查包裹外观是否破损、如有破损请检查拆箱检查矿机是否有外观损坏，如有损坏请先拍照，然后联系矿机客服及时处理。</view>
				<view class="text">2、矿机外观检查    取出矿机查看矿机机壳是否有变形、风扇是否损坏、排线、风扇线是否有破损，如有请先拍照，再联系矿机客服处理。</view>
				<view class="text">3、矿机散热片检查    从矿机的前、后风扇处向里面看，检查是否有散热片脱落，如有脱落请及时联系矿机客服。</view>
				
				<view class="text">注意事项：因运算板是直接放到机箱卡槽中的，有些松动，在晃动时，会听到比较闷、沉重的声音，这个是正常的。</view>
				
				<view class="h2">二、控制板前部介绍</view>
				<image src="../../static/images/info_imgs/VER11_1.png" style="width: 690rpx;height: 260rpx;"></image>
				<image src="../../static/images/info_imgs/VER11_2.jpg" style="width: 690rpx;height: 260rpx;"></image>
				
				<view class="h2">三、矿机接线及检查</view>
				<view class="text">1、连接运算板：M3-V2.0版本不需要连接。</view>
				<view class="text">2、连接控制板：给控制板接上3pin和6pin线。注意：要注意卡扣的方向，不能接反，接反会烧坏控制板。连接后检查排线是否有松动、未插到位。</view>
				<image src="../../static/images/info_imgs/ver11_3.jpg" style="width: 690rpx;height: 560rpx;"></image>
				
				<view class="text">3、连接网络：正前方有一个网线接口，接时注意方向，水晶头一定要插到位。</view>
				
				<view class="text">4、连接风扇。检查风扇插头是否松动、未插到位（两个风扇各有一个风扇插头连接到控制板）。</view>
				<image src="../../static/images/info_imgs/ver11_4.jpg" style="width: 690rpx;height: 560rpx;"></image>
				
				<view class="h2">四、矿机安装好接通电源后，首先要查矿机的IP地址。</view>
				<li>使用路由器获取机器IP地址。</li>
				<li>（1）在浏览器中打开路由器的管理地址（说明书或路由器上贴的标签上有），找到最新接入设备的IP地址，即新接入矿机的IP。</li>
				<li>（2）根据连入网络设备的在线时长和设备名称，就能确定哪一台是刚刚接入的矿机，其对应的IP就是我们要找的矿机IP。</li>
				<li>使用神马批量管理工具进行机器的IP查询。</li>
				<li>下载地址：https://www.microbt.com/server/firmware.html</li>
				<li>设置IP段开始扫描矿机IP。</li>
				<li>在矿机的控制板一侧，长按【IP Found】键几秒钟，等指示灯闪烁后，表示IP上报完成。</li>
				<li>上报完成后批量管理工具将会显示矿机IP，将矿机IP输入至浏览器即可进入矿机后台。</li>
				
				<view class="h2">五、查询矿机的地址后，在与矿机相同IP地址的电脑浏览器中输入矿机的IP地址，进入矿机后台。</view>
				<li>打开浏览器，输入IP地址，初始登录名和密码均为admin。</li>
				<li>登录之后找到Configuration的CGMiner Configuration页面，分别设置币印矿池三个挖矿地址。</li>
				<view class="text">第一挖矿地址：stratum+tcp://btc.ss.poolin.com:443</view>
				<view class="text">第二挖矿地址：stratum+tcp://btc.ss.poolin.com:1883</view>
				<view class="text">第三挖矿地址：stratum+tcp://btc.ss.poolin.com:25</view>
				<li>当pool1地址链接异常将会尝试pool2/pool3</li>
				<view class="text">Worker：矿工名即子账户名。</view>
				<view class="text">Password：矿工密码（可随意设置）。</view>
				<li>设置完成后点击页面最下方的Save&Apply即可。</li>
				<li>设置完成之后，约几十秒后开始运行。到“Status”中的“CGMiner Status”可看到矿机实时挖矿状态。</li>
				
				<view class="h2">【常见问题】</view>
				<view class="h4">1.神马矿机如何修改语言？</view>
				<view class="text">系统——语言——auto（自动）/中文——保存&应用</view>
				<view class="h4">2.如何重启矿机？</view>
				<view class="text">System——Reboot——Perform reboot</view>
				<view class="h4">3.其他配置。</view>
				<view class="text">System——General Settings</view>
			</view>
		</template>

	</view>
</template>

<script>
	export default {
        data() {
            return {
				
            }
        },
		onLoad(opt) {
			this.name = opt.value1;
			this.ver = opt.value2;
		},
        onShow() {
			uni.setNavigationBarTitle({
			    title:this.name,
			})
        },
        methods: {
			jump(path){
				// #ifdef APP-PLUS
					plus.runtime.openURL(path)
				// #endif
				// #ifdef H5
					window.open(path)
				// #endif
			}
        }
    }
</script>

<style lang="less" scoped>
	.h2 {
		font-weight: 600;
		color: #000;
		font-size: 32rpx;
		padding-bottom: 20rpx;
	}
	.text {
		font-size: 24rpx;
		color: #000;
		line-height: 36rpx;
		padding: 8rpx 0;
		text {
			color: #FF891C;
		}
	}
	.h4 {
		font-weight: 600;
		color: #000;
		font-size: 28rpx;
		padding: 15rpx 0;
	}
	.h6 {
		font-weight: 600;
		color: #000;
		font-size: 24rpx;
		padding: 10rpx 0;
	}
</style>
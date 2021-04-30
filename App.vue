
<script>
	import version from './common/url.js'
	import {appUpload} from './common/appUpload.js'
	export default {
		onLaunch: function() {},
		onShow: function() {
			/* #ifdef APP-PLUS */
				appUpload()
			/* #endif */
		},
		onHide: function() {},
		methods: {}
	}
</script>

<style lang="scss">
	@import 'uview-ui/index.scss';
	@import 'style/base.css';
	@import 'style/myStyle.css';
	body{
		background: #fff;
		min-height: calc(100vh - var(--window-bottom));
	}
</style>

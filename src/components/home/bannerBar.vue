<template>
	<div class="bannerBar">
		<div class="banner-wrapper">
			<span>这是一个广告位</span>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	.bannerBar{
		width: 100%;
		height: 100%;
		.banner-wrapper{
			box-sizing: border-box;
			margin: 30px 22px 0;
			border-radius: 20px;
			background: cadetblue;
			height: 100px;
			display: flex;
			justify-content: center;
			align-items: center;
			span{
				color: white;
				font-weight: bold;
			}
		}
	}
</style>

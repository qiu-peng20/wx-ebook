<template>
	<div class="auth">
		<div class="auth-wrapper">
			<div class="auth-title">
				<span>微信登录</span>
			</div>
			<div class="auth-content">
				<div class="auth-content-image">
					<imgView 
					src="https://i.loli.net/2020/04/12/ErHxJWZGm5loBjh.png"
					round></imgView>
				</div>
				<div class="auth-content-text">
					<span>微信读书用户登录</span>
				</div>
			</div>
			<div class="auth-button">
				<button>取消</button>
				<button style="color: #009926;"
				@getuserinfo="getUserInfo"
				open-type="getUserInfo">登录</button>
			</div>
		</div>
	</div>
</template>

<script>
	import imgView from './imgView.vue'
	export default{
		components:{
			imgView
		},
		methods:{
			getUserInfo(){
				this.$emit('getUserInfo')
			}
		}
	}
</script>

<style lang="scss">
	.auth{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: white;
		z-index: 1000;
		display: flex;
		justify-content: center;
		align-items: center;
		.auth-wrapper{
			width: 250px;
			height: 300px;
			background: white;
			border: 1px solid #999999;
			display: flex;
			flex-direction: column;
			border-radius: 5px;
			.auth-title{
				text-align: center;
				line-height: 40px;
				font-weight: bold;
				border-bottom: 1px solid #999999;
			}
			.auth-content{
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.auth-content-image{
					width: 50px;
					height: 50px;
					margin-bottom: 30px;
					img{
						height: 100%;
						width: 100%;
					}
				}
			}
			.auth-button{
				display: flex;
				button{
					flex: 1;
				}
			}
		}
	}
</style>

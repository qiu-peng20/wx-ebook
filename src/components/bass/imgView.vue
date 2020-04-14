<template>
	<div class="img-view">
		<div class="img-wrapper">
			<img 
			 :class="round ? 'round image' : 'image'"
			 :src="src"
			 :mode="mode"
			 :lazy-load="lazyLoad"
			 :style="{height}"
			 @click="onClick"
			 @load="onLoad"
			 @error="onError"
			 v-show="!isLoading && !error"
			>
			<img
			:class="round ? 'round image' : 'image'"
			src="https://i.loli.net/2020/04/12/ErHxJWZGm5loBjh.png"
			:mode="mode"
			:lazy-load="lazyLoad"
			:style="{height}"
			v-show="isLoading || error"
			>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			src:{
				type:String,
				default:''
			},
			mode:{
				//图片缩放模式
				type:String,
				default:'widthFix'
			},
			lazyLoad:{
				//懒加载开启
				type:Boolean,
				default:true
			},
			round:{
				//圆形图片
				type:Boolean,
				default:false
			},
			height:{
				type:String,
				default:'auto'
			}
		},
		watch:{
			src(newValue,preValue) {
				if(newValue && newValue !== preValue ){
					this.isLoading = true
					this.error = false
				}
			}
		},
		data(){
			return{
				isLoading:true,
				error:false
			}
		},
		methods:{
			onClick(){
				this.$emit('onClick')
			},
			onLoad(){
				this.isLoading = false,
				this.error = false
			},
			onError(){
				this.isLoading = false,
				this.error = true
			}
		}
	}
</script>

<style lang="scss">
	.img-view{
		height: 100%;
		width: 100%;
		.img-wrapper{
			width: 100%;
			height: 100%;
			.image{
				height: 100%;
				width: 100%;
				&.round{
					border-radius: 50%;
				}
			}
		}
	}
	
	
</style>

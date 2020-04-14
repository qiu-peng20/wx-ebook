<template>
	<div class="home-card">
		<div class="home-card-wrapper">
			<div class="user-info">
				<div class="user-avatar">
					<imgView :src="avatar" round></imgView>
				</div>
				<div class="username">{{nickName}}</div>
				<div class="shelf-text">书架一共有{{data.num}}本书</div>
				<div class="shelf-text">~特别精选</div>
			</div>
			<div class="book-info">
				<div class="book-wrapper">
					<div class="book-imag-wrapper" v-for="(item,index) in bookList" :key="index" @click="onBookClick(item)">
						<imgView :src="item.cover"></imgView>
					</div>
					
					<div class="shelf-wrapper">
						<div class="shelf">书架</div>
						<van-icon class="arrow" name="arrow"></van-icon>
					</div>
				</div>
			</div>
			<div class="feedback-wrapper" @click="onFeedBackClick">
				<span>反馈</span>
			</div>
		</div>
		<van-dialog id="van-dialog"></van-dialog>
	</div>
</template>

<script>
	import imgView from '../bass/imgView.vue'
	import DiaLog from 'vant-weapp/dist/dialog/dialog.js'
	export default{
		components:{
			imgView
		},
		props:{
			data:Object
		},
		computed:{
			avatar(){
				//if(this.data && this.data.userInfo)
				return this.data && this.data.userInfo && this.data.userInfo.avatarUrl
			},
			nickName(){
				return this.data && this.data.userInfo && this.data.userInfo.nickName
			},
			bookList(){
				return this.data && this.data.bookList || {}
			}
			
		},
		methods:{
			onFeedBackClick(){
				DiaLog.confirm({
					title:'反馈',
					message:'您是否确认提交反馈信息',
					confirmButtonText:'是',
					cancleButtonText:'否'
				})
				.then(()=>{
					
				})
				.catch(()=>{
					
				})
			},
			goToShelf(){
				
			},
			onBookClick(item){
				this.$emit('onBookClick',item)
			},
			sign(){
				
			}
		}
	}
</script>

<style lang="scss">
	.home-card{
		background: #595b60;
		border-radius: 30px;
		margin: 22px 20px 0;
		.home-card-wrapper{
			position: relative;
			padding: 22px 17px 20px 20px;
			box-sizing: border-box;
			.user-info{
				display: flex;
				align-items: center;
				.user-avatar{
					width: 20px;
					height: 20px;
				}
				.username,.shelf-text{
					margin: 0 8.5px;
					font-size: 12px;
					color: #fff;
				}
				.shelf-text{
					opacity: 0.7;
					margin: 0 1px;
				}
			}
			.book-info{
				display: flex;
				margin-top: 16.5px;
				.book-wrapper{
					flex: 1;
					display: flex;
					justify-content: space-around;
					.book-imag-wrapper{
						width: 72px;
						height: 101px;
					}
					.shelf-wrapper{
						display: flex;
						align-items: center;
						.shelf{
							font-size: 11px;
							width: 11px;
							opacity: 0.8;
							color: white;
						}
						.arrow{
							color: white;
							display: flex;
							align-items: center;
						}
					}
				}
			}
			.feedback-wrapper{
				height: 23.5px;
				width: 44.5px;
				background: #707070;
				border-radius: 100px 0 0 100px;
				position: absolute;
				right: 0;
				top: 26px;
				text-align: center;
				z-index: 1;
				span{
					color: white;
					font-size: 11px;
					
					line-height: 11px;
				}
			}
		}
	}
</style>

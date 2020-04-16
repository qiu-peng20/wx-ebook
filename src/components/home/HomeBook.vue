<template>
	<div class="home-book">
		<div class="home-book-wrapper">
			<div class="book-title" v-if="showTitle">{{title}}</div>
			<div class="book-content" >
				<div class="book-content-row" v-for="(item,index) in bookData" :key="index">
					<div class="book-content-col" v-for="(book,bookIndex) in item" :key="bookIndex" :style="{ flex: '0 0 ' + (100 / col) + '%' }">
						<div class="book-wrapper"
						:style="{flexDirection : mode === HOME_BOOK_MODE.COL?'column':'row'}"
						@click="onBookClick(book)"
						v-if="mode === HOME_BOOK_MODE.COL || mode === HOME_BOOK_MODE.ROW">
							<imgView :src="book.cover"></imgView>
							<div class="book-title-wrapper book-title-col" v-if="mode === HOME_BOOK_MODE.COL">
								<div class="book-content-title">{{book.title}}</div>
							</div>
							<div class="book-title-wrapper book-title-row" v-else>
								<div class="book-content-title">{{book.title}}</div>
								<div class="book-content-author-category-wrapper">
									<div class="book-content-author">{{book.author}}</div>
									<div class="book-content-category ">{{book.categoryText}}</div>
								</div>
							</div>
						</div>
						<div class="category-wrapper" v-else>
							<div class="category-text">{{book.text}}</div>
							<div class="category-num">{{book.num}}本书</div>
							<div class="category-img-wrapper">
								<div class="imgView-one-wrapper">
									<imgView :src="book.cover"></imgView>
								</div>
								<div class="imgView-two-wrapper">
									<imgView :src="book.cover2"></imgView>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="book-footer" v-if="showBtn">
				<button class="button" @click="onMoreClick">{{btnText}}</button>
			</div>
		</div>
	</div>
</template>

<script>
	import imgView from '../bass/imgView.vue'
	import {HOME_BOOK_MODE , CATEGORY} from '../../utils/const.js'
	export default{
		components:{
			imgView
		},
		props:{
			title:{
				type:String,
				default:''
			},
			btnText:{
				//按钮文本
				type:String,
				default:''
			},
			row:{
				type:Number,
				default:0
			},
			col:{
				type:Number,
				default:1
			},
			mode:{
				//显示模式，row按行显示,col按列显示,category分类显示
				type:String,
				default:HOME_BOOK_MODE.COL
			},
			showTitle:{
				type:Boolean,
				default:true
			},
			showBtn:{
				//按键显示
				type:Boolean,
				default:true
			},
			linearBg:{
				//背景显示
				type:Boolean,
				default:false
			},
			data:{
				//图书列表
				type:Array,
				default:[]
			},
		},
		computed:{
			//计算书本抽取
			HOME_BOOK_MODE(){
				return HOME_BOOK_MODE
			},
			bookData(){
				if(this.data.length>0 && this.data){
					this.data.forEach(book=>{
						book.text = CATEGORY[book.categoryText.toLowerCase()]
					})
					const number = this.col * this.row //展示的总本数
					const _bookData = this.data.slice(0,number) //最多截取num本
					const _bookDataRow = []
					let _row = 0
					while(_row<this.row){
						//0 2
						//2 4
						_bookDataRow.push(_bookData.slice(_row*this.col,_row*this.col + this.col))
						_row++
					}
					return _bookDataRow
				}else{
					return []
				}
			},

		},
		methods:{
			onMoreClick(){
				//点击更多
				this.$emit('onMoreClick')
			},
			onBookClick(book){
				//点击图书
				this.$emit('onBookClick',book)
			}
		}
	}
</script>

<style lang="scss">
	.home-book{
		.home-book-wrapper{
			.book-title{
				padding: 13px 0 0 20.5px;
			}
			.book-content{
				padding: 0 12px;
				margin-top: 22.5px;
				.book-content-row{
					display: flex;
					flex-flow: row nowrap;
					.book-content-col{
						padding: 0 8px;
						box-sizing: border-box;
						.book-wrapper{
							display: flex;
							.book-title-wrapper{
								&.book-title-col{
									.book-content-title{
										font-size: 12px;
										line-height: 16.5px;
										max-height: 33px;
										font-weight: 500;
										overflow: hidden;
										word-break: break-word;
									}
								}
								&.book-title-row{
									flex: 0 0 50%;
									display: flex;
									flex-direction: column;
									justify-content: space-around;
									padding: 0 10px;
									.book-content-title{
										font-size: 14px;
										line-height: 18px;
										max-height: 36px;
										overflow: hidden;
										word-break: break-word;
									}
									.book-content-author,.book-content-category{
										font-size: 12px;
										color: #868686;
										line-height: 14px;
										max-height: 14px;
										overflow: hidden;
										word-break: break-word;
									}
								}
							}
						}
						.category-wrapper{
							display: flex;
							justify-content: space-between;
							flex-direction: column;
							position: relative;
							background: #f8f9f8;
							border-radius: 10px;
							height: 96px;
							padding: 13px 0 0 16px;
							box-sizing: border-box;
							margin-bottom: 10px;
							.category-text{
								width: 150px;
								overflow: hidden;
								text-overflow: ellipsis;
								color: #212832;
								font-size: 16px;
								line-height: 22.5px;
							}
							.category-num{
								color: #868686;
								font-size: 12px;
								line-height: 16.5px;
								padding-bottom: 15px;
							}
							.category-img-wrapper{
								position: absolute;
								right: 0;
								bottom: 0;
								.imgView-one-wrapper{
									position: absolute;
									right: 0;
									bottom: 0;
									width: 48px;
									z-index: 100;
									border-radius: 0 0 10px 0;
									overflow: hidden;

								}
								.imgView-two-wrapper{
									position: absolute;
									right: 30px;
									bottom: 0;
									width: 36px;
									z-index: 90;
									border-radius: 0 0 10px 0;
									overflow: hidden;
								}
							}
						}
					}
				}
			}
			.book-footer{
				width: 100%;
				height: 100%;
				padding: 12px 20px 20px;
				box-sizing: border-box;
				.button{
					width: 100%;
					border-radius: 20px;
					background: #E8E8E8;
					color: #1184CE;
					font-size: 14px;
					border: 1px solid #edeeee;
				}
			}
		}
	}
</style>

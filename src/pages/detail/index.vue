<template>
	<div class="detail">
		<DetailBook :book="book" ></DetailBook>
		<DetailStat
		:readers="book.readers"
		:readerNum="book.readerNum"
		:rankNum="book.rankNum"
		:rankAvg="book.rankAvg"
		></DetailStat>
		<DetailRate
		:rateValue="book.rateValue"
		@onRateChange="onRateChange">
		</DetailRate>
		<DetailContents :contents="contents" @readBook="readBook"></DetailContents>
	</div>
</template>

<script>
	import DetailContents from '../../components/detail/DetailContents.vue'
	import DetailRate from '../../components/detail/DetailRate.vue'
	import DetailBook from '../../components/detail/DetailBook.vue'
	import DetailStat from '../../components/detail/DetailStat.vue'
	import { getDetailBook ,
			getBookRankSave,
			getBookContents} from '../../api/index.js'
	import {getStorageSync} from '../../api/wechat.js'
	export default{
		components:{
			DetailBook,DetailStat,DetailRate,DetailContents
		},
		data(){
			return{
				contents:[]
			}
		},

		methods:{
			readBook(href){
				
			},
			onRateChange(value){
				const openId = getStorageSync('openId')
				const {fileName} = this.$route.query
				getBookRankSave({openId , fileName , rank:value})
				.then((response)=>{
					this.getBookDetail()
				})
			},
			getDetailContents(){
				const {fileName} = this.$route.query
				if(fileName){
					this.contents = [] // 在请求前重置 this.contents 值
					getBookContents({fileName})
					.then(response=>{
						this.contents = response.data.data
					})
				}
			},
			getBookDetail(){
				const openId = getStorageSync('openId')
				const {fileName} = this.$route.query
				if(openId && fileName){
					getDetailBook({openId , fileName})
					.then((response)=>{
						this.book = response.data.data
					})
				}
			}
		},
		data(){
			return{
				book:{},
				readers:'',  //读者信息
				readerNum:0, //阅读人数
				rankNum:0,   //评分人数
				rankAvg:0    //平均得分
				
			}
		},
		mounted() {
			this.getBookDetail()
			this.getDetailContents()
		}
	}
</script>

<style>
</style>

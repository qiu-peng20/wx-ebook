<template>
	<div>
		<div class="home" >
			<SearchBar
			:hotSearch="hotSearch"
			:disabled = true
			@click = "onSearchBarClick"
			></SearchBar>
			<HomeCard
			:data="homeCard"
			@onBookClick="onBookClick"></HomeCard>
			<BannerBar></BannerBar>
			<div :style="{marginTop:'23px'}">
				<HomeBook
				title="为你推荐"
				:row="1"
				:col="3"
				:data="recommend"
				:mode="modeCol"
				btnText="换一批"
				@onBookClick="onBookClick"
				@onMoreClick="onChangeClick('recommend')"></HomeBook>
			</div>
			<div :style="{marginTop:'23px'}">
				<HomeBook
				title="免费阅读"
				:row="2"
				:col="2"
				:data="freeRead"
				:mode="modeRow"
				btnText="换一批"
				@onBookClick="onBookClick"
				@onMoreClick="onChangeClick('freeRead')"></HomeBook>
			</div>
			<div :style="{marginTop:'23px'}">
				<HomeBook
				title="当前最热"
				:row="1"
				:col="4"
				:data="hotBook"
				:mode="modeCol"
				btnText="换一批"
				@onBookClick="onBookClick"
				@onMoreClick="onChangeClick('hotBook')"></HomeBook>
			</div>
			<div :style="{marginTop:'23px'}">
				<HomeBook
				title="分类"
				:row="3"
				:col="2"
				:data="category"
				:mode="modeCategory"
				btnText="查看全部"
				@onBookClick="onBookClick"
				@onMoreClick="onMoreClick"></HomeBook>
			</div>
		</div>
		<Auth v-if="!isAuth" @getUserInfo="getUserInfo"></Auth>
	</div>
</template>

<script>
	import {HOME_BOOK_MODE} from '../../utils/const.js'
	import {getHomeData,
			getRecommend,
			getFreeRead,
			gethotBook,
			register} from '../../api/index.js'
	import Auth from '../../components/bass/auth.vue'
	import HomeBook from '../../components/home/HomeBook.vue'
	import BannerBar from '../../components/home/bannerBar.vue'
	import SearchBar from '../../components/home/SearchBar.vue'
	import HomeCard from '../../components/home/HomeCard.vue'
	import {
		getSetting ,
		getUserInfo ,
		setStorageSync ,
		getStorageSync ,
		getUserOpenId,
		showLoading,
		hideLoading} from '../../api/wechat.js'

export default {
	components:{
		SearchBar,HomeCard,BannerBar,HomeBook,Auth
	},
	data(){
		return{
			hotBook:[],//当前最热
			hotSearch:[],//热门搜索
			banner:'',//banner图
			category:[],//分类
			freeRead:[],//免费阅读
			// shelf:[],//书架推荐图书
			recommend:[],//为你推荐
			homeCard:{},
			isAuth:true
		}
	},
	methods:{
		onChangeClick(key){
			switch(key){
				case 'recommend':
					getRecommend()
					.then(response=>{
						this.recommend = response.data.data
					})
				break
				case 'freeRead':
					getFreeRead()
					.then(response=>{
						this.freeRead = response.data.data
					})
				break
				case 'hotBook':
					gethotBook()
					.then(response=>{
						this.hotBook = response.data.data
					})
				break
			}
		},
		onBookClick(book){
			//图片点击事件
			this.$router.push({
				path:'/pages/detail/main',
				query:{
					fileName : book.fileName
				}
			})
		},
		onMoreClick(){
			//展示更多选项
      this.$router.push({
        path:'/pages/categoryList/main'
      })
		},
		onSearchBarClick(){
			//跳转到搜索页
		},
		getSetting(){
			//得到用户授权
			getSetting('userInfo',
			()=>{
				this.isAuth = true
				showLoading('正在加载')
				this.getUserInfo()
			},
			()=>{
				this.isAuth = false
			})
		},
		init(){
			this.getSetting()
		},
		getHomeData(openId,userInfo){
			//调取首页API
			getHomeData({ openId }).then((response)=>{
				const {data:{
					hotBook,hotSearch,banner,category,freeRead,shelf,recommend,shelfCount
				}} = response.data
				this.hotBook = hotBook
				this.hotSearch = hotSearch.keyword
				this.category = category
				this.freeRead = freeRead
				this.recommend = recommend
				this.banner = banner
				this.homeCard = {
					bookList:shelf,
					num:shelfCount,
					userInfo
				}
				hideLoading()
			})
		},
		getUserInfo(e){
			//获取用户信息
			const onOpenIdComplace = (openId,userInfo)=>{
				this.getHomeData(openId,userInfo)
				// register(openId,userInfo)
			}
			getUserInfo(
			(userInfo)=>{
				setStorageSync('userInfo',userInfo)
				const openId =  getStorageSync('openId')
				if(!openId || openId.length === 0){
					getUserOpenId(openId=> onOpenIdComplace(openId,userInfo))
				}else{
					onOpenIdComplace(openId,userInfo)
				}
			},
			()=>{
			})
		},
	},
	mounted() {
		this.init()
	},
	computed:{
		modeCol(){
			return HOME_BOOK_MODE.COL
		},
		modeRow(){
			return HOME_BOOK_MODE.ROW
		},
		modeCategory(){
			return HOME_BOOK_MODE.CATEGORY
		}
	}
}
</script>

<style lang="scss" scoped>

</style>

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
    <div class="detail-bottom">
      <div class="detail-btn-wrapper">
        <button :class="isInShelf ? 'detail-btn-remove' : 'detail-btn-shelf'"
        @click="handleShelf">{{isInShelf ? '移出书架' : '加入书架'}}</button>
      </div>
      <div class="detail-btn-wrapper">
        <button class="detail-btn-read" @click="() => readBook()">
          阅读
        </button>
      </div>
    </div>
	</div>
</template>

<script>
	import DetailContents from '../../components/detail/DetailContents.vue'
	import DetailRate from '../../components/detail/DetailRate.vue'
	import DetailBook from '../../components/detail/DetailBook.vue'
	import DetailStat from '../../components/detail/DetailStat.vue'
	import { getDetailBook ,
           getBookRankSave,
           getBookContents,
           getBookShelf,
           getBookShelfSave,
           getBookShelfRemoveSave} from '../../api/index.js'
	import {getStorageSync} from '../../api/wechat.js'
	export default{
		components:{
			DetailBook,DetailStat,DetailRate,DetailContents
		},
		data(){
			return{
        book:{},
        readers:'',  //读者信息
        readerNum:0, //阅读人数
        rankNum:0,   //评分人数
        rankAvg:0,    //平均得分
				contents:[],
        isInShelf:false
			}
		},

		methods:{
      handleShelf(){
        //加入||移出书架
        const openId = getStorageSync('openId')
        const {fileName} = this.$route.query
        if(!this.isInShelf){
          getBookShelfSave({openId,fileName})
          .then(response=>{
             this.getBookShelf()
          })
        }else{
          const vue = this
          mpvue.showModal({
            title: '提示',
            content: `确定要下架${this.book.title}`,
            success (res) {
              if (res.confirm) {
                getBookShelfRemoveSave({openId , fileName})
                .then(response=>{
                  vue.getBookShelf()
                })
              }
            }
          })
        }
      },
			readBook(href){
        //阅读书本

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
			},
      getBookShelf(){
        //书架的状态
        const openId = getStorageSync('openId')
        const {fileName} = this.$route.query
        if(openId && fileName){
        	getBookShelf({openId , fileName})
        	.then((response)=>{
            const {data} = response.data
            if(data.length === 0){
              this.isInShelf = false
            }else{
              this.isInShelf = true
            }
        	})
        }
      }
		},
		mounted() {
			this.getBookDetail()
			this.getDetailContents()
      this.getBookShelf()
		}
	}
</script>

<style lang="scss">
  .detail-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 15px;
    border-top: 1px solid #eee;
    box-shadow: 0 -2px 4px 0 rgba(0,0,0,.1);

    .detail-btn-wrapper {
      flex: 1;
      .detail-btn-read {
        width: 100%;
        border: none;
        color: #fff;
        background: #1EA3F5;
        margin-left: 7.5px;
      }

      .detail-btn-shelf {
        width: 100%;
        color: #1EA3F5;
        background: #fff;
        border: 1px solid #1EA3F5;
        margin-right: 7.5px;
      }

      .detail-btn-remove {
        width: 100%;
        color: #F96128;
        background: rgba(255, 175, 155, .3);
        border: 1px solid #FFAF9B;
        margin-right: 7.5px;
      }
    }
  }
</style>

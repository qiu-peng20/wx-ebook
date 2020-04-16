<template>
  <div>
   <shelfUserInfo :num="shelfList.length" :userInfo="userInfo"></shelfUserInfo>
   <shelfLists :shelfList="shelfList"></shelfLists>
  </div>
</template>

<script>
  import shelfLists from '../../components/shelfInfo/ShelfList.vue'
  import shelfUserInfo from '../../components/shelfInfo/ShelfUserInfo.vue'
  import {getUserDay,getBookShelf} from '../../api/index.js'
  import {getStorageSync} from '../../api/wechat.js'
  export default{
    components:{
      shelfUserInfo,shelfLists
    },
    data(){
      return{
        userInfo:{},
        shelfList:[]
      }
    },
    mounted() {
      const openId = getStorageSync('openId')
      this.userInfo = getStorageSync('userInfo')
      getBookShelf('openId').then(response=>{
        this.shelfList = response.data.data
        console.log(this.shelfList)
      })
    }
  }
</script>

<style>
</style>

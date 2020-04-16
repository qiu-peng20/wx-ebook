<template>
  <div>
    <homeBook
    :data="category"
    :showtitle="false"
    :showBtn="false"
    :showTitle="false"
    :col=2
    :row="this.category.length/2"
    :mode="modeCategory"
    ></homeBook>
  </div>
</template>

<script>
  import homeBook from '../../components/home/HomeBook.vue'
  import {getCategory} from '../../api/index.js'
  import {HOME_BOOK_MODE} from '../../utils/const.js'
  export default{
    components:{
      homeBook
    },
    data(){
      return{
        category:[]
      }
    },
    mounted() {
      getCategory()
      .then(response=>{
        this.category = response.data.data
      })
    },
    computed:{
      modeCategory(){
        return HOME_BOOK_MODE.CATEGORY
      }
    }
  }
</script>

<style>
</style>

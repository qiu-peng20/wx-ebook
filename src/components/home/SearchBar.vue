<template>
	<div class="search-bar">
		<div class="search-bar-wrapper">
			<van-icon class="search" name="search" color="#858c96"></van-icon>
			<input 
			class="search-bar-input"
			:focus="focus"
			:disabled="disabled"
			:maxlength="limit"
			:placeholder="hotSearch.length === 0 ? '搜索':hotSearch"
			v-model="searchWord"
			confirm-type="search"
			@input="onChange"
			@confirm="onConfirm"
			>
			<van-icon class="clear" name="clear" color="#858c96"
			@click="onClearClick" v-if='searchWord.length>0'></van-icon>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			focus:{
				//失去焦点
				type:Boolean,
				default:false
			},
			disabled:{
				//搜索框禁用
				type:Boolean,
				default:false
			},
			limit:{
				//限制字符数量
				type:Number,
				default:50
			},
			hotSearch:{
				//热门信息
				type:Array,
				default:''
			}
		},
		data() {
			return{
				searchWord:''
			}
		},
		methods:{
			onSearchBarClick(){
				this.$emit('onSearch')
			},
			onClearClick(){
				this.searchWord = ''
				this.$emit('onClear')
			},
			onChange(e){
				const {value} = e.mp.detail;
				this.$emit('onChange',value)
			},
			onConfirm(e){
				const {value} = e.mp.detail;
				this.$emit('onConfirm',value)
			},
			setValue(v){
				this.searchWord = v;
			},
			getValue(v){
				return this.searchWord;
			}
		}
	}
</script>

<style lang="scss">
	.search-bar{
		padding: 15px 15.5px;
		.search-bar-wrapper{
			background: #f5f7f9;
			border-radius: 20px;
			display: flex;
			align-items: center;
			padding: 12px 17px;
			box-sizing: border-box;
			.search,.clear{
				height: 100%;
				display: flex;
				align-items: center;
			}
			.search-bar-input{
				margin: 0 8px;
				flex: 1;
			}
			
		}
	}
</style>

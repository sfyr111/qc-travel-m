<template>
	<div class="filter-footer-button">
		<slot></slot>
	</div>
</template>

<style>
	.filter-footer-button{
		width: 100%;
		height: .66rem;
		display: -webkit-box;
		display: box;
		display: -webkit-flex;
		display:flex;
	}
	.filter-footer-button div.flex_btn{
		display: block;
		height: .66rem;
		line-height: .66rem;
		overflow: hidden;
		text-align: center;
		font-size: .26rem;
		cursor: pointer;
		-webkit-box-flex:1;
		box-flex: 1;
		-webkit-flex:1;
		flex:1;
	}
	.filter-footer-button div.flex_btn{
		position: relative;
		border: none;
		padding: 0;
		z-index: 10;
	}
	.filter-footer-button div.flex_btn:before{
		display: block;
		content: "";
		width: 1px;
		height: .3rem;
		background: #a0a0a0;
		position: absolute;
		top: 50%;
		right: 0;
		transform: translate3d(0, -50%, 0);
	}
	.filter-footer-button div.flex_btn:last-child:before{
		display: none;
	}
</style>
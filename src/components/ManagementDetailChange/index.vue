<template>
    <!-- <div class="change-single">
        <div class="air-order-information color_66">
            <p class="air-company clearfix">
                <span class="fl">单程</span>
                <span class="text">海南航空</span>
                <span class="text">HU7710</span>
                <i class="text">|</i>
                <span class="text">经济舱</span>
                <span class="fr text">退改签</span>
            </p>
            <div class="air-destination">
                <span class="color_33">深圳</span>
                <i class="icon iconfont icon-jiantou1"></i>
                <span class="color_33">北京</span>
            </div>
            <div class="air-time clearfix">
                <div class="fl">
                    <p>2017-02-18 12:30</p>
                    <p>宝安机场</p>
                </div>
                <div class="fr">
                    <p>2017-02-18 16:30</p>
                    <p>首都机场T3</p>
                </div>
            </div>
        </div>
    </div> -->
    <div class="change-double">
        <div class="air-order-information color_66">
            <p class="air-company clearfix">
                <span class="fl">去程</span>
                <span class="text">海南航空</span>
                <span class="text">HU7710</span>
                <i class="text">|</i>
                <span class="text">经济舱</span>
                <span class="fr text">退改签</span>
            </p>
            <div class="air-destination">
                <span class="color_33">北京</span>
                <i class="icon iconfont icon-jiantou1"></i>
                <span class="color_33">深圳</span>
            </div>
            <div class="air-time clearfix border border-bottom">
                <div class="fl">
                    <p>2017-02-18 16:30</p>
                    <p>首都机场T3</p>
                </div>
                <div class="fr">
                <p>2017-02-18 12:30</p>
                    <p>宝安机场</p>
                </div>
            </div>
        </div>
        <div class="air-order-information color_66">
            <p class="air-company clearfix">
                <span class="fl">返程</span>
                <span class="text">海南航空</span>
                <span class="text">HU7710</span>
                <i class="text">|</i>
                <span class="text">经济舱</span>
                <span class="fr text">退改签</span>
            </p>
            <div class="air-destination">
                <span class="color_33">深圳</span>
                <i class="icon iconfont icon-jiantou1"></i>
                <span class="color_33">北京</span>
            </div>
            <div class="air-time clearfix">
                <div class="fl">
                    <p>2017-02-18 12:30</p>
                    <p>宝安机场</p>
                </div>
                <div class="fr">
                    <p>2017-02-18 16:30</p>
                    <p>首都机场T3</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .air-order-information{
        background: #fff;
        width: 100%;
        border-radius: .1rem;
        font-size: .3rem;
    }
    .air-order-information .air-company{
        padding:.25rem .3rem 0;
    }
    .air-order-information .air-company .text{
        line-height: .55rem;
        color:#333;
        font-size: .32rem;
    }
    .air-order-information .air-company span.fl{
        display: block;
        padding:.1rem .2rem;
        background: #32a9fb;
        color:#fff;
        border-radius: .1rem;
        margin-right: .1rem;
    }
    .air-order-information .air-company span.fr{
        display: block;
        color:#32a9fb;
    }
    .air-order-information .air-destination{
        text-align: center;
        padding:.15rem .4rem;
        font-size: .4rem;
    }
    .air-order-information .air-destination i{
        padding:0 .25rem;
    }
    .air-order-information .air-time{
        margin:0 .4rem;
    }
    .air-order-information .air-time div.fl{
        width: 45%;
        text-align: right;
        padding-bottom: .3rem;
    }
    .air-order-information .air-time div.fr{
        width: 45%;
        text-align: left;
        padding-bottom: .3rem;
    }
</style>

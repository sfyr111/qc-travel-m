<template>
    <div class="air-order-information color_66">
        <p class="air-company">
            <span>海南航空</span>
            <span>HU7710</span>
            <i>|</i>
            <span>经济舱</span>
        </p>
        <div class="air-destination">
            <span class="color_33">深圳</span>
            <i class="icon iconfont icon-iconfonteg"></i>
            <i class="icon iconfont icon-jiantou1"></i>
            <span class="color_33">北京</span>
        </div>
        <div class="air-time clearfix border border-bottom">
            <div class="fl">
                <p>2017-02-18 12:30</p>
                <p>宝安机场</p>
            </div>
            <div class="fr">
                <p>2017-02-18 16:30</p>
                <p>首都机场T3</p>
            </div>
        </div>
        <div class="air-price clearfix">
            <div class="fl"><span>￥1250</span>共<em>1</em>人</div>
            <div class="fr">待支付</div>
        </div>
    </div>
</template>

<style scoped>
    .air-order-information{
        background: #fff;
        width: 100%;
        border-radius: .1rem;
        font-size: .3rem;
        margin-bottom: .2rem;
    }
    .air-order-information .air-company{
        padding:.25rem .3rem;
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
    .air-order-information .air-price{
        padding:.15rem .3rem;
    }
    .air-order-information .air-price div.fl{
        line-height: .6rem;
    }
    .air-order-information .air-price div.fl span{
        font-weight: bold;
        color:#e30b22;
        padding-right: .1rem;
    }
    .air-order-information .air-price div.fr{
        padding:.1rem .2rem;
        background: #eeeeee;
        border-radius: .3rem;
    }
</style>

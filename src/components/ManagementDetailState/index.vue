<template>
    <div class="management-detail-state color_66">
        <ul>
            <li>
                <p>订单号：<span class="color_33">2017120101</span></p>
            </li>
            <li>
                <p>下单时间：<span class="color_33">2017-01-01 14:22:20</span></p>
            </li>
            <li>
                <p>订单状态：<span class="color_33">待支付</span></p>
            </li>
            <li class="border border-t">
                <div class="border border-all">立即付款</div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .management-detail-state{
        background: #fff;
        border-radius: .1rem;
        padding:.25rem .25rem 0;
        margin-bottom: .2rem;
        font-size: .3rem;
    }
    .management-detail-state ul li p{
        line-height: .5rem;
    }
    .management-detail-state ul li:nth-child(3){
        padding-bottom: .2rem;
    }
    .management-detail-state ul li:nth-child(4){
        padding:.2rem 0;
    }
    .management-detail-state ul li:nth-child(4) div{
        width: 2.5rem;
        padding:.2rem 0;
        text-align: center;
        margin:0 auto;
        color:#e40b20;
        border-radius: .05rem;
    }
    .management-detail-state ul li:nth-child(4) div:after{
        border-color: #e40b20;
        border-radius: .1rem;
    }
</style>
<template>
    <div class="management-center color_33">
        <ul>
            <li class="air-order clearfix border border-bottom" @click="toAirOrder">
                <div class="fl"><img src="../assets/jipiao.svg"></div>
                <div class="fl">机票订单</div>
                <div class="fr"><i class="icon iconfont">&#xe620;</i></div>
            </li>
            <li class="hotel-order clearfix" @click="toHotelOrder">
                <div class="fl"><i class="icon iconfont orange_icon">&#xe640;</i></div>
                <div class="fl">酒店订单</div>
                <div class="fr"><i class="icon iconfont">&#xe620;</i></div>
            </li>
            <li class="clearfix">
                <div class="fl color_66">客服热线：</div>
                <div class="fl">4008-556-331</div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        methods: {
            // 跳转到机票订单页面
            toAirOrder(){
                this.$router.push({
                    name: 'managementairorder'
                })
            },
            // 跳转到酒店订单页面
            toHotelOrder(){
                this.$router.push({
                    name: 'managementhotelorder'
                })
            }
        }
    }
</script>

<style scoped>
    .management-center{
        padding-top: .2rem;
        font-size: .3rem;
        line-height: .56rem;
    }
    .management-center ul li{
        background: #fff;
        padding:.2rem .3rem;
    }
    .management-center ul li.hotel-order{
        margin-bottom: .2rem;
    }
    .management-center ul li.air-order img{
        display: block;
        width: .56rem;
        height: .56rem;
        padding:0 .1rem;
    }.management-center ul li.hotel-order div.fl i{
        font-size: .56rem;
        padding:0 .1rem;
    }
</style>
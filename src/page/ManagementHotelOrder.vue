<template>
    <div class="management-hotel-order-content">
        <div class="hotel-order-information color_66" @click="toHotelDetail">
            <ul>
                <li class="clearfix color_33 font32">
                    深证市航海格云大酒店
                    <span class="fr">￥650</span>
                </li>
                <li>
                    经天路78号经天路78号
                    <span>（地铁惊天站F出口）</span>
                </li>
                <li class="clearfix">
                    02-14至02-15 1晚/1间
                    <span class="fr color_33">待支付</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            // 跳转到酒店详情页
            toHotelDetail(){
                this.$router.push({
                    name: 'managementhoteldetail'
                })
            }
        }
    }
</script>

<style scoped>
    .management-hotel-order-content{
        padding:.2rem;
    }
    .management-hotel-order-content .hotel-order-information{
        background: #fff;
        border-radius: .1rem;
        font-size: .3rem;
        padding:.3rem;
    }
    .management-hotel-order-content .hotel-order-information ul li{
        padding-bottom:.1rem;
    }
    .management-hotel-order-content .hotel-order-information ul li:nth-child(1) span{
        color:#e40b20;
        font-weight: bold;
    }
</style>
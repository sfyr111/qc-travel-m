<template>
    <div class="management-hotel-detail-content">
        <management-detail-state></management-detail-state>
        <div class="information color_66">
            <div class="part">
                <table>
                    <caption class="color_33" align="top">深圳罗湖口岸一盒酒店</caption>
                    <tr>
                        <td>地址</td>
                        <td class="color_33">沿河南口路1223号</td>
                    </tr>
                    <tr>
                        <td>房型</td>
                        <td class="color_33">豪华商务房</td>
                    </tr>
                    <tr>
                        <td>入住时间</td>
                        <td class="color_33">2017-01-12至2017-01-15</td>
                    </tr>
                    <tr>
                        <td>电话</td>
                        <td class="color_33">12345602542</td>
                    </tr>
                </table>
            </div>
            <div class="part">
                <table>
                    <tr>
                        <td>入住人</td>
                        <td class="color_33">韩梅梅</td>
                    </tr>
                    <tr>
                        <td>联系电话</td>
                        <td class="color_33">15623212321</td>
                    </tr>
                </table>
            </div>
            <div class="part">
                <table>
                    <tr>
                        <td>发票信息</td>
                        <td class="color_33">不开发票</td>
                    </tr>
                    <tr>
                        <td>发票信息</td>
                        <td class="color_33">深圳是弄撒科技有限公司</td>
                    </tr>
                    <tr>
                        <td>收件人</td>
                        <td class="color_33">张三</td>
                    </tr>
                    <tr>
                        <td>手机号</td>
                        <td class="color_33">12354254125</td>
                    </tr>
                    <tr>
                        <td>收件地址</td>
                        <td class="color_33">广东省深圳市宝安区西乡街道化纤新村那思考的圣诞节1111</td>
                    </tr>
                </table>
            </div>
            <div class="part">
                <table>
                    <tr>
                        <td>房价</td>
                        <td class="price">￥375&times;2</td>
                    </tr>
                    <tr>
                        <td>服务费</td>
                        <td class="price">￥0</td>
                    </tr>
                    <tr>
                        <td>总价</td>
                        <td class="price">￥800</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { ManagementDetailState } from '../../components'
    export default {
        components: {
            ManagementDetailState
        }
    }
</script>


<style scoped>
    .management-hotel-detail-content{
        padding:.2rem;
    }
    .management-hotel-detail-content .information .part{
        background: #fff;
        margin-top: .2rem;
        border-radius: .1rem;
        padding:.2rem;
        font-size: .3rem;
    }
    .management-hotel-detail-content .information .part table{
        width: 100%;
    }
    .management-hotel-detail-content .information .part table tr td{
        padding:.05rem;
    }
    .management-hotel-detail-content .information .part table tr td:nth-child(1){
        width: 30%;
    }
    .management-hotel-detail-content .information .part table tr td.price{
        color:#e40b20;
    }
    .management-hotel-detail-content .information .part table caption{
        text-align: left;
        padding:.05rem;
    }
</style>

<template>
    <div class="management-air-detail-content">
        <management-detail-state></management-detail-state>
        <management-detail-change></management-detail-change>
        <div class="information color_66" v-if="OrderAirDetail">
            <div class="part" v-for="ticket in OrderAirDetail.trips">
                <table>
                    <tr>
                        <td>乘机人</td>
                        <td class="color_33">{{ticket.psgname}}</td>
                    </tr>
                    <tr>
                        <td>证件号</td>
                        <td class="color_33">{{ticket.certid}}</td>
                    </tr>
                    <tr>
                        <td>乘机人</td>
                        <td class="color_33">张三</td>
                    </tr>
                    <tr>
                        <td>证件号</td>
                        <td class="color_33">456555632211111544</td>
                    </tr>
                </table>
            </div>
            <div class="part" v-if="OrderAirDetail.order">
                <table>
                    <tr>
                        <td>联系人</td>
                        <td class="color_33">{{OrderAirDetail.order.conctactName}}</td>
                    </tr>
                    <tr>
                        <td>联系电话</td>
                        <td class="color_33">{{OrderAirDetail.order.conctactMobile}}</td>
                    </tr>
                </table>
            </div>
            <div class="part">
                <table v-if="OrderAirDetail.travelReimburseInfo">
                    <tr>
                        <td>发票信息</td>
                        <td class="color_33">{{OrderAirDetail.travelReimburseInfo.title}}</td>
                    </tr>
                    <tr>
                        <td>收件人</td>
                        <td class="color_33">{{OrderAirDetail.travelReimburseInfo.recipients}}</td>
                    </tr>
                    <tr>
                        <td>手机号</td>
                        <td class="color_33">{{OrderAirDetail.travelReimburseInfo.telNo}}</td>
                    </tr>
                    <tr>
                        <td>收件地址</td>
                        <td class="color_33">{{OrderAirDetail.travelReimburseInfo.provinceName}}{{OrderAirDetail.travelReimburseInfo.cityName}}{{OrderAirDetail.travelReimburseInfo.areaName}}{{OrderAirDetail.travelReimburseInfo.addr}}</td>
                    </tr>
                </table>
            </div>
            <div class="part">
                <table>
                    <tr>
                        <td>机票价</td>
                        <td class="price">￥3757&times;2</td>
                    </tr>
                    <tr>
                        <td>机建/燃油费</td>
                        <td class="price">￥50</td>
                    </tr>
                    <tr>
                        <td>保险</td>
                        <td class="price">￥200</td>
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
    import { ManagementDetailState, ManagementDetailChange } from '../../components'
    import configUrl from '../../data/configUrl'
    import {mapGetters} from 'vuex'
    export default {
        components: {
            ManagementDetailState,
            ManagementDetailChange
        },
        created() {
            this.queryInfo(this.orderNo)
        },
        computed: {
          ...mapGetters({
            OrderAirDetail: 'getOrderAirDetail'
          }),
        },
        data () {
            return {
              orderNo: this.$route.query.orderNo
            }
        },
        methods: {
            queryInfo (orderNo) {
              let opt = {
                url: configUrl.OrderAirDetail.dataUrl,
                type: 'get',
                data: {
                  orderId: orderNo
                }
              };
              this.$store.dispatch('orderAirDetail', opt)
            }
        }
    }
</script>

<style scoped>
    .management-air-detail-content{
        padding:.2rem;
    }
    .management-air-detail-content .information .part{
        background: #fff;
        margin-top: .2rem;
        border-radius: .1rem;
        padding:.2rem;
        font-size: .3rem;
    }
    .management-air-detail-content .information .part table{
        width: 100%;
    }
    .management-air-detail-content .information .part table tr td{
        padding:.05rem;
    }
    .management-air-detail-content .information .part table tr td:nth-child(1){
        width: 30%;
    }
    .management-air-detail-content .information .part table tr td.price{
        color:#e40b20;
    }
</style>

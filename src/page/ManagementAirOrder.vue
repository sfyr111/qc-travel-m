<template>
    <div class="management-air-order-content">
        <management-air-order @click.native="toAirDetail"></management-air-order>
    </div>
</template>

<script>
    import { ManagementAirOrder } from '../components'
    export default {
        components: {
            ManagementAirOrder
        },
        methods: {
            // 跳转到机票详情页面
            toAirDetail(){
                this.$router.push({
                    name: 'managementairdetail'
                })
            }
        }
    }
</script>

<style scoped>
    .management-air-order-content{
        padding:.2rem;
    }
</style>
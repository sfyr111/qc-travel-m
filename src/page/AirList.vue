<template>
  <div>

    <air-list-head></air-list-head>

    <air-list-table></air-list-table>

    <air-list-foot></air-list-foot>

  </div>
</template>
<script>
  import { AirListHead, AirListTable, AirListFoot } from '../components'
  export default {
  	components: {
      AirListHead,
      AirListTable,
      AirListFoot
    },
  	created: function () {
      console.log(this.$route.query)
    }
  }
</script>

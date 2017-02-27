<template>
  <div>

    <air-list-head 
    :date="dateStr" 
    @select-date="setDate" 
    :city-dep="cityDep" 
    :city-arr="cityArr"></air-list-head>

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
    created: function() {     
      if (this.isDep) {
        this.dateStr = this.startDate
      }
      if (!this.isDep) {
        this.dateStr = this.endDate
      }
    },
    data () {
      return {        
        startDate: this.$route.query.startDate,
        endDate: this.$route.query.endDate,
        cityDep: this.$route.query.depCity,
        cityArr: this.$route.query.arrCity,
        isDep: true,
        dateStr: ''
      }
    },
    methods: {
      setDate (val) {
        if (this.isDep) {
          this.startDate = val
        }
        if (!this.isDep) {
          this.endDate = val
        }
        this.dateStr = val
      }
    }
  }
</script>

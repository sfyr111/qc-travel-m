import Mock from 'mockjs'
import configUrl from './configUrl'
import data from './data'

const setData = {
  ciryAir: function () {
    Mock.mock(configUrl.ciryAir.pattern, testData.ciryAir)
  }

}
export default setData

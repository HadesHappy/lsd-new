import axios from 'axios'

export default axios.create({
  baseURL: 'https://min-api.cryptocompare.com/data',
  headers:{
    apiKey: '93e806d9ae109bb1613313c6787462fe9f9234bc006b3f489f717c1dd68a7bda'
  }
})
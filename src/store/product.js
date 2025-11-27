import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [], // 由後端取得，不再預設硬編碼
    loading: false,
    error: null,
  }),
  getters: {
    getProductById: (state) => {
      return (id) => state.products.find((p) => p.productId === id)
    },
  },
  actions: {
    // 抓取後端商品資料
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('http://localhost:8080/api/products')
        this.products = response.data
      } catch (err) {
        console.error('抓取商品資料失敗：', err)
        this.error = '抓取商品資料失敗'
      } finally {
        this.loading = false
      }
    },

    // 新增商品（若需要，會同步呼叫後端 API）
    async addProduct(product) {
      try {
        const response = await axios.post('http://localhost:8080/api/products', product)
        this.products.push(response.data)
      } catch (err) {
        console.error('新增商品失敗：', err)
      }
    },

    // 更新商品（若需要，會同步呼叫後端 API）
    async updateProduct(id, updated) {
      try {
        const response = await axios.put(`http://localhost:8080/api/products/${id}`, updated)
        const index = this.products.findIndex((p) => p.productId === id)
        if (index !== -1) {
          this.products[index] = { ...this.products[index], ...response.data }
        }
      } catch (err) {
        console.error('更新商品失敗：', err)
      }
    },
  },
})

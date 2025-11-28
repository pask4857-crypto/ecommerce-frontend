import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    loading: false, // 新增 loading
    error: null, // 新增 error
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
        // 將圖片檔名轉成完整 URL
        this.products = response.data.map((p) => ({
          ...p,
          mainImageUrl: p.image ? `http://localhost:8080/uploads/product-images/${p.image}` : null,
        }))
      } catch (err) {
        console.error('抓取商品資料失敗：', err)
        this.error = '抓取商品資料失敗'
      } finally {
        this.loading = false
      }
    },

    // 新增商品（測試用）
    async addProduct(product) {
      try {
        const response = await axios.post('http://localhost:8080/api/products', product)
        this.products.push(response.data)
      } catch (err) {
        console.error('新增商品失敗：', err)
      }
    },

    // 更新商品（若後端未實作 PUT，可以暫時不呼叫）
    async updateProduct(id, updated) {
      console.warn('updateProduct 方法暫時未連接後端 PUT API')
      const index = this.products.findIndex((p) => p.productId === id)
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updated }
      }
    },
  },
})

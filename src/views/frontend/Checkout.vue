<template>
    <section class="checkout-page">
        <h1>結帳</h1>

        <!-- 訂單摘要 -->
        <div class="order-summary">
            <h2>訂單摘要</h2>
            <div v-if="cartStore.cartItems.length">
                <div v-for="item in cartStore.cartItems" :key="item.id" class="checkout-item">
                    <img :src="item.image" class="checkout-item-image" />
                    <div class="checkout-item-info">
                        <h3>{{ item.name }}</h3>
                        <p>價格：${{ item.price }}</p>
                        <p>數量：{{ item.quantity }}</p>
                        <p>小計：${{ item.price * item.quantity }}</p>
                    </div>
                </div>
                <div class="checkout-total">
                    總金額：${{ totalPrice }}
                </div>
            </div>
            <div v-else>
                購物車沒有任何商品
            </div>
        </div>

        <!-- 收件資訊 -->
        <div class="shipping-info">
            <h2>收件資訊</h2>
            <form @submit.prevent="submitOrder">
                <div>
                    <label>姓名</label>
                    <input v-model="form.name" required />
                </div>

                <div>
                    <label>電話</label>
                    <input v-model="form.phone" required />
                </div>

                <div>
                    <label>地址</label>
                    <input v-model="form.address" required />
                </div>

                <button type="submit">送出訂單並前往付款</button>
            </form>
        </div>
    </section>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useCartStore } from "@/store/cart"
import { useRouter } from 'vue-router'
import axios from 'axios'

const cartStore = useCartStore()
const router = useRouter()

// 收件資訊表單
const form = reactive({
    name: '',
    phone: '',
    address: ''
})

// 總金額
const totalPrice = computed(() =>
    cartStore.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

// 送出訂單
async function submitOrder() {
    if (cartStore.cartItems.length === 0) {
        alert('購物車沒有商品')
        return
    }

    // 將表單資料與購物車明細整合成後端 DTO
    const orderData = {
        name: form.name,
        phone: form.phone,
        address: form.address,
        items: cartStore.cartItems.map(item => ({
            productId: item.productId || item.id,
            quantity: item.quantity
        }))
    }

    try {
        // 送出 POST 請求到後端
        const response = await axios.post('http://localhost:8080/api/orders', orderData)
        console.log('下訂單回傳資料：', response.data)

        // 下單成功後清空購物車
        cartStore.clearCart()

        alert(`訂單已成功送出，訂單編號：${response.data.orderId}，前往付款頁面`)

        router.push('/payment')
    } catch (error) {
        console.error('下訂單失敗：', error)
        alert('下訂單失敗，請稍後再試')
    }
}
</script>

<style scoped>
.checkout-page {
    padding: 20px;
}

.checkout-item {
    display: flex;
    gap: 12px;
    border-bottom: 1px solid #ddd;
    padding: 12px 0;
}

.checkout-item-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
}

.checkout-item-info {
    display: flex;
    flex-direction: column;
}

.checkout-total {
    font-weight: bold;
    margin-top: 12px;
}
</style>

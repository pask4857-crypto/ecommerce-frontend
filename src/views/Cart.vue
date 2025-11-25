<template>
    <div class="cart-page">
        <h1>購物車</h1>

        <!-- 如果購物車沒商品 -->
        <div v-if="cartStore.cartItems.length === 0">
            購物車是空的
        </div>

        <!-- 購物車商品列表 -->
        <div v-else class="cart-list">
            <div v-for="item in cartStore.cartItems" :key="item.id" class="cart-item">
                <img :src="item.image" :alt="item.name" class="cart-item-image" />
                <div class="cart-item-info">
                    <h3>{{ item.name }}</h3>
                    <p>價格: ${{ item.price }}</p>
                    <p>數量: {{ item.quantity }}</p>
                    <button @click="removeFromCart(item.id)">移除</button>
                </div>
            </div>

            <!-- 總金額 -->
            <div class="cart-total">
                總金額: ${{ totalPrice }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "../store/cart";

// ⭐ 使用購物車 store
const cartStore = useCartStore();

// ⭐ 計算總金額
const totalPrice = computed(() =>
    cartStore.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// ⭐ 移除商品
const removeFromCart = (id) => {
    cartStore.removeFromCart(id);
};
</script>

<style scoped>
.cart-page {
    padding: 20px;
}

.cart-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.cart-item {
    display: flex;
    gap: 12px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 12px;
}

.cart-item-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
}

.cart-item-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.cart-total {
    font-weight: bold;
    margin-top: 20px;
}
</style>

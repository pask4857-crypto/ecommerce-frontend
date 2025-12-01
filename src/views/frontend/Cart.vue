<template>
    <div class="cart-page">
        <h1>購物車</h1>
        <button class="back-button" @click="goBackToShop">返回購物頁面</button>

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

                    <!-- 數量調整 -->
                    <div class="quantity-control">
                        <span>數量: </span>
                        <button @click="decreaseQuantity(item.id)">➖</button>
                        <span>{{ item.quantity }}</span>
                        <button @click="increaseQuantity(item.id)">➕</button>
                    </div>
                    <p>小計: ${{ item.price * item.quantity }}</p>

                    <button class="remove-btn" @click="removeFromCart(item.id)">移除</button>
                </div>
            </div>

        </div>
        <!-- 總金額 -->
        <div class="cart-total">
            總金額: ${{ totalPrice }}
        </div>
        <button @click="$router.push('/checkout')">前往結帳</button>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/store/cart";
import { useRouter } from 'vue-router';

const router = useRouter()

const goBackToShop = () => {
    router.push('/products')
}

const cartStore = useCartStore();

// ⭐ 計算總金額
const totalPrice = computed(() =>
    cartStore.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// ⭐ 移除商品
const removeFromCart = (id) => {
    cartStore.removeFromCart(id);
};

// ⭐ 增加數量
const increaseQuantity = (id) => {
    cartStore.addToCart({ id }); // 可以重用 addToCart 的邏輯
};

// ⭐ 減少數量
const decreaseQuantity = (id) => {
    const item = cartStore.cartItems.find((i) => i.id === id);
    if (!item) return;

    if (item.quantity > 0) {
        item.quantity -= 1;
    } else {
        // 變成 0 就直接移除
        // cartStore.removeFromCart(id);
        item.quantity = 0;
    }
};
</script>

<style scoped>
.cart-page {
    padding: 20px;
}

.cart-list {
    display: flex;
    flex-direction: column;
    padding: 20px;
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

.quantity-control {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 6px 0;
}

.quantity-control button {}

.remove-btn {}

.cart-total {
    font-weight: bold;
    margin-top: 20px;
}
</style>

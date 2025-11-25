<template>
    <div class="product-card">
        <img :src="product.image" alt="product image" class="product-image" />
        <h3>{{ product.name }}</h3>
        <p class="price">NT$ {{ product.price }}</p>
        <button @click="addToCart(product)">加入購物車</button>
    </div>
</template>

<script setup>
import { useCartStore } from "../store/cart";

//  定義元件名稱（可選）
defineOptions({
    name: "ProductCard"
});

//  接收父元件傳入的 props
const props = defineProps({
    product: { type: Object, required: true }
});

//  使用 Store
const cartStore = useCartStore();

//  加入購物車的函式
const addToCart = (product) => {
    cartStore.addToCart(product);
    alert(`${product.name} 已加入購物車`);
};
</script>



<style>
.product-card {
    border: 1px solid #ddd;
    padding: 12px;
    border-radius: 8px;
    width: 180px;
    text-align: center;
}

.product-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
}

.price {
    font-weight: bold;
    margin: 6px 0;
}

button {
    padding: 6px 12px;
    cursor: pointer;
}
</style>

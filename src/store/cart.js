import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
    state: () => ({
        cartItems: [], // 購物車內容
    }),

    getters: {
        // 購物車商品總數
        totalItems: (state) =>
            state.cartItems.reduce((sum, item) => sum + item.quantity, 0),

        // 購物車總金額
        totalPrice: (state) =>
            state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    },

    actions: {
        // 新增商品到購物車（如果已存在則加數量）
        addToCart(product) {
            const existing = this.cartItems.find((item) => item.id === product.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                this.cartItems.push({ ...product, quantity: 1 });
            }
        },

        // 移除單一商品
        removeFromCart(productId) {
            this.cartItems = this.cartItems.filter((item) => item.id !== productId);
        },

        // 清空整個購物車
        clearCart() {
            this.cartItems = [];
        },

        // 更新商品數量（實務上也常用）
        updateQuantity(productId, quantity) {
            const item = this.cartItems.find((i) => i.id === productId);
            if (item) {
                item.quantity = quantity;
                if (item.quantity <= 0) {
                    this.removeFromCart(productId);
                }
            }
        },
    },
});

import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
    state: () => ({
        products: [
            { id: 1, name: "自動鉛筆", price: 49, image: "https://www.9x9.tw/public/files/product/thumb/N45534-09721S.jpg" },
            { id: 2, name: "筆記本 A5", price: 89, image: "https://www.9x9.tw/public/files/product/N40548-30711S.jpg" },
            { id: 3, name: "手持迷你刨刀", price: 120, image: "https://mall.iopenmall.tw/website/uploads_product/website_4046/P0404601713250_4_55156433.jpg" },
        ],
    }),
    getters: {
        getProductById: (state) => {
            return (id) => state.products.find(p => p.id === id);
        }
    },
    actions: {
        addProduct(product) {
            this.products.push(product);
        },
        updateProduct(id, updated) {
            const index = this.products.findIndex(p => p.id === id);
            if (index !== -1) {
                this.products[index] = { ...this.products[index], ...updated };
            }
        }
    }
});

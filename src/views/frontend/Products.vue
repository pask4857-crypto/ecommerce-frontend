    <template>
        <div class="products-page">
            <h1>商品列表</h1>
            <div class="product-list">
                <ProductCard v-for="product in productStore.products" :key="product.productId" :product="product" />
            </div>
        </div>
    </template>

<script setup>
import { onMounted } from "vue";
import { useProductStore } from "@/store/product";
import ProductCard from "@/components/ProductCard.vue";

//  定義元件名稱（可選）
defineOptions({
    name: "Products"
});

//  取得 product store
const productStore = useProductStore();

onMounted(() => {
    productStore.fetchProducts(); // 抓後端資料
});
</script>


<style>
.products-page {
    padding: 20px;
}

.product-list {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}
</style>

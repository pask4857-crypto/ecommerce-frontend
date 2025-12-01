<template>
    <div>
        <h1>商品管理</h1>

        <button @click="fetchProducts">重新整理</button>

        <!-- 新增商品 -->
        <h2>新增商品</h2>
        <form @submit.prevent="addProduct">
            <input v-model="newProduct.name" placeholder="商品名稱" />
            <input v-model.number="newProduct.price" type="number" placeholder="價格" />
            <input v-model="newProduct.description" placeholder="描述" />
            <input type="file" @change="handleFileChange" />

            <!-- 顯示檔案錯誤訊息 -->
            <p v-if="fileError" style="color:red">{{ fileError }}</p>

            <!-- 顯示上傳進度 -->
            <p v-if="uploadProgress >= 0">上傳進度: {{ uploadProgress }}%</p>

            <button>新增</button>
        </form>

        <hr />

        <!-- 商品列表 -->
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>商品名稱</th>
                    <th>價格</th>
                    <th>圖片</th>
                    <th>操作</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="p in products" :key="p.productId">
                    <td>{{ p.productId }}</td>
                    <td>{{ p.name }}</td>
                    <td>{{ p.price }}</td>
                    <td>
                        <img v-if="p.image" :src="p.image" width="50" />
                    </td>
                    <td>
                        <button @click="openEdit(p)">編輯</button>
                        <button @click="deleteProduct(p.productId)">刪除</button>

                        <!-- 更新圖片 -->
                        <input type="file" @change="e => updateImage(p.productId, e)" />
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- 編輯商品 Modal -->
        <div v-if="editing">
            <h3>編輯商品</h3>
            <input v-model="editProduct.name" />
            <input v-model.number="editProduct.price" />
            <input v-model="editProduct.description" />

            <button @click="saveEdit">儲存</button>
            <button @click="editing = false">取消</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const products = ref([]);

const fetchProducts = async () => {
    const res = await axios.get("http://localhost:8080/api/products");
    products.value = res.data;
};

onMounted(fetchProducts);

/* ---------------- 新增商品 ---------------- */

const newProduct = ref({ name: "", price: 0, description: "" });

// ⚡ 選擇檔案
const selectedFile = ref(null);

// ⚡ 檔案錯誤訊息
const fileError = ref("");

// ⚡ 上傳進度
const uploadProgress = ref(-1);

// ⚡ 最大檔案大小 1MB
const MAX_FILE_SIZE = 1 * 1024 * 1024;

// ⚡ 處理檔案選擇並檢查大小
const handleFileChange = e => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) { // 檔案過大
        selectedFile.value = null;
        fileError.value = "檔案太大，請選擇小於 1MB 的圖片。";
    } else {
        selectedFile.value = file;
        fileError.value = "";
    }
};

// ⚡ 新增商品
const addProduct = async () => {
    if (!newProduct.value.name) {
        fileError.value = "請輸入商品名稱";
        return;
    }

    // ⚡ 再次檢查檔案大小，防止 bypass
    if (selectedFile.value && selectedFile.value.size > MAX_FILE_SIZE) {
        fileError.value = "檔案太大，請選擇小於 1MB 的圖片。";
        return;
    }

    const formData = new FormData();
    formData.append(
        "product",
        new Blob([JSON.stringify(newProduct.value)], { type: "application/json" })
    );

    if (selectedFile.value) {
        formData.append("image", selectedFile.value);
    }

    try {
        uploadProgress.value = 0; // 初始化進度
        await axios.post("http://localhost:8080/api/products/upload", formData, {
            onUploadProgress: (progressEvent) => {
                uploadProgress.value = Math.round(
                    (progressEvent.loaded / progressEvent.total) * 100
                );
            }
        });

        fetchProducts();

        // 清空表單
        newProduct.value = { name: "", price: 0, description: "" };
        selectedFile.value = null;
        fileError.value = "";
        uploadProgress.value = -1; // 隱藏進度
    } catch (err) {
        console.error(err);
        fileError.value = "上傳失敗，請稍後再試。";
        uploadProgress.value = -1;
    }
};

/* ---------------- 刪除商品 ---------------- */

const deleteProduct = async (id) => {
    if (!confirm("確定要刪除嗎？")) return;
    await axios.delete(`http://localhost:8080/api/products/${id}`);
    fetchProducts();
};

/* ---------------- 編輯商品 ---------------- */

const editing = ref(false);
const editProduct = ref({});

const openEdit = (p) => {
    editing.value = true;
    editProduct.value = { ...p }; // 深複製
};

const saveEdit = async () => {
    await axios.put(
        `http://localhost:8080/api/products/${editProduct.value.productId}`,
        editProduct.value
    );
    editing.value = false;
    fetchProducts();
};

/* ---------------- 更新圖片 ---------------- */

const updateImage = async (productId, event) => {
    const file = event.target.files[0];
    if (!file) return;

    // ⚡ 更新圖片也做檔案大小檢查
    if (file.size > MAX_FILE_SIZE) {
        alert("檔案太大，請選擇小於 1MB 的圖片。");
        return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
        uploadProgress.value = 0;
        await axios.post(
            `http://localhost:8080/api/products/${productId}/image`,
            formData,
            {
                onUploadProgress: (progressEvent) => {
                    uploadProgress.value = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    );
                }
            }
        );
        fetchProducts();
        uploadProgress.value = -1;
    } catch (err) {
        console.error(err);
        alert("上傳圖片失敗，請稍後再試。");
        uploadProgress.value = -1;
    }
};
</script>

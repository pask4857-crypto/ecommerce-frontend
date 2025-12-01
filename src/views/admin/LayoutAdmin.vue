<template>
    <div class="admin-layout">
        <aside class="sidebar">
            <h2>後台管理</h2>
            <ul>
                <li><router-link to="/admin">首頁</router-link></li>
                <li><router-link to="/admin/products">商品管理</router-link></li>
                <li><router-link to="/admin/orders">訂單管理</router-link></li>
            </ul>
        </aside>

        <main class="content">
            <router-view />
        </main>
    </div>
</template>

<style>
.admin-layout {
    display: flex;
    min-height: 100vh;
}

.sidebar {
    width: 200px;
    background: #333;
    color: white;
    padding: 20px;
}

.sidebar a {
    color: white;
    text-decoration: none;
}

.content {
    flex: 1;
    padding: 20px;
}
</style>

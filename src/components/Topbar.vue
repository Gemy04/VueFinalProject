<template>
    <div class="top-bar">
        <div>Free Shipping on All orders Over $75!</div>
        <div>
            My Account |
            Wishlist |
            Currency: Usd |
            My cart(2)
        </div>
    </div>
    <div class="search-bar">
        <input type="text" placeholder="Search Here What You Need...." />
    </div>
</template>
<style scoped>
.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #cccccc4f;

}

.search-bar {
    padding: 10px;
    text-align: center;

}

.search-bar input {
    width: 35%;
    padding: 10px;
    border: 2px solid rgba(128, 128, 128, 0.114);
    border-radius: 7px;
}
</style>
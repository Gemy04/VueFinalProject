<template>
    <div class="searchForm">
        <div>
            <input type="text" v-model="searchTerm" @input="search" placeholder="Search..." />
            <ul v-if="!searching && products.length">
                <li v-for="product in products" :key="product.id">
                    <router-link :to="'/products/' + product.id">
                        <div class="showSearch">
                            <div class="img">
                                <img :src="product.image_url" alt="" />
                            </div>
                            <div class="productName">{{ product.name }}</div>
                        </div>
                    </router-link>
                </li>
            </ul>
            <p v-if="searching">Searching...</p>
            <p v-if="!searching && !products.length" class="nose"></p>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            searchTerm: "",
            products: [],
            searching: false,
        };
    },
    methods: {
        search() {
            if (this.searchTerm === "") {
                this.products = [];
                return;
            }
            this.searching = true;
            axios
                .get("http://localhost:8000/api/products?limit=4", {
                    params: {
                        search: this.searchTerm,
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    this.products = response.data.data;
                    this.searching = false;
                })
                .catch((error) => {
                    console.log(error);
                    this.searching = false;
                });
        },
    },
};
</script>
<style scoped>
.searchForm {
    display: flex;
    justify-content: center;
    align-items: center;
}

input {
    width: 300px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 16px;
    background-color: white;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 10px;
}

li {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    background-color: white;
}

.showSearch {
    display: flex;
    align-items: center;
}

.img {
    width: 50px;
    height: 50px;
    overflow: hidden;
    margin-right: 10px;
}


.nose {
    margin-top: 10px;
    font-size: 16px;
    color: #ccc;
}
.productName {
    font-size: 16px;
    font-weight: bold;
}

li:hover {
    background: #eee;
}

li:active {
    background: #ddd;
}

li:disabled {
    background: #ccc;
    cursor: not-allowed;
}

li:disabled:hover {
    background: #ccc;
}

li:disabled:active {
    background: #ccc;
}

li a {
    text-decoration: none;
    color: #000;
}

li a:hover {
    text-decoration: underline;
}

li a:active {
    text-decoration: none;
}

li a:disabled {
    color: #ccc;
}

li a:disabled:hover {
    text-decoration: none;
}
</style>
<template>
    <div v-if="isLoading">
        <div class="loader"></div>
    </div>
    <div v-else>
        <div class="headerImage">
            <h3 class="textOnImage"> Men Fashion</h3>
            <img src="/Men/header.jpg" alt="">
        </div>
        <div class="path">
            <router-link to="/">Home</router-link>
            <span> > </span>
            <router-link to="/Men">Men</router-link>
        </div>
        <div class="cont">
            <div class="row">
                <div class="col-md-3 col-sm-6" v-for="product in products" :key="product.id">
                    <div class="product-grid">
                        <div class="product-image">
                            <div class="image">
                                <img class="img-1" :src="product.image_url" />
                            </div>
                            <ul class="product-links">
                                <li><a @click="addToWishlist(product.id)"><i class="fa fa-heart"></i></a></li>
                                <li><a @click="addToCart(product.id)"><i class="fa fa-shopping-cart"></i></a></li>
                            </ul>
                            <router-link :to="'/products/' + product.id" class="product-view">
                                <i class="fa-solid fa-eye"></i>
                            </router-link>
                        </div>
                        <div class="product-content">
                            <ul class="rating">
                                <li v-for="i in 5" :class="i <= product.rating ? 'fas fa-star' : 'fas fa-star disable'">
                                </li>
                            </ul>
                            <h3 class="title"> <router-link :to="'/products/' + product.id">
                                    {{ product.name }} </router-link>
                            </h3>
                            <div class="price">{{ `$${product.price}` }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { useToast } from 'vue-toastification'

export default {
    data() {
        return {
            products: [],
            token: null,
            isLoading: true
        };
    },
    created() {
        this.token = localStorage.getItem("token");
    },
    mounted() {
        this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/products?category_id=1");
                console.log(response.data);
                this.products = response.data.data;
                this.products.forEach(product => {
                    product.rating = Math.floor(Math.random() * 5) + 1;
                    this.isLoading = false;

                });
            }
            catch (error) {
                console.log(error);
            }
        },
        async addToCart(productId) {
            const toast = useToast();
            if (this.token !== null) {
                try {
                    const response = await axios.post("http://127.0.0.1:8000/api/cart/add", {
                        product_id: productId,
                        quantity: 1,
                        session_id: this.session_id,
                    }, {
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    });
                    this.cartCount++;
                    console.log(response.data);
                    toast.success("Product added to cart successfully");
                }
                catch (error) {
                    console.error(error.response.data.message);
                    if (error) {
                        this.$router.push("/login");
                    }
                }
            }
        },
        async addToWishlist(productId) {
            const toast = useToast();
            if (this.token == null) {
                this.$router.push("/login");
            } else {
                try {
                    const response = await axios.post(
                        "http://127.0.0.1:8000/api/wishlists",
                        { product_id: productId },
                        {
                            headers: { Authorization: `Bearer ${this.token}` },
                        }
                    );
                    console.log(response.data);
                    toast.success("Product added to wishlist successfully");
                } catch (error) {
                    console.error(error.response.data.message);
                    if (error.response.status === 409) {
                        toast.error("Product already in wishlist");
                    } else {
                        toast.error("Product already in wishlist");
                    }
                }
            }
        },
    },
};

</script>

<style scoped>
.headerImage {
    width: 100%;
    height: 300px;
    overflow: hidden;
    position: relative;
    background-color: rgba(35, 35, 35, 0.662);
    margin-bottom: 5vh;


}

.headerImage img {
    width: 100%;
    height: 100%;
    opacity: 0.5;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
}

.textOnImage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 50px;
    font-weight: bold;
    z-index: 1;
}

.path {
    margin: 0 10vw;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5vh;
}

.path a {
    text-decoration: none;
    color: black;
}

.path :last-child {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.548);
}

.path span {
    color: #c236bb;
}



.cont {
    padding: 30px 0;
    width: 85%;
    margin: 0 auto;
}

.product-grid {
    font-family: 'Poppins', sans-serif;
    position: relative;
    overflow: hidden;
    margin-bottom: 30px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    padding: 15px;

}


.product-grid .product-image {
    overflow: hidden;
    position: relative;
    z-index: 1;
}

.product-grid .product-image a.image {
    display: block;
}

.product-grid .product-image img {
    width: 100%;
    height: auto;
}

.product-grid .product-image .img-1 {
    transition: all 0.3s ease 0s;
}

.product-grid:hover .product-image .img-1 {
    opacity: 1;
}

.product-grid .product-hot-label,
.product-grid .product-discount-label {
    color: #fff;
    background: #e03ed7;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    padding: 3px 10px;
    position: absolute;
    top: 10px;
    left: 10px;
}

.product-grid .product-discount-label {
    background: #ff3939;
    left: auto;
    right: 10px;
}

.product-grid .product-view {
    color: #fff;
    background: #000;
    font-size: 16px;
    text-align: right;
    line-height: 50px;
    width: 60px;
    height: 60px;
    padding: 0 16px 0 0;
    border-radius: 50px;
    opacity: 0;
    transform: scale(0);
    position: absolute;
    bottom: -40px;
    left: -40px;
    transition: all .3s ease;
}

.product-grid:hover .product-view {
    opacity: 1;
    transform: scale(1);
    bottom: -20px;
    left: -20px;
}

.product-grid .product-view:hover {
    background: #e03ed7;
}

.product-grid .product-links {
    padding: 0;
    margin: 0;
    list-style: none;
    transform: translateY(50%);
    position: absolute;
    bottom: 50%;
    right: 10px;
    z-index: 1;
}

.product-grid .product-links li {
    margin: 5px 0;
    opacity: 0;
    transform: translateX(100%);
    transition: all .3s ease;
}

.product-grid .product-links li:nth-child(2) {
    transition-delay: .1s;
}

.product-grid .product-links li:nth-child(3) {
    transition-delay: .2s;
}

.product-grid:hover .product-links li {
    opacity: 1;
    transform: translateX(0);
}

.product-grid .product-links li a {
    color: #000;
    background: #ffffff;
    font-size: 18px;
    text-align: center;
    line-height: 33px;
    width: 35px;
    height: 35px;
    border: 1px solid #000;
    border-radius: 25%;
    display: block;
    transition: all .3s ease;
}

.product-grid .product-links li a:hover {
    color: #fff;
    background: #e03ed7;
    border-color: #e03ed88e;
}

.product-grid .product-content {
    background: #fff;
    padding: 15px 0 0;
}

.product-grid .rating {
    color: #e03ed7;
    font-size: 11px;
    padding: 0;
    margin: 0 0 8px;
    list-style: none;
}

.product-grid .rating li {
    display: inline-block;
}

.product-grid .rating .disable {
    color: #a3a3a3;
}

.product-grid .title {
    font-size: 15px;
    font-weight: 500;
    text-transform: capitalize;
    margin: 0 0 8px;
}

.product-grid .title a {
    color: #333;
    transition: all 0.3s ease 0s;
}

.product-grid .title a:hover {
    color: #e03ed7;
}

.product-grid .price {
    color: #a3a3a3;
    font-size: 15px;
    font-weight: 500;
}

.product-grid .price span {
    color: #999;
    font-size: 14px;
    font-weight: 400;
    text-decoration: line-through;
    margin-right: 5px;
}

@media screen and (max-width: 767px) {
    .product-grid {
        margin-bottom: 30px;
    }

    .cont {
        width: 90%;
    }

    .product-grid .product-links li {
        opacity: 1;
        transform: translateX(0);
    }

    .product-grid .product-links li a {
        width: 35px;
        height: 35px;
        line-height: 33px;
        font-size: 18px;
    }

}
</style>
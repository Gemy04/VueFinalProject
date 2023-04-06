<template>
    <div>
        <div class="home">
            <div class="one">
                <button @click="setCategory('all')">All</button>
                <button @click="setCategory('1')">Men</button>
                <button @click="setCategory('2')">Women</button>
                <button @click="setCategory('3')">Kids</button>
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
    </div>
</template>
  
<script>
import axios from "axios";
import { useToast } from "vue-toastification";


export default {
    data() {
        return {
            products: [],
            category: "all",
            token: localStorage.getItem("token"),
        };
    },
    methods: {
        setCategory(category) {
            this.category = category;
            if (this.category === "all") {
                this.fetchAllProducts();
            } else {
                this.fetchProducts();
            }
        },
        fetchAllProducts() {
            axios
                .get("http://127.0.0.1:8000/api/products?limit=8")
                .then((response) => {
                    console.log(response.data);
                    this.products = response.data.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        fetchProducts() {
            axios
                .get(`http://127.0.0.1:8000/api/products?category_id=${this.category}`)
                .then((response) => {
                    console.log(response.data);
                    this.products = response.data.data;
                })
                .catch((error) => {
                    console.error(error);
                });
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
                        toast.error("Please login to add product to cart");
                        this.$router.push("/login");
                    }
                }
            }
        },
        async addToWishlist(productId) {
            const toast = useToast();
            if (this.token == null) {
                this.$router.push("/login");
                toast.error("Please login to add product to wishlist");
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

        computed: {
            displayedProducts() {
                return this.products.slice(0, 8);
            },
        },
        mounted() {
            this.fetchAllProducts();
        },
    };
</script>
  

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
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

button {
    --color: #c236bb;
    font-family: inherit;
    display: inline-block;
    width: 8em;
    height: 2.6em;
    line-height: 2.5em;
    margin: 20px;
    position: relative;
    overflow: hidden;
    border: 2px solid var(--color);
    transition: color .5s;
    z-index: 1;
    font-size: 17px;
    border-radius: 6px;
    font-weight: 500;
    color: var(--color);
}

button:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: var(--color);
    height: 150px;
    width: 200px;
    border-radius: 50%;
}

button:hover {
    color: #fff;
}

button:before {
    top: 100%;
    left: 100%;
    transition: all .7s;
}

button:hover:before {
    top: -30px;
    left: -30px;
}

button:active:before {
    background: #c236bb;
    transition: background 0s;
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

    button {
        width: 100%;
    }

    button:first-of-type {
        margin-top: 15vh;
    }


}
</style>
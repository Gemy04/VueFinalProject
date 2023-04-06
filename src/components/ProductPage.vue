<template>
    <div v-if="isLoading">
        <div class="loader"></div>
    </div>
    <div class="cont">
        <div v-if="product">
            <div class="path">
                <router-link to="/">Home</router-link>
                <span> &gt; </span>
                <router-link to="/products">Products</router-link>
                <span> &gt; </span>
                <span>{{ product.name }}</span>
            </div>
            <div class="pCont">
                <div class="product">
                    <div class="left">
                        <div class="pImg">
                            <img :src="product.image_url" :alt="product.name" />
                        </div>
                    </div>
                    <div class="right">
                        <div class="pName">
                            <h1>{{ product.name }}</h1>
                        </div>
                        <div class="pDesc">
                            <p>{{ product.description }}</p>
                        </div>
                        <div class="details">
                            <div class="pCategory">
                                <p>Category: {{ product.category }}</p>
                            </div>
                            <div class="pPrice">
                                <p>{{ `$${product.price}` }}</p>
                            </div>
                        </div>
                        <div class="pButtons">
                            <div class="pBtn">
                                <button @click="addToCart(product.id)">Add to Cart <i
                                        class="fas fa-shopping-cart"></i></button>
                            </div>
                            <div class="pBtn">
                                <button @click="addToWishlist(product.id)">Add to Wishlist <i
                                        class="fas fa-heart"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.cont {
    padding: 1rem;
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



.pCont {
    display: flex;
    justify-content: center;
}

.product {
    width: 80%;
    height: 50vh;
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem #ccc;
    overflow: hidden;
}

.left {
    width: 20%;
    margin: auto;
}

.right {
    width: 70%;
    padding: 0 1rem;

}

.pImg {
    display: flex;
    justify-content: center;
}

.pImg img {
    max-width: 300px;
    max-height: 300px;
    object-fit: contain;
}

.pName {
    margin-top: 1rem;
    text-align: start;
}

.pName h1 {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
}

.pDesc {
    margin: 1rem 0;
    text-align: justify;
}

.details {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.pCategory p,
.pPrice p {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
}

.pPrice p {
    color: #e03ed7;
}

.pButtons {
    display: flex;
    justify-content: center;
}

.pBtn {
    margin: 0 0.5rem;
}

.pBtn button {
    font-size: 1.1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #e03ed7;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

.pBtn button:hover {
    background-color: #4d174ad0;
}



@media screen and (max-width: 990px) {
    .product {
        flex-direction: column;
        height: auto;
    }

    .left {
        width: 100%;
        margin: 0;
    }

    .right {
        width: 100%;
        margin: 1rem 0;
    }

    .pImg img {
        max-width: 100%;
        max-height: 100%;
    }
}
</style>

<script>

import axios from 'axios'
import { useToast } from 'vue-toastification';

export default {
    data() {
        return {
            product: null,
            token: localStorage.getItem('token'),
            isLoading: true,
        }
    },
    mounted() {
        const productId = this.$route.params.productId
        console.log(productId)
        axios.get(`http://127.0.0.1:8000/api/products/${productId}`)
            .then(response => {
                this.product = response.data.data
                this.isLoading = false
            })
            .catch(error => {
                console.error(error)
            })
    },

    methods: {
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
                    toast.info(response.data.message);
                }
                catch (error) {
                    console.error(error.response.data.message);
                    if (error) {
                        this.$router.push("/login");
                    }
                }
            }
        }, async addToWishlist(productId) {
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
}
</script>


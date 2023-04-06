<template>
    <div v-if="isLoading">
        <div class="loader"></div>
    </div>
    <div v-else class="page">
        <h1 class="headerLine">My Wishlists</h1>
        <div class="wishlist">
            <div v-for="wishlist in wishlists" :key="wishlist.id" class="items">
                <div class="img">
                    <img :src="wishlist.image" :alt="wishlist.title" />
                </div>
                <div class="text">
                    <h2>{{ wishlist.name }}</h2>
                    <p>{{ wishlist.description }}</p>
                </div>
                <div class="price">
                    <p>Price: {{ wishlist.price }}$</p>
                    <button class="trash" @click="removeFromWishlist(wishlist.id, wishlist.pivot.product_id)">Trash</button>
                </div>
            </div>
        </div>
        <div class="browse">
            <button>
                <router-link to="/products">Browse Products</router-link>
            </button>
        </div>
    </div>
</template>
    

  
  


<style scoped>
.page {
    background-color: #f5f5f5;
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
}

.headerLine {
    font-size: 2rem;
    font-weight: 500;
    margin: 0;
    padding: 0;
    text-align: center;
    margin-bottom: 20px;
}


.wishlist {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
    padding: 0 20px;
}


.items {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0 20px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.items .img {
    width: 100%;
    max-width: 300px;
    margin-bottom: 20px;
    border: #000 solid 1px;
    border-radius: 2vh;

}

.items .img img {
    width: 100%;
    height: auto;
    border-radius: 2vh;

}

.items .text {
    margin-left: 2vh;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
}


.items .text h2 {
    text-align: start;
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
}

.items .text p {
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
    padding: 0;
}

.items .price {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
}

.items .price p {
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
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

.browse {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
    padding: 0 20px;
    margin-bottom: 20px;
}



.browse button a {
    text-decoration: none;
    color: #c236bb;
}

.browse button a:hover {
    color: white;
}



@media (min-width: 768px) {
    .items {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .items .img {
        width: 100%;
        max-width: 300px;
        margin-bottom: 0;
    }

    .items .title {
        width: 100%;
        max-width: 300px;
        margin-bottom: 0;
    }

    .items .description {
        width: 100%;
        max-width: 300px;
        margin-bottom: 0;
    }

    .items .price {
        width: 100%;
        max-width: 300px;
        margin-bottom: 0;
    }

    .items .trash {
        width: 100%;
        max-width: 300px;
        margin-bottom: 0;
    }
}
</style>



    

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
    data() {
        return {
            wishlists: [],
            token: null,
            isLoading: true,
        };
    },
    created() {
        this.token = localStorage.getItem('token');
    },
    mounted() {
        this.loadWishlists();
    },
    methods: {
        loadWishlists() {
            axios
                .get('http://127.0.0.1:8000/api/wishlists', {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    // console.log(response.data.data[0].pivot.product_id);
                    this.wishlists = response.data.data;
                    this.isLoading = false;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        removeFromWishlist(wishlistId, productId) {
            const toast = useToast();
            axios.delete(`http://127.0.0.1:8000/api/wishlists/${wishlistId}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
                params: { product_id: productId },
            })
                .then((response) => {
                    toast.success(response.data.message);
                    return this.loadWishlists();
                })
                .catch((error) => {
                    toast.error("Something went wrong");
                });
        },
    },
};
</script>
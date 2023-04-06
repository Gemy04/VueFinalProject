<template>
    <div class="cont">
        <h1 class="headText">Orders</h1>
        <div v-if="orders.length > 0" class="orderscont">
            <div class="order" v-for="order in orders" :key="order.id">
                <h2>Order #{{ order.checkout_id }}</h2>
                <div v-for="item in order.order_items" :key="item.id">
                    <p>{{ item.product_title }} </p>
                    <h4>Quantity :{{ item.quantity }}</h4>
                    <h4>Price:{{ item.price }}$</h4>
                </div>
                <p>Total: {{ order.total_price }}</p>
            </div>
        </div>
        <div v-else class="noOrders">
            <p>No orders yet</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Orders',
    data() {
        return {
            orders: [],
            token: null,
        }
    },
    created() {
        this.token = localStorage.getItem('token');
        this.fetchOrders();
    },
    methods: {
        async fetchOrders() {
            try {
                const response = await axios.get('http://localhost:8000/api/order', {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                });
                console.log(response.data);
                this.orders = response.data.data;
            }
            catch (error) {
                console.log(error);
            }
        },
    }
}

</script>

<style scoped>
.cont {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
}

.headText {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 50px;
}

.orderscont {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.order {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 1px solid black;
    padding: 20px;
    margin-bottom: 20px;
}

.noOrders {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 1px solid black;
    padding: 20px;
    margin-bottom: 20px;
}

.noOrders p {
    font-size: 20px;
    font-weight: 600;
}

.order p {
    font-size: 20px;
    font-weight: 600;
}

.order h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
}

.order h4 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
}

.order h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
}



</style>
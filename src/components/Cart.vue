<template>
  <div v-if="isLoading">
    <div class="loader"></div>
  </div>
  <div v-else class="container">
    <h1 class="title">My Cart</h1>
    <div class="cart">
      <table class="cart__table">
        <thead class="cart__table-headings">
          <tr>
            <th class="cart__table-cell">IMAGE</th>
            <th class="cart__table-cell">Product</th>
            <th class="cart__table-cell">Quantity</th>
            <th class="cart__table-cell">Price</th>
            <th class="cart__table-cell">Total</th>
            <th class="cart__table-cell">Action</th>
          </tr>
        </thead>
        <tbody class="cart__table-body">
          <tr v-for="item in cartItems" :key="item.id" class="cart__table-row">
            <td class="cart__table-cell"><img :src="item.product_image_url" alt=""></td>
            <td class="cart__table-cell">{{ item.product_name }}</td>
            <td class="cart__table-cell">
              <div class="cart__quantity-input">
                <button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1"
                  class="cart__quantity-button">-</button>
                <input type="number" v-model="item.quantity" @change="updateCartItem(item)" class="cart__input" min="1"
                  max="5">
                <button @click="increaseQuantity(item)" :disabled="item.quantity >= 5"
                  class="cart__quantity-button">+</button>
              </div>
            </td>
            <td class="cart__table-cell">{{ item.product_price }}</td>
            <td class="cart__table-cell">{{ item.total_price }}</td>
            <td class="cart__table-cell">
              <button @click="deleteCartItem(item)" class="cart__button">Remove</button>
            </td>
          </tr>
          <div v-if="cartItems.length === 0" class="cart__empty">
            <p>Your cart is empty</p>
          </div>
        </tbody>
      </table>
      <div class="cart__checkout">
        <div class="cart__payment">
          <label for="payment-method">Select Payment Method:</label>
          <select id="payment-method" v-model="selectedPaymentMethod">
            <!-- <option value="credit_card">Credit Card</option> -->
            <option value="cash_on_delivery">Cash on Delivery</option>
          </select>
        </div>
        <p class="cart__total">Total: {{ cartTotal }}</p>
        <div class="cart__button">
          <button @click="checkout" class="cart__button--primary">Checkout</button>
      </div>
      </div>
    </div>
  </div>
</template>




<script>
import axios from 'axios';
import { useToast } from 'vue-toastification'
import "vue-toastification/dist/index.css";
const toast = useToast();


export default {
  data() {
    return {
      isLoading: true,
      cartItems: [],
      token: "",
      selectedPaymentMethod: "",

    };
  },
  created() {
    this.token = localStorage.getItem("token");
    // console.log(this.token);
  },
  beforeMount() {
    this.getCartItems();
  },

  methods: {
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.updateCartItem(item);

      }
    },
    increaseQuantity(item) {
      if (item.quantity < 100) {
        item.quantity++;
        this.updateCartItem(item);
      }
    },
    getCartItems() {
      axios.get("http://localhost:8000/api/cart", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(response => {
        // console.log(response.data.data);
        this.cartItems = response.data.data;
        this.isLoading = false;
      });
    },
    updateCartItem(item) {
      axios.patch("http://localhost:8000/api/cart/item", {
        cart_item_id: item.id,
        quantity: item.quantity,
      }, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(response => {
        // console.log(response);
        toast.success('Cart item updated successfully.');
        this.getCartItems();
      });
    },
    deleteCartItem(item) {
      axios.delete("http://localhost:8000/api/cart/item", {
        data: {
          cart_item_id: item.id,
        },
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(response => {
        // console.log(response);
        toast.success('Cart item removed successfully.');
        this.getCartItems();
      });
    },
    checkout() {
      const toast = useToast();
      if (this.cartItems.length === 0) {
        toast.error('Your cart is empty. Please add items to your cart before proceeding to checkout.');
        return;
      }

      if (this.selectedPaymentMethod === "") {
        toast.error('Please select a payment method.');
        return;
      }
      // Disable checkout button
      const checkoutButton = document.querySelector(".cart__button--primary");
      checkoutButton.disabled = true;
      axios.post("http://localhost:8000/api/cart/checkout", {
        payment_method: this.selectedPaymentMethod,
      }, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then(response => {
        // console.log(response);
        this.getCartItems();
        toast.success('Your order has been successfully processed.');
      }).catch(error => {
        // console.error(error);
        toast.error('product quantity is exceeded');
      }).finally(() => {
        checkoutButton.disabled = false;
      });
    },
  },
  computed: {
    cartTotal() {
      let total = 0;
      for (let item of this.cartItems) {
        total += item.total_price;
      }
      return total.toFixed(2);
    },
  },
};
</script>


<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

}

.title {
  font-size: 3rem;
  margin-bottom: 1rem;

}

.cart {
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-gap: 2rem;
}

.cart__table-headings tr {
  display: flex;
  justify-content: space-between;
  background-color: #f3f3f3;
  padding: 1rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  align-items: center;

}

.cart__quantity-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.cart__table-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 1rem;
}

.cart__table-cell {
  flex: 1;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.cart__input {
  width: 35px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  text-decoration-style: none;
}

.cart__button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.cart__button:hover {
  background-color: #f3f3f3;
}

.cart__button--primary {
  background-color: #007aff;
  color: #fff;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

}

.cart__button--primary:hover {
  background-color: #0062cc;
}

.cart__checkout {
  background-color: #f3f3f3;
  border-radius: 4px;
  padding: 1rem;
}

.cart__total {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.cart__table-cell img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
}

.cart__empty {
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  margin-top: 2rem;
}



@media screen and (max-width: 768px) {
  .container {
    max-width: 100%;
    padding: 0.5rem;
  }

  .cart {
    display: block;
  }

  .cart__table-headings tr {
    display: none;
  }

  .cart__table-row {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    justify-content: center;
  }

  .cart__table-cell {
    display: block;
    padding: 1rem;
    border-bottom: none;
  }

  .cart__table-cell:first-child {
    margin-bottom: 0.5rem;
  }

  .cart__table-cell:last-child {
    display: flex;
    align-items: center;
  }

  .cart__table-cell:last-child select {
    margin-right: 1rem;
  }

  .cart__table-cell:last-child button {
    margin-top: 0.5rem;
  }

  .cart__checkout {
    text-align: center;
    margin-top: 1rem;
    padding: 1rem;
    align-items: center;
  }

  .cart__total {
    margin-bottom: 0.5rem;
  }

  .cart__button {
    margin-top: 0.5rem;

  }

  .cart__button--primary {
    margin-top: 0.5rem;
  }

  .cart__table-cell img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }

  .cart__table-cell {
    flex: 1;
  }
}
</style>





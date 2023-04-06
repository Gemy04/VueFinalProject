<template>
    <div class="top-bar">
        <div class="free">Free Shipping on All orders Over $75!</div>
        <div v-if="isLoggedIn" class="user">
            <router-link to="/profile">My Account</router-link>
            <router-link to="/wishlist">Wishlist</router-link>
            <router-link to="/cart">My cart</router-link>
            <router-link to="orders">Orders</router-link>
            <a @click="logout" class="pointer">Logout</a>
        </div>
        <div v-else class="guest">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
        </div>
    </div>
    <div class="search-bar">
        <Search />
    </div>
    <div class="logo-bar">
        <div class="logo">Fashion</div>
        <div class="links">
            <router-link to="/">Home</router-link>
            <router-link to="/products">Products</router-link>
            <router-link to="/men">Men</router-link>
            <router-link to="/Women">Women</router-link>
            <router-link to="/kids">Kids</router-link>
            <router-link to="/blog">Blog</router-link>
        </div>
        <div class="res">
            <div class="iconres" @click="toggleMobileMenu">
                <i class="fa-solid fa-bars"></i>
            </div>
            <div class="mobile-menu" :class="{ 'open': showMobileMenu }">
                <router-link to="/">Home</router-link>
                <router-link to="/products">Products</router-link>
                <router-link to="/men">Men</router-link>
                <router-link to="/Women">Women</router-link>
                <router-link to="/kids">Kids</router-link>
                <router-link to="/blog">Blog</router-link>
            </div>
        </div>
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

.user {
    display: flex;
    gap: 20px;
}

.user a {
    color: black;
    text-decoration: none;
}

.guest {
    display: flex;
    gap: 20px;
}

.guest a {
    color: black;
    text-decoration: none;
}

.search-bar {
    position: static;
    padding: 10px;
    text-align: center;
    z-index: 3;

}

.search-bar input {
    width: 35%;
    padding: 10px;
    border: 2px solid rgba(128, 128, 128, 0.114);
    border-radius: 7px;
}

.logo-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.852);
    color: white;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}



.links {
    display: flex;
    gap: 20px;

}

.pointer {
    cursor: pointer;
}

.links a {
    color: white;
    text-decoration: none;
}

.links a:hover {
    color: #f5f5f5;
    text-decoration: underline;
}

.links a:active {
    color: #f5f5f5;
    text-decoration: underline;
}

.res {
    display: none;
}

.mobile-menu {
    display: none;
    flex-direction: column;
    gap: 20px;
}

.mobile-menu.open {
    display: flex;
}

.mobile-menu a {
    color: white;
    text-decoration: none;
}

.mobile-menu a:hover {
    color: #f5f5f5;
    text-decoration: underline;
}

.mobile-menu a:active {
    color: #f5f5f5;
    text-decoration: underline;
}


@media screen and (max-width: 768px) {
    .links {
        display: none;
    }



    .res {
        display: block;
        font-size: 24px;
        cursor: pointer;
        text-align: center;
    }

    .iconres {
        color: white;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .mobile-menu {
        display: none;
    }

    .mobile-menu.open {
        display: flex;
    }

    .logo {
        font-size: 20px;
    }

    .logo-bar {
        padding: 10px 20px;
    }

    .search-bar input {
        width: 80%;
    }

    .search-bar {
        padding: 10px 20px;
    }

    .top-bar {
        flex-wrap: wrap;
        justify-content: center;
        padding: 5px;
    }

    .user,
    .guest {
        flex-direction: row;
        gap: 10px;
        text-align: center;
    }

    .user a,
    .guest a {
        display: block;
    }

    .free {
        display: none;
    }


}
</style>
  
<script>
import Search from './Search.vue';

export default {
    data() {
        return {
            showMobileMenu: false,
        };
    },
    methods: {
        toggleMobileMenu() {
            this.showMobileMenu = !this.showMobileMenu;
        },

        logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$router.push("/login");
        },
    },
    computed: {
        isLoggedIn() {
            const token = localStorage.getItem("token");
            return token !== null && token !== undefined;
        },
    },
    components: { Search }
};
</script>
  
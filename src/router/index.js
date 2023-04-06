import { createRouter, createWebHistory } from 'vue-router'
import Navbar from '../views/NavbarView.vue'
import Products from '../views/ProductsView.vue';
import Register from '../views/RegisterView.vue';
import Login from '../views/auth/LoginView.vue';
import Cart from '../views/CartView.vue';
import profile from '../views/ProfileView.vue';
import fresh from '../views/FreshView.vue';
import blog from '../views/BlogView.vue';
import Footer from '../views/FooterView.vue';
import Men from '../views/MenView.vue';
import Women from '../views/WomenView.vue';
import Kids from '../views/KidsView.vue';
import Wishlist from '../views/WishlistView.vue'; 
import Orders from '../views/OrdersView.vue';
import ProductPage from '../views/ProductPageView.vue';
import Search from '../views/SearchView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Navbar
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresAuth: false, // Set to false to allow access when logged in
      },
    },
    {
      path: '/men',
      name: 'men',
      component: Men,
    },
    {
      path: '/Women',
      name: 'Women',
      component: Women ,
    },
    {
      path: '/Kids',
      name: 'Kids',
      component: Kids ,
    },
    {
      path: '/Wishlist',
      name: 'Wishlist',
      component: Wishlist ,
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders ,
    },
    {
      path: '/products/:productId',
      name: 'product',
      component: ProductPage,
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search,
    },
    {
      path: '/fresh',
      name: 'fresh',
      component: fresh,
    },
    {
      path: '/blog',
      name: 'blog',
      component: blog,
    },
    {
      path: '/Footer',
      name: 'Footer',
      component: Footer,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false, // Set to false to allow access when logged in
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,

    },
    {
      path: '/products',
      name: 'products',
      component: Products,

    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: {
        requiresAuth: true,
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token')
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login')
  } else if ((to.name === 'login' || to.name === 'register') && loggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router;

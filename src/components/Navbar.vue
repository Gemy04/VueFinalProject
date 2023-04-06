
<template>
    <div>
        <Nav />
        <div class="firstCar">
            <swiper :slides-per-view="1" :space-between="50" navigation :pagination="{ clickable: true }" @swiper="onSwiper"
                @slideChange="onSlideChange">
                <swiper-slide class="swiper-slide">
                    <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                        alt="">
                </swiper-slide>
                <swiper-slide class="swiper-slide">
                    <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        alt="">
                </swiper-slide>
                <swiper-slide class="swiper-slide">
                    <img src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        alt="">
                </swiper-slide>
            </swiper>
        </div>
        <div class="home">
            <div class="sec">
                <div class="one">
                    <div class="firstimg">
                        <img src="/home/one.jpg" alt="">
                    </div>
                    <div class="text">
                        <h4>Hot Collection</h4>
                        <h3>New Trends</h3>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit labore, voluptate temporibus
                            commodi
                            reprehenderit, repellat vel blanditiis consequatur voluptatum rerum dolorum beatae! Delectus
                            ipsa
                            voluptatem ullam quae, atque cupiditate reprehenderit?</p>
                            <div class="MainButton">
                        <router-link to="/products" class="button"><button>
                                Shop Now
                            </button></router-link>
                            </div>
                    </div>
                </div>
                <div class="two">
                    <div>
                        <img src="/home/two.jpg" alt="">
                    </div>
                    <div>
                        <img src="/home/three.jpg" alt="">
                    </div>
                </div>
            </div>
        </div>
        <Fresh />
        <div class="CenterImage">
            <img src="/home/four.png" alt="">
        </div>
        <Fresh />
        <div class="secCar">
            <swiper :slides-per-view="1" :space-between="50" navigation :pagination="{ clickable: true }" @swiper="onSwiper"
                @slideChange="onSlideChange" class="swi">
                <swiper-slide class="swiper-slide">
                    <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                        alt="">
                </swiper-slide>
                <swiper-slide class="swiper-slide">
                    <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        alt="">
                </swiper-slide>
                <swiper-slide class="swiper-slide">
                    <img src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        alt="">
                </swiper-slide>
            </swiper>
        </div>
        <div class="latest-blogs">
            <div class="latest-blogs__header">
                <h2>Latest Blogs</h2>
            </div>
            <div v-if = "!blogs.length" class="cen">
                <h3>No Blogs added</h3>
            </div>
            <div class="latest-blogs__content">
                <div class="blog-card" v-for="blog in processedBlogs" :key="blog.id">
                    <div class="blog-card__image">
                        <img :src="getImageUrl(blog.image)" alt="blog Image" />
                    </div>
                    <div class="blog-card__text">
                        <h3>{{ blog.title }}</h3>
                        <p>{{ blog.content }}</p>
                        <p>Created At: {{ formatDate(blog.created_at) }}</p>
                    </div>
                    <div class="blog-card__button ">
                        <button>Show More</button>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script>
import axios from "axios";
import SwiperCore, { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/swiper-bundle.css";
import Fresh from "./fresh.vue";
import Footer from "./Footer.vue";
import Nav from "./Nav.vue";
SwiperCore.use([Navigation, Pagination, A11y]);

export default {
    data() {
        return {
            blogs: [],
            user: null,
        };
    },
    components: {
        Swiper,
        SwiperSlide,
        Fresh,
        Footer,
        Nav
    },
    created() {
        const user = JSON.parse(localStorage.getItem('user'));
        this.user = user;
    },
    mounted() {
        this.fetchBlogs();
    },
    methods: {
        async fetchBlogs() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/blog");
                this.blogs = response.data.data;
            } catch (error) {
                console.error(error);
            }
        },
        getImageUrl(imagePath) {
            return "http://127.0.0.1:8000/storage/" + imagePath.replace("public/", "");
        },

        formatDate(dateString) {
            const date = new Date(dateString);
            const options = { year: "numeric", month: "short", day: "numeric" };
            return date.toLocaleDateString("en-US", options);
        },

        onSwiper(swiper) {
            console.log(swiper);
        },
        onSlideChange() {
            console.log("slide change");
        },

    },
    computed: {
        processedBlogs() {
            return this.blogs.map((blog) => {
                return {
                    id: blog.id,
                    title: blog.title,
                    content: blog.content,
                    created_at: blog.created_at,
                    image: blog.image,
                };
            });
        },
    },
};
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}


.firstCar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
}

.firstCar .swiper-slide img {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
}

.secCar {
    margin-top: 10vh;
    width: 100%;
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;

}

.swi .swiper-slide {
    width: 100%;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

}

.CenterImage {
    display: flex;
    justify-content: center;
    align-items: center;
}

.CenterImage img {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
}

.firstCar .swiper-slide img {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
}

.firstCar .swiper-slide {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
}

.logo-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: black;
    color: white;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}


.latest-blogs {
    padding: 20px;
    margin-top: 10vh;

}

.latest-blogs__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
}

.latest-blogs__header {

    width: 100%;
    text-align: center;
}

.blog-card {
    width: 30%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    height: 400px;
}

.blog-card__image {
    flex-grow: 1;
    height: 40%;
    width: 100%;
    overflow: hidden;
}

.blog-card__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.blog-card__text {
    padding: 20px;
    text-align: left;
}

.blog-card__text h3 {
    margin: 0 0 10px;
    font-size: 1.5rem;
}

.blog-card__text p {
    margin: 0 0 10px;
    font-size: 1.1rem;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.blog-card__button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #007bff;
    flex-shrink: 0;
}

.blog-card__button button {
    padding: 5px 10px;
    background-color: inherit;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.blog-card__button button:hover {
    background-color: rgba(0, 123, 255, 0.8);
}

.home {
    margin-top: 50px;
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
}

.sec {
    display: flex;
    width: 80%;
    height: 100%;
    background-color: #f5f5f5;
    justify-content: space-between;
    margin: 0 auto;
}

.one {
    width: 55%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.firstimg {
    width: 100%;
    height: 60%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
}

.firstimg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.text {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 10px;

}

.text h4 {
    font-size: 20px;
    font-weight: 400;
    color: #c236bb;
    margin-bottom: 10px;
}

.text h3 {
    font-size: 40px;
    font-weight: 700;
    color: #000;
    margin-bottom: 10px;
}

.text p {
    font-size: 14px;
    font-weight: 400;
    color: #000;
    margin-bottom: 10px;
}




.two {
    width: 40%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.two div {
    width: 100%;
    height: 50%;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
}

.two div:first-child {
    margin-bottom: 10px;
}

.two div img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}






@media only screen and (max-width: 600px) {
    .search-bar input {
        width: 80%;
    }

    .links {
        display: none;
    }

    .logo {
        font-size: 18px;
    }

    .card-img-top {
        height: 150px;
    }

    .card-text {
        height: 50px;
    }

    .user {
        display: none;
    }

    .guest {
        display: none;
    }

    .top-bar {
        display: none;
    }

    .logo-bar {
        display: none;
    }

    .swiper-slide {
        height: 50vh;
    }

    .swiper-slide img {
        height: 50vh;
    }

    .firstCar .swiper-slide {
        width: 100%;
        height: 50vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: cover;
        background-position: center;
    }

    .swiper-slide img {
        width: 100%;
        height: 50vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-size: cover;
        background-position: center;
    }

    .latest-blogs__content {
        width: 100%;
    }

    .blog-card {
        width: 100%;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        border: 1px solid #eaeaea;
        border-radius: 5px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        height: 400px;
    }

    .blog-card__image {
        flex-grow: 1;
        height: 40%;
        width: 100%;
        overflow: hidden;
    }

    .blog-card__image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .blog-card__text {
        padding: 20px;
        text-align: left;
    }

    .blog-card__text h3 {
        margin: 0 0 10px;
        font-size: 1.5rem;
    }

    .blog-card__text p {
        margin: 0 0 10px;
        font-size: 1.1rem;
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .blog-card__button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        background-color: #007bff;
        flex-shrink: 0;
    }

    .blog-card__button button {
        padding: 5px 10px;
        background-color: inherit;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .blog-card__button button:hover {
        background-color: rgba(0, 123, 255, 0.8);
    }

    .latest-blogs__header {
        width: 100%;
        text-align: center;
    }


    .latest-blogs__header h2 {
        font-size: 2rem;
    }

    .latest-blogs__header p {
        font-size: 1.2rem;
    }

    .latest-blogs__content {
        width: 100%;
    }

    .sec {
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .one {
        width: 100%;
        height: 50%;
        display: flex;
        flex-direction: column-reverse;
        justify-content: center;
        align-items: center;
        margin-bottom: 9vh;
    }

    .one .text {
        margin-top: 10px;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
    }

    .one .text p {
        text-align: center;
    }

    .one .button {
        justify-content: center;
    }


    .two {
        width: 100%;
        height: 50%;
        background-color: #f5f5f5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .two div {
        width: 100%;
        height: 50%;
        background-color: #f5f5f5;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .two div:first-child {
        margin-bottom: 10px;
    }



}</style>
  
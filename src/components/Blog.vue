<template>
    <div>
        <div class="Head">
            <h2>Blog Posts</h2>
        </div>
        <div class="Blog">
            <ul class="SBlog">
                <li v-for="blog in blogs" :key="blog.id">
                    <h3>{{ blog.title }}</h3>
                    <div class="image">
                        <img :src="getImageUrl(blog.image)" alt="blog Image" />
                    </div>
                    <p>{{ blog.content }}</p>
                    <p>Created At: {{ formatDate(blog.created_at) }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";

export default {
    data() {
        return {
            blogs: [],
        };
    },
    mounted() {
        this.fetchBlogs();
    },
    methods: {
        async fetchBlogs() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/blog");
                this.blogs = response.data.data;
            }
            catch (error) {
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
        }
    },
};
</script>

<style scoped>


.Head {
    text-align: center;
    margin-top: 20px;
}

.Blog {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.SBlog {
    list-style: none;
    width: 70%;
}

.SBlog li {
    background-color: #9680961a;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
}

.SBlog li h3 {
    text-align: center;
}

.SBlog li .image {
    display: flex;
    justify-content: center;
    align-items: center;
}

.SBlog li .image img {
    width: 70%;
    height: 40vh;
    object-fit: cover;
}

.SBlog li p {
    margin-top: 10px;
}

.SBlog li p:last-child {
    text-align: right;
}
</style>

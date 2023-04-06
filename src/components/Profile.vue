<template>
    <div v-if="isLoading === true" class="loading">
        <div class="loader"></div>
    </div>
    <div v-else>
        <div class="profile-container">
            <h1>Welcome {{ profile.first_name }}</h1>
            <form class="profile-form" @submit.prevent="updateProfile">
                <div class="img">
                    <div class="profile-avatar"
                        :style="{ backgroundImage: 'url(' + 'http://127.0.0.1:8000/uploads/avatars/' + profile.avatar + ')' }">
                    </div>
                    <label for="avatar-upload">Upload Avatar</label>
                    <input id="avatar-upload" type="file" ref="avatar" @change="handleFileUpload" accept="image/*">
                </div>
                <div class="whiteSpace"></div>
                <div class="inputs">
                    <div class="one">
                        <h3>User Details</h3>
                        <div class="usDetails">
                            <div class="indata">
                                <label for="Firstname">First Name</label>
                                <input type="text" v-model="profile.first_name" placeholder="First Name" id="Firstname">
                            </div>
                            <div class="indata">
                                <label for="Lastname">Last Name</label>
                                <input type="text" v-model="profile.last_name" placeholder="Last Name" id="Lastname">
                            </div>
                        </div>
                    </div>
                    <div class="two">
                        <h3>Contact Details</h3>
                        <div class="condetails">
                            <div class="indata">
                                <label for="Email">Email</label>
                                <input type="email" v-model="profile.email" placeholder="Email" id="Email">
                            </div>
                            <div class="indata">
                                <label for="Phone">Phone Number</label>
                                <input type="text" v-model="profile.phone" placeholder="Phone Number" id="Phone">
                            </div>
                        </div>
                    </div>
                    <div class="three">
                        <h3>Address Details</h3>
                        <div class="address">
                            <div class="indata">
                                <label for="Address">Street Name</label>
                                <input type="text" v-model="profile.address" placeholder="Address" id="Address">
                            </div>
                            <div class="indata">
                                <label for="City">City</label>
                                <input type="text" v-model="profile.city" placeholder="City" id="City">
                            </div>
                            <div class="indata">
                                <label for="State">State</label>
                                <input type="text" v-model="profile.state" placeholder="State" id="State">
                            </div>
                            <div class="indata">
                                <label for="Country">Country</label>
                                <input type="text" v-model="profile.country" placeholder="Country" id="Country">
                            </div>
                            <div class="indata">
                                <label for="Zip">Zip</label>
                                <input type="text" v-model="profile.zip" placeholder="Zip" id="Zip">
                            </div>
                        </div>
                    </div>
                    <button type="submit">Update Profile</button>
                </div>
            </form>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios'
import { useToast } from 'vue-toastification'


export default {
    data() {
        return {
            profile: {},
            token: null,
            isLoading: true
        };
    },

    created() {
        this.token = localStorage.getItem("token");

    },
    mounted() {
        this.fetchProfile(() => {
            this.isLoading = false
        });
    },
    methods: {
        fetchProfile(callback) {
            axios.get("http://127.0.0.1:8000/api/us/profile", {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    this.profile = response.data.data;
                    if (callback) {
                        callback();
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleFileUpload() {
            this.profile.avatar = this.$refs.avatar.files[0];
        },
        updateProfile() {
            const toast = useToast()
            let formData = new FormData();
            if (this.profile.avatar) {
                formData.append("avatar", this.profile.avatar);
            }
            formData.append("first_name", this.profile.first_name);
            formData.append("last_name", this.profile.last_name);
            formData.append("email", this.profile.email);
            formData.append("phone", this.profile.phone);
            formData.append("address", this.profile.address);
            formData.append("city", this.profile.city);
            formData.append("state", this.profile.state);
            formData.append("country", this.profile.country);
            formData.append("zip", this.profile.zip);
            axios.post("http://127.0.0.1:8000/api/user/profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${this.token}`
                }
            })
                .then(response => {
                    console.log(response.data);
                    toast.success('Profile Updated Successfully')
                })
                .catch(error => {
                    console.log(error);
                    toast.error('Profile Update Failed')
                });
        }
    },
}
</script>
<style scoped>
.profile-avatar:hover {
    cursor: pointer;
}

.profile-avatar input {
    display: none;
}

.inputs {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
}

.inputs .indata {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
}

.one {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: rgba(223, 223, 223, 0.242);
    width: 100%;
    border: solid 20px rgba(215, 215, 215, 0.167);
    margin: 0 auto;
    border-radius: 10px;

}

.inputs .usDetails {
    display: flex;
    justify-content: space-evenly;
    width: 100%;


}

.two {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: rgba(223, 223, 223, 0.242);
    width: 100%;
    border: solid 20px rgba(215, 215, 215, 0.167);
    margin: 0 auto;
    border-radius: 10px;
    margin-top: 5px;
}

.inputs .condetails {
    display: flex;
    justify-content: space-evenly;
    width: 100%;

}

.three {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    border: solid 20px rgba(215, 215, 215, 0.167);
    margin: 0 auto;
    border-radius: 10px;
    margin-top: 5px;


}

.inputs .address {
    display: flex;
    justify-content: space-evenly;
    margin-top: 2rem;
    flex-wrap: wrap;
    display: flex;
    width: 100%;

}

h3 {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    margin-top: 1rem;
    margin-bottom: 1rem;

}

.inputs .indata {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 1rem;

}





.profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.profile-form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    margin-top: 2rem;
}

.profile-form input[type="text"],
.profile-form input[type="email"],
.profile-form button[type="submit"] {
    border: none;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    font-size: 1rem;
    background-color: #f7f7f7;
    border-radius: 0.5rem;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.profile-form input[type="file"] {
    display: none;
}

.profile-form button[type="submit"] {
    background-color: #c236bb;
    color: #fff;
    transition: all 0.3s ease-in-out;
    margin-top: 1rem;
}

.profile-form button[type="submit"]:hover {
    background-color: #c236bb;
    cursor: pointer;
}

.profile-avatar {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #f7f7f7;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    border: 1px white solid;
    margin: 0 auto;
    margin-top: 2rem;
    margin-bottom: 2rem;
    border: 1px solid #ccc;
}


.img {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f7f7f7;
    border-radius: 1rem 0 0 1rem;
    padding: 1rem;


}

.inputs {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f7f7f7;
    border-radius: 0 1rem 1rem 0;
    padding: 1rem;

}

@media screen and (max-width: 768px) {
    .profile-form {
        flex-direction: column;
    }

    .img {
        width: 100%;
        border-radius: 1rem 1rem 0 0;
    }

    .inputs {
        width: 100%;
        border-radius: 0 0 1rem 1rem;
    }
}
    
</style>
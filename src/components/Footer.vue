<template>
    <footer class="footer">
        <div class="shops">
            <h3>SHOPS</h3>
            <ul>
                <li>New In</li>
                <li>Women</li>
                <li>Men</li>
                <li>Schuhe Shoes</li>
                <li>Bags & Accessories</li>
                <li>Top Brands</li>
                <li>Sale & Special Offers </li>
                <li>Lookbook</li>
            </ul>
        </div>
        <div class="information">
            <h3>INFORMATION</h3>
            <ul>
                <li>About us</li>
                <li>New Collection</li>
                <li>Best Sellers </li>
                <li>Manufacturers</li>
                <li>Privacy policy</li>
                <li>Terms &amp; condition</li>
                <li>Blog</li>
            </ul>
        </div>
        <div class="customer-service">
            <h3>CUSTOMER SERVICE</h3>
            <ul>
                <li>Search Terms</li>
                <li>Advanced Search</li>
                <li>Orders and Returns</li>
                <li>Contact Us</li>
                <li>RSS</li>
                <li>Help &amp; FAQs </li>
                <li>Consultant</li>
                <li>Store Locations</li>
            </ul>
        </div>
        <div class="newsletter">
            <h3>NEWSLETTER</h3>
            <ul>
                <li>
                    <form>
                        <label for="email">Sign Up for News Letter</label>
                        <input type="email" id="email" placeholder="Type Your E-mail" />
                        <button type="submit">Subscribe</button>
                    </form>
                </li>
            </ul>
        </div>
    </footer>
    <div class="after-footer">
        <div class="payment-methods">
            <p>© 2014 ELLA Fashion Store Shopify. All Rights Reserved. Ecommerce Software by Shopify.</p>
            <ul>
                <li><font-awesome-icon :icon="['fab', 'cc-visa']" /></li>
                <li>Master Card</li>
                <li>PayPal</li>
            </ul>
        </div>
    </div>
</template>
  
<style scoped>

.footer {
    display: flex;
    justify-content: space-around;
    background-color: #262626;
    color: rgba(255, 255, 255, 0.874);
    padding: 20px 0;
    margin-top: 20px;

}

.shops,
.information,
.customer-service {
    display: flex;
    flex-direction: column;
    align-items: center; 
}

.shops h3,
.information h3,
.customer-service h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    align-self: first baseline;
}

.shops ul,
.information ul,
.customer-service ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.shops li,
.information li,
.customer-service li {
    margin: 10px 0;
    font-size: 16px;
    font-weight: 400;
}

.newsletter {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.newsletter h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
}

.newsletter ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.newsletter li {
    margin: 10px 0;
    font-size: 16px;
    font-weight: 400;
}

.newsletter li form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.newsletter li form label {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
}

.newsletter li form input {
    width: 300px;
    height: 40px;
    border: 1px solid #000;
    border-radius: 5px;
    padding: 0 10px;
    margin: 10px 0;
}

.newsletter li form button {
    width: 300px;
    height: 40px;
    border: 1px solid #000;
    border-radius: 5px;
    background-color: #c236bb;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
}



.after-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    color: #fff;
    padding: 20px 0;
}

.payment-methods {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
}

.payment-methods p {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
}

.payment-methods ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
}

.payment-methods li {
    margin: 0 10px;
    font-size: 16px;
    font-weight: 400;
}

.payment-methods li img {
    width: 50px;
    height: 50px;
    object-fit: cover;
}

@media screen and (max-width: 768px) {
    .footer {
        /* flex-direction: column; */
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-items: center;
        margin: auto;
    }

    .shops,
    .information,
    .customer-service {
        align-items: flex-start;
        width: 40%;
    }

    .shops,
    .information,
    .customer-service,
    .newsletter {
        margin: 10px 0;
    }

    .newsletter {
        display: none;
    }

    .payment-methods {
        flex-direction: column;
    }

    .payment-methods p {
        margin-bottom: 10px;
    }

    .payment-methods ul {
        margin-top: 10px;
    }

    .payment-methods li {
        margin: 0;
    }

    .payment-methods li img {
        width: 30px;
        height: 30px;
    }



}
    

</style>
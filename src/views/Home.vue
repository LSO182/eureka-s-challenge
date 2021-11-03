<template>
    <div id="home" class="bg-main">
        <Header />
        <NavBar :results="12" 
        @change-view="changeView"
        @change-order="changeOrder"
        />
        <div class="container">
            <div class="row">
               <div class="col-3">
                      <SideBar
                    :products="products"
                    @change-filters="changeFilter"
                    @change-price="changePrice"
                    :key="sideBarId"
                />
               </div>
                <div class="col-9 pt-2">
                    <div class="row">
                        <div :class="[viewType === 'grid' ? 'col-3' : 'col-12']" class="pt-2" v-for="product in localProducts"
                            :key="product.id">
                            <div class="product-content shadow bg-white h-100 p-3 d-flex flex-column align-items-center rounded">
                                <div class="product-img justify-content-center d-flex w-100 border">
                                    <img class="p-2" :src="product.image.src" :alt="product.title">
                                </div>
                                <div class="product-text h-100 d-flex flex-column px-2">
                                    <p class="text-center pt-2">{{product.title}}</p>
                                    <p class="text-center">{{ product.product_type }}</p>
                                    <p> Mayor precio de variante:
                                    {{
                                        maxPrice(product.variants)
                                            ? maxPrice(product.variants)
                                            : "No price"
                                    }}</p>
                                    <p class="text-center mt-auto"><span class="p-2">{{ product.quantitySold }}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// apis
import { http } from "../../api/http";

// Components
import Header from "../components/Header.vue";
import SideBar from "../components/SideBar.vue";
import NavBar from "../components/NavBar.vue";

export default {
    components: {
        Header: Header,
        SideBar: SideBar,
        NavBar: NavBar,
    },
    data() {
        return {
            localProducts: [],
            products: [],
            filters: [],
            selectedFilters: [],
            sideBarId: 0,
            viewType: "grid",
            price: "",
        };
    },
    computed: {
        viewColumns() {
            return this.viewType === "grid" ? 4 : 12;
        },
    },
    methods: {
        changeView(viewType) {
            this.viewType = viewType;
        },
        filterProducts() {
            this.localProducts = this.products.filter((product) => {
                return (
                    this.selectedFilters.indexOf(product.product_type) !== -1
                );
            });

            if (!this.localProducts.length) {
                this.localProducts = this.products;
            }
        },
        filterPrice() {
            this.localProducts = this.products.filter((product) => {
                return this.priceIsInRange(product);
            });
        },
         maxPrice(variants) {
            return Math.max.apply(
                Math,
                variants.map((variant) => variant.price)
            );
        },
        orderAZ() {
            this.localProducts = this.localProducts.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });
        },
        orderHigh() {
            this.localProducts = this.localProducts.sort((a, b) => {
                return this.maxPrice(b.variants) - this.maxPrice(a.variants);
            });
        },
        orderLow() {
            this.localProducts = this.localProducts.sort((a, b) => {
                return this.maxPrice(a.variants) - this.maxPrice(b.variants);
            });
        },
        priceIsInRange(product) {
            const prices = product.variants.map((variant) => {
                return variant.price;
            });

            return prices.some((price) => {
                return parseInt(price) < parseInt(this.price);
            });
        },
        changeFilter(filters) {
            this.selectedFilters = filters;

            this.filterProducts();
        },
        changePrice(price) {
            this.price = price;

            this.filterPrice();
        },

         changeOrder(order) {
            switch (order) {
                case "az":
                    this.orderAZ();
                    break;
                case "high":
                    this.orderHigh();
                    break;
                case "low":
                    this.orderLow();
                    break;
                default:
                    break;
            }
        },

        async loadProducts() {
            const products = await http.get(
                "products/best-selling-products-by-subcategory"
            );

            this.sideBarId++;

            this.products = products.data;

            this.filterProducts();
        },
    },
    created() {
        this.loadProducts();
    },
    mounted() {
        this.filterProducts();
    },
};
</script>


<style>
#home .product-img img {
  max-width: 100%;
  width: 150px;
  height: 120px;
  object-fit: contain;
}

#home .product-img {
  border-color: #f4f2f0;
}

#home .product-text span {
  border: 2px solid #73bb90;
  background-color: #edf6f0;
}

.bg-main {
  background-color: #f4f2f0;
}

* p,
h1,
h2,
h3,
h4,
h5
h6 {
  font-family: "Montserrat", sans-serif;
}
</style>
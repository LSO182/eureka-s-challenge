<template>
    <b-col col md="12">
        <p>Quik Filter</p>
        <b-form-group label="Product Type:" v-slot="{ ariaDescribedby }">
            <div class="filter-check-box">
                <b-form-checkbox-group
                    id="checkbox-group-1"
                    v-model="selected"
                    :options="options"
                    :aria-describedby="ariaDescribedby"
                    @change="changeFilters"
                    name="flavour-1"
                ></b-form-checkbox-group>
            </div>
            <div class="range-bar">
                <label for="range-1">Price range</label>
                <br />
                <b-form-input
                    @input="changePrice(price)"
                    id="range-1"
                    v-model="price"
                    type="range"
                    min="0"
                    max="200"
                    class="w-100"
                ></b-form-input>
                <div class="mt-2">Precio: $ {{ price }}</div>
            </div>
        </b-form-group>
    </b-col>
</template>

<script>
export default {
    data() {
        return {
            selected: [],
            options: [],
            price: "200",
        };
    },
    props: ["products"],
    methods: {
        changePrice(price) {
            this.$emit("change-price", price);
        },
        changeFilters() {
            this.$emit("change-filters", this.selected);
        },
        makeFilters() {
            this.options = this.products
                .map((product) => product.product_type)
                .filter(function (product, pos, products) {
                    return products.indexOf(product) == pos;
                });
        },
    },
    mounted() {
        this.makeFilters();
    },
};
</script>

<style scoped>
input {
    margin-left: auto;
    width: 20px;
    height: 20px;
}

input {
    color: #c38a9f;
}

#side-bar .filter-check-box {
    font-weight: 500;
}
</style>

<template>
    <div id="nav-bar">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="row align-items-center">
                        <div class="col-4">
                            <p>
                                Available deals: <span>{{ results }}</span>
                            </p>
                        </div>

                        <div class="col-4">
                            <button
                                class="btn btn-primary"
                                @click="changeView('list')"
                            >
                                <i class="fas fa-list"></i>
                            </button>
                            <button
                                class="btn btn-secondary"
                                @click="changeView('grid')"
                            >
                                <i class="fas fa-th-large"></i>
                            </button>
                        </div>

                        <div class="col-4">
                            <label for="exampleFormControlSelect1"
                                >Select Order</label
                            >
                            <div class="form-group">
                                <select
                                    class="form-control"
                                    id="exampleFormControlSelect1"
                                    v-model="order"
                                    @change="changeOrder"
                                >
                                    <option value=""  default>
                                        ---SELECT ORDER---
                                    </option>
                                    <option value="az">A-Z</option>
                                    <option value="high">
                                        Price: High to Low
                                    </option>
                                    <option value="low">
                                        Price: Low to High
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        results: {
            type: Number,
            required: true,
        },
    },
    methods: {
        changeView(viewType) {
            this.$emit("change-view", viewType);
        },
        changeOrder() {
            this.$emit("change-order", this.order);
        }
    },
    mounted() {
        this.results = 12;
    },
};
</script>

<style scoped>
button {
    background-color: #b5889b;
    border: none;
}
</style>

<template>
  <div class="search">
    <div class="search-wrapper">
      <input type="text" v-model="search" placeholder="Search contact" />
      <button class="clear" v-if="search.length" @click="clearSearch">
        Clear search
      </button>
    </div>
    <button v-if="userPinia.isLogged" @click="showForm">Add contact</button>
  </div>
</template>

<script setup>
import {defineEmits, ref, watch} from "vue";
import {useStore} from "../store/user"


const emit = defineEmits(['show-form', 'search']);
const search = ref("");
const userPinia = useStore();


const showForm = () => {
  emit("show-form", "form");
}

const clearSearch = () => {
  search.value = "";
}

watch(search, (newVal) => {
  emit("search", newVal);
})
</script>

<style scoped>
.search {
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 25px;
  justify-content: space-between;
}
.search input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin: 0 auto;
  max-width: 500px;
  width: 500px;
}
.search button {
  margin-left: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  background: #4caf50;
  color: #fff;
}
</style>

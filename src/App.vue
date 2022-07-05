<template>
  <div id="app">
    <div class="header">
      <div class="left">
        <img class="logo" alt="UOC logo" src="./assets/uoc-logo.png" />
        <div class="app-name">Address book</div>
      </div>
      <div class="right">
        <p class="user">{{userPinia.getName}}</p>
        <button @click="toggleForm('login')" v-if="!userPinia.isLogged" class="login-button">Login</button>
        <button @click="logout" v-if="userPinia.isLogged" class="logout-button">Logout</button>
      </div>
    </div>
    <AddressLogin v-on:signIn="login" v-on:closeModal="toggleForm" v-if="showLoginModal"/>
    <SearchBar v-on:showForm="toggleForm" v-on:search="setSearchTerm" />
    <ContactList :contactList="contactListFiltered" v-on:deleteContact="deleteContact"/>
    <AddressForm v-on:addContact="addContact" v-on:closeModal="toggleForm" v-if="showFormModal" />
  </div>
</template>

<script setup>
import axios from "axios";
import SearchBar from "./components/SearchBar.vue";
import AddressLogin from "./components/AddressLogin.vue";
import ContactList from "./components/ContactList.vue";
import AddressForm from "./components/AddressForm.vue";
import {useStore} from "./store/user"

import {ref, onMounted, reactive, computed} from "vue";

let showLoginModal = ref(false);
let showFormModal = ref(false);
const userPinia = useStore();
let searchTerm = ref("");
let contactList = reactive([]);

onMounted(async() => {
  await fetchContact();
})

async function login(user) {
  await axios.post("http://localhost:3000/login", user).then((response) => {
    if(response.data.code == 200) {
      userPinia.setUserData(response);
      toggleForm('login');
      fetchContact();
    } else {
      window.alert("Login failed!! Invalid credentials");
    }
  })
} 

function logout() {
  userPinia.clearData();
  fetchContact();
}

function toggleForm(modal) {
  if (modal == 'form') {
    showFormModal.value = !showFormModal.value;
  } else if (modal == 'login'){
    showLoginModal.value = !showLoginModal.value;
  }
}

async function fetchContact() {
  const headers = {'authorization': userPinia.getToken};
  await axios.get("http://localhost:3000/addresses", { headers }).then((response) => {
    contactList.value = response.data.data;
  })
}

async function addContact(contact) {
  const headers = {'authorization': userPinia.getToken};
  await axios.post("http://localhost:3000/address", contact, { headers }).then((response) => {
    if (response.data.code === 200) {
      fetchContact();
      toggleForm('form');
    }
  })
} 

async function deleteContact(id) {
  await axios.delete("http://localhost:3000/address", {data: {'id': id}, headers: {'authorization': userPinia.getToken}}).then((response) => {
    if (response.data.code === 200) {
      fetchContact();
    }
  })
} 

function setSearchTerm(text) {
  searchTerm.value = text;
}

const contactListFiltered = computed(() => {
  if (!searchTerm.value) {
    return contactList;
  }
  let filteredList = reactive([]);
  filteredList.value = contactList.value.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      contact.phone.includes(searchTerm.value)
    );
  });
  return filteredList;
})
</script>

<style>
body {
   margin: 0
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}
.header {
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
}
.header .left {
  display: flex;
  align-items: center;
}
.header .right {
  display: flex;
  align-items: center;
}
.header .logo {
  max-height: 50px;
}
.header .app-name {
  margin-left: 25px;
  font-weight: bold;
  font-size: 20px;
}
.header .user {
  display: flex;
}
.header .login-button,
.header .logout-button {
  background: #2c3e50;
  color: #fff;
  border: 0;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 15px;
}
</style>
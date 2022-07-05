<template>
    <div class="modal-container">
    <div class="contact-form">
      <div class="contact-form-header">
        <h2>Add a new contact</h2>
        <button @click="closeForm">
          <img src="../assets/close-button.svg" alt="Close modal" />
        </button>
      </div>
      <div class="error" v-if="error">
        The fields name, lastname and email are required.
      </div>
      <form @submit.prevent="addContact">
        <div class="contact-form-item">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="contact.name" />
        </div>
        <div class="contact-form-item">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" v-model="contact.lastName" />
        </div>
        <div class="contact-form-item">
          <label for="address">Address</label>
          <input type="text" id="address" v-model="contact.address" />
        </div>
        <div class="contact-form-item">
          <label for="city">City</label>
          <input type="text" id="city" v-model="contact.city" />
        </div>
        <div class="contact-form-item">
          <label for="state">State</label>
          <input type="text" id="state" v-model="contact.state" />
        </div>
        <div class="contact-form-item">
          <label for="zip">Zip</label>
          <input type="text" id="zip" v-model="contact.zip" />
        </div>
        <div class="contact-form-item">
          <label for="country">Country</label>
          <input type="text" id="country" v-model="contact.country" />
        </div>
        <div class="contact-form-item">
          <label for="phone">Phone</label>
          <input type="text" id="phone" v-model="contact.phone" />
        </div>
        <div class="contact-form-item">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="contact.email" />
        </div>
        <div class="contact-form-item">
          <label for="private">Private contact</label>
          <input type="checkbox" id="private" v-model="contact.private" />
        </div>
        <div class="contact-form-item">
          <button type="submit">Add contact</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref, defineEmits, reactive} from "vue";
import { uuid } from "vue-uuid";

const emit = defineEmits(["add-contact", "close-form"]);
let contact = reactive({
  id: "",
  name: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  phone: "",
  email: "",
  private: false
})
const error = ref(false);

const addContact = () => {
  // required fields
  if (
    contact.name.length === 0 ||
    contact.lastName.length === 0 ||
    contact.email.length === 0
  ) {
    error.value = true;
    return;
  }
  contact.id = uuid.v4();
  emit("add-contact", contact);
  resetContact();
};

const resetContact = () => {
  contact = {
    id: "",
    name: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    email: "",
    private: false
  };
};

const closeForm = () => {
  emit("close-modal", "form");
}
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.contact-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
}
.contact-form-header button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.contact-form-header button img {
  width: 20px;
}
.contact-form-item {
  margin-bottom: 20px;
}
.contact-form-item label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
.contact-form-item input,
.contact-form-item select,
.contact-form-item textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 300px;
}
.contact-form-item button {
  background: #4caf50;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.error {
  color: red;
  margin-bottom: 20px;
}
</style>
<template>
  <div class="modal-container">
    <div class="login-form">
      <div class="login-form-header">
        <h2>Login</h2>
        <button @click="closeForm">
          <img src="../assets/close-button.svg" alt="Close modal" />
        </button>
      </div>
      <div class="error" v-if="error">
        The fields email and password are required.
      </div>
      <form @submit.prevent="login">
        <div class="login-form-item">
          <label for="email">Email</label>
          <input v-model="contact.email" type="email" id="email" />
        </div>
        <div class="login-form-item">
          <label for="password">Password</label>
          <input v-model="contact.password" type="password" id="password"/>
        </div>
        <div class="login-form-item">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineEmits } from 'vue'

const emit = defineEmits(['close-modal', 'sign-in']);
const contact = reactive({
  email: "",
  password: ""
})
const error = ref(false);

const login = () => {
  if(contact.email.length === 0 || contact.password.length === 0) {
    error.value = true;
  }
  emit("sign-in", contact);
}

const closeForm = () => {
  emit("close-modal", "login");
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
.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}
.login-form-header button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.login-form-header button img {
  width: 20px;
}
.login-form-item {
  margin-bottom: 20px;
}
.login-form-item label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
.login-form-item input,
.login-form-item select,
.login-form-item textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 300px;
}
.login-form-item button {
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
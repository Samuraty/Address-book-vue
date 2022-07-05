<template>
  <div class="contact" :class="contact.private && 'private'">
    <button v-if="userPinia.isLogged" class="delete-contact" @click="deleteContact(contact.id)">
      <img src="../assets/delete-button.svg" alt="Delete contact" />
    </button>
    <h2 class="contact-title">{{ contact.name }} {{ contact.lastName }}</h2>
    <p class="contact-address">{{ contact.address }}, {{ contact.city }} - {{ contact.zip }} - {{ contact.state }} {{ contact.country }}</p>
    <p class="contact-contact">{{ contact.email }} | {{ contact.phone }}</p>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
import {useStore} from "../store/user"

defineProps({
  contact: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["delete-contact"]);
const userPinia = useStore();

const deleteContact = (id) => {
  emit("delete-contact", id);
};
</script>

<style scoped>
.contact {
  padding: 20px;
  border: 1px solid #ccc;
  margin: 20px;
  border-radius: 4px;
  position: relative;
  text-align: left;
}
.contact.private {
  background-color: #f5f5f5;
}
.contact-title {
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 10px;
}
.contact-address {
  font-size: 18px;
}
.contact-contact {
  font-size: 16px;
}
/* .contact-info {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.contact-info-label {
  font-weight: bold;
  margin-right: 5px;
} */
.delete-contact {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.delete-contact img {
  width: 20px;
}
</style>

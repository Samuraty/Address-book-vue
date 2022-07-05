<template>
  <div id="contact-list" class="contact-list">
    <div v-for="contact in contactList.value" :key="contact.id">
      <ContactCard :contact="contact" v-on:delete-contact="deleteContact" />
    </div>
  </div>
</template>

<script setup>
import {defineEmits, defineProps} from "vue";
import ContactCard from "./ContactCard.vue";

defineProps({
  contactList: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["delete-contact"]);

const deleteContact = (id) => {
  emit("delete-contact", id);
};
</script>

<style scoped>
.contact-list {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>

<template>
  <div v-if="currentEbook" class="edit-form py-3">
    <p class="headline">Edit Ebook</p>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="currentEbook.title"
        :rules="[(v) => !!v || 'Title is required']"
        label="Title"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentEbook.description"
        :rules="[(v) => !!v || 'Description is required']"
        label="Description"
        required
      ></v-text-field>

      <label><strong>Status:</strong></label>
      {{ currentEbook.published ? "Published" : "Pending" }}

      <v-divider class="my-5"></v-divider>

      <v-btn
        v-if="currentEbook.published"
        @click="updatePublished(false)"
        color="primary"
        small
        class="mr-2"
      >
        UnPublish
      </v-btn>

      <v-btn
        v-else
        @click="updatePublished(true)"
        color="primary"
        small
        class="mr-2"
      >
        Publish
      </v-btn>

      <v-btn color="error" small class="mr-2" @click="deleteEbook">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateEbook"> Update </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Ebook...</p>
  </div>
</template>

<script>
import EbookDataService from "../services/ebook.service";
export default {
  name: "ebook",
  data() {
    return {
      currentEbook: null,
      message: "",
    };
  },
  methods: {
    getEbook(id) {
      EbookDataService.get(id)
        .then((response) => {
          this.currentEbook = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updatePublished(status) {
      var data = {
        id: this.currentEbook.id,
        title: this.currentEbook.title,
        description: this.currentEbook.description,
      };
      EbookDataService.update(this.currentEbook.id, data)
        .then((response) => {
          this.currentEbook.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateEbook() {
      EbookDataService.update(this.currentEbook.id, this.currentEbook)
        .then((response) => {
          console.log(response.data);
          this.message = "The ebook was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteEbook() {
      EbookDataService.delete(this.currentEbook.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "ebooks" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getEbook(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
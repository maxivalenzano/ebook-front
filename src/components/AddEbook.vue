<template>
<v-container>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Ebook</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="ebook.title"
          :rules="[(v) => !!v || 'Title is required']"
          label="Title"
          required
        ></v-text-field>

        <v-text-field
          v-model="ebook.description"
          :rules="[(v) => !!v || 'Description is required']"
          label="Description"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveEbook">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Submitted successfully! </v-card-title>

        <v-card-subtitle> Click the button to add new Ebook. </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newEbook">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
  </v-container>
</template>

<script>
import EbookDataService from "../services/ebook.service";

export default {
  name: "add-ebook",
  data() {
    return {
      ebook: {
        id: null,
        title: "",
        author: "",
        year: 0,
        editorial: "",
        description: "",
        price: 0,
        published: false,
        url: "",
      },
      submitted: false,
    };
  },

  methods: {
    saveEbook() {
      var data = {
        title: this.ebook.title,
        author: this.ebook.author,
        year: this.ebook.year,
        editorial: this.ebook.editorial,
        description: this.ebook.description,
        price: this.ebook.price,
        url: this.ebook.url,
      };

      EbookDataService.create(data)
        .then((response) => {
          this.ebook.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newEbook() {
      this.submitted = false;
      this.ebook = {};
    },
  },
};
</script>

<style>

</style>
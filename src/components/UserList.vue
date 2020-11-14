<template>
  <v-container grid-list-xl>
    <v-layout row wrap class="cardlayout">
      <v-flex
        xs12
        sm4
        v-for="(ebook, i) in content.ebooks"
        :key="i"
        class="cardflex"
      >
        <v-card class="card" height="400" width="300">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            aspect-ratio="2.75"
          ></v-img>
          <v-card-title>
            <div>
              <h3 class="headline mb-0">{{ ebook.title }}</h3>
              <div>{{ ebook.description }}</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn text>
              Comprar
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "list",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    const user = this.$store.state.auth.user;
    UserService.getListEBooks(user).then(
      (response) => {
        this.content = response.data;
        console.log(this.content);
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};

</script>
<style>
.cardlayout {
  align-items: baseline;
  justify-content: space-evenly;
  align-items: stretch;
}
.cardflex {
  background-color: #0081eb;
}
.card {
  height: "200";
  width: "100";
}
</style>
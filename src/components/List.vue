<template>
  <v-container class="list mx-auto">
    <h2 class="display-1 mb-4 mt-4">Mis Libros</h2>
    <v-sheet class="mx-auto">
      <v-slide-group v-model="model" show-arrows center-active>
        <v-slide-item v-for="(ebook, i) in content.ebooks" :key="i">
          <v-card color="grey lighten-4" class="ma-4" width="200">
            <v-img :src="ebook.image" aspect-ratio="1"></v-img>
            <v-card-title>
              {{ ebook.title }}
            </v-card-title>
            <v-card-subtitle>
              {{ ebook.author }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn color="grey darken-2" text @click="openpdf(ebook); ebook.published = !ebook.published"
                >{{ebook.published ? 'Cerrar PDF' : "Leer en línea"}} <v-icon>{{
                  ebook.published ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon></v-btn
              >

            </v-card-actions>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <div v-if="showpdf">
      <ViewPDF :pdfPath="url" />
    </div>
  </v-container>
</template>

<script>
import UserService from "../services/user.service";
export default {
  name: "list",
  data() {
    return {
      model: null,
      content: "",
      url: "",
      showpdf: false,
    };
  },
  methods: {
    openpdf(link) {
      this.url = link.url;
      this.showpdf = !link.published;
      console.log(this.showpdf);
      return;
    },
  },
  mounted() {
    const user = this.$store.state.auth.user;
    UserService.getListEBooks(user)
      .then((response) => {
        this.content = response.data;

        console.log(this.content);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        this.$store.dispatch("auth/logout");
        this.$router.push("/login");
      });
  },
  components: {
    ViewPDF: () => import("./ViewPDF"),
  },
};
</script>

<style>
.list {
  max-width: 961px;
}
</style>
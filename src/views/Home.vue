<template>
  <v-container align="center" class="list px-3">
    <v-parallax
      height="300"
      drak
      src="https://www.intelligent-controls.co.uk/wp-content/uploads/sites/18/2016/07/Parallax-Background-Grey-5.jpg"
    >
      <v-layout justify-center row wrap>
        <v-flex xs12 style="text-align: center">
          <h1 class="display-3 font-weight-thin mb-3">Buscar un Libro</h1>
          <h4 class="subheading">Encuentra lo que te falta</h4>
        </v-flex>

        <v-flex xs12>
          <v-layout align-center justify-center row wrap>
            <v-flex xs6>
              <v-form>
                <v-text-field
                  v-model="searchTitle"
                  display-1
                  white--text
                  outline
                  label="Buscar por titulo"
                >
                </v-text-field>
                <v-btn
                  mt-2
                  block
                  @click="
                    page = 1;
                    retrieveEbooks();
                  "
                  >Buscar</v-btn
                >
              </v-form>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-parallax>

    <h2 class="display-1 mb-4 mt-4">Libros disponibles</h2>

    <v-layout :wrap="true">
      <template v-for="(ebook, i) in ebooks" justify="center">
        <v-flex pa-1 :key="i" sm6 xs12 md4 justify="center">
          <v-hover v-slot="{ hover }">
            <v-card class="card" color="grey lighten-4" max-width="250" shaped>
              <v-img :src="ebook.image" aspect-ratio="1">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out grey darken-2 v-card--reveal display-1 white--text"
                    style="height: 18%"
                  >
                    <div class="mx-5">${{ ebook.price }}</div>
                  </div>
                </v-expand-transition>
              </v-img>

              <v-card-title>
                {{ ebook.title }}
              </v-card-title>
              <v-card-subtitle>
                {{ ebook.author }}
              </v-card-subtitle>
              <v-card-text>
                <div class="subtitle-1">Editorial: {{ ebook.editorial }}</div>
                <div>Año: {{ ebook.year }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn to="/login" text>
                  <font-awesome-icon icon="sign-in-alt" />Login
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn icon @click="ebook.show = !ebook.show">
                  <v-icon>{{
                    ebook.show ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="ebook.show">
                  <v-divider></v-divider>

                  <v-card-text>
                    {{ ebook.description }}
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-hover>
        </v-flex>
      </template>
    </v-layout>

    <h2 class="display-1 mb-4 mt-4">Ver más</h2>

    <v-col cols="12" sm="12">
      <v-row>
        <v-col cols="4" sm="3">
          <v-select
            v-model="pageSize"
            :items="pageSizes"
            label="Libros por página"
            @change="handlePageSizeChange"
          ></v-select>
        </v-col>

        <v-col cols="12" sm="9">
          <v-pagination
            v-model="page"
            :length="totalPages"
            total-visible="7"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
            @input="handlePageChange"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import EbookDataService from "../services/ebook.service";
export default {
  name: "Home",
  data() {
    return {
      ebooks: [],
      searchTitle: "",
      page: 1,
      totalPages: 0,
      totalEbooks: 0,
      pageSize: 3,
      show: false,

      pageSizes: [3, 6, 9],
    };
  },
  methods: {
    getRequestParams(searchTitle, page, pageSize) {
      let params = {};

      if (searchTitle) {
        params["title"] = searchTitle;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },
    getDisplayEbook(ebook) {
      return {
        id: ebook.id,
        title: ebook.title,
        description: ebook.description,
        status: ebook.published ? "Publicado" : "Pendiente",
        author: ebook.author,
        year: ebook.year,
        editorial: ebook.editorial,
        price: ebook.price,
        image: ebook.image,
        show: false,
      };
    },

    retrieveEbooks() {
      const params = this.getRequestParams(
        this.searchTitle,
        this.page,
        this.pageSize
      );

      EbookDataService.getAll(params)
        .then((response) => {
          const { ebooks, totalPages, totalItems } = response.data;
          this.ebooks = ebooks.map(this.getDisplayEbook);
          this.totalPages = totalPages;
          this.totalEbooks = totalItems;

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    handlePageChange(value) {
      this.page = value;
      this.retrieveEbooks();
    },

    handlePageSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
      this.retrieveEbooks();
    },

    refreshList() {
      this.retrieveEbooks();
    },
  },
  mounted() {
    this.retrieveEbooks();
  },
};
</script>

<style>
.list {
  max-width: 961px;
}
.v-card--reveal {
  opacity: 0.75;
}
</style>
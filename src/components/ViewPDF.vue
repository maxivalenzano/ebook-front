<template>
  <v-layout row justify-center>
    <v-card width="100%" height="100%">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Visor de PDF con Vuejs 2</v-toolbar-title>
        <v-flex> </v-flex>
      </v-toolbar>
      <v-container>
        <v-layout row wrap>
          <v-flex>
            <pdf
              :src="src"
              :page="currentPage"
              @num-pages="numPages = $event"
              @page-loaded="currentPage = $event"
            >
            </pdf>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-footer justify-center inset app>
      <v-layout>
        <v-flex>
          <v-btn
            class="primary"
            block
            :disabled="noPrevPage"
            @click="prevPage()"
            >Anterior
          </v-btn>
        </v-flex>
        <v-flex justify-content>{{ currentPage }} / {{ numPages }}</v-flex>
        <v-flex>
          <v-btn
            class="primary"
            block
            :disabled="noNextPage"
            @click="nextPage()"
            >Siguiente
          </v-btn>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-layout>
</template>


<script>
import pdf from "vue-pdf";

export default {
  name: "PdfViewer",
  props: ["pdfPath"],
  data() {
    return {
      src: "",
      currentPage: 1,
      numPages: 0,
    };
  },
  components: {
    pdf,
  },
  computed: {
    noPrevPage() {
      return this.currentPage <= 1;
    },
    noNextPage() {
      return this.currentPage === this.numPages;
    },
  },
  methods: {
    prevPage() {
      this.currentPage--;
    },
    nextPage() {
      this.currentPage++;
    },
  },
  mounted() {
    this.src = pdf.createLoadingTask(this.$props.pdfPath);
    this.src.promise.then((pdf) => {
      this.numPages = pdf.numPages;
    });
  },
};
// {{ numPages }}
// <pdf
//   :src="src"
//   :page="1"
//   @num-pages="pageCount = $event"
//   @page-loaded="currentPage = $event"
// ></pdf>
</script>


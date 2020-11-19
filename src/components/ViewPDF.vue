<template>
  <v-layout row class="list" mx-auto>
    <v-card width="100%" height="100%">
      <v-toolbar dark>
        <v-toolbar-title>Visor de PDF con Vuejs 2</v-toolbar-title>
        <v-flex> </v-flex>
      </v-toolbar>
      <div v-if="spinner" class="text-center">
        <v-progress-circular
          :size="70"
          :width="7"
          indeterminate
          color="grey"
        ></v-progress-circular>
      </div>
      <v-container v-else>
        <v-layout row wrap>
          <v-flex>
            <pdf
              :src="pdfPath"
              :page="currentPage"
              @num-pages="numPages = $event"
              @page-loaded="currentPage = $event"
            >
            </pdf>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-footer justify-center inset app dark>
      <v-layout>
        <v-flex>
          <v-btn class="grey" block :disabled="noPrevPage" @click="prevPage()"
            >Anterior
          </v-btn>
        </v-flex>
        <v-flex>
          <v-btn block text tile>{{ currentPage }} / {{ numPages }}</v-btn>
        </v-flex>
        <v-flex>
          <v-btn class="grey" block :disabled="noNextPage" @click="nextPage()"
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
      spinner: true,
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
      this.spinner = false;
    });
  },
};
</script>

<style>
.list {
  max-width: 961px;
}
</style>

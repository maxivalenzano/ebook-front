<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="8">
      <v-text-field v-model="searchTitle" label="Search by Title"></v-text-field>
    </v-col>

    <v-col cols="12" sm="4">
      <v-btn small @click="page = 1; retrieveEbooks();">
        Search
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Libros</v-card-title>
      </v-card>
    </v-col>

    <v-col cols="12" sm="12">
      <v-row>
        <v-col cols="4" sm="3">
          <v-select
            v-model="pageSize"
            :items="pageSizes"
            label="Items per Page"
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

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Libros</v-card-title>

        <v-data-table
          :headers="headers"
          :items="ebooks"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editEbook(item.id)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteEbook(item.id)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="ebooks.length > 0">
          <v-btn small color="error" @click="removeAllEbooks">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import EbookDataService from "../services/ebook.service";
export default {
  name: "ebooks-list",
  data() {
    return {
      ebooks: [],
      searchTitle: "",
      headers: [
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Description", value: "description", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],

      page: 1,
      totalPages: 0,
      pageSize: 3,

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

    retrieveEbooks() {
      const params = this.getRequestParams(
        this.searchTitle,
        this.page,
        this.pageSize
      );

      EbookDataService.getAll(params)
        .then((response) => {
          const { ebooks, totalPages } = response.data;
          this.ebooks = ebooks.map(this.getDisplayEbook);
          this.totalPages = totalPages;

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

    removeAllEbooks() {
      EbookDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editEbook(id) {
      this.$router.push({ name: "ebook-details", params: { id: id } });
    },

    deleteEbook(id) {
      EbookDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayEbook(ebook) {
      return {
        id: ebook.id,
        title: ebook.title.substr(0, 20) + "...",
        description: ebook.description.substr(0, 20) + "...",
        status: ebook.published ? "Published" : "Pending",
      };
    },
  },
  mounted() {
    this.retrieveEbooks();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>
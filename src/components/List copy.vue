<template>
  <v-sheet class="mx-auto" elevation="8">
    <v-slide-group v-model="model" class="pa-4" show-arrows>
      <v-slide-item
        v-for="(ebook, i) in content.ebooks"
        :key="i"
        v-slot="{ active, toggle }"
        center-active
      >
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-4"
          height="400"
          width="300"
          @click="toggle"
        >
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
          <v-row class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <v-icon
                v-if="active"
                color="white"
                size="48"
                v-text="'mdi-close-circle-outline'"
              ></v-icon>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>

    <v-expand-transition>
      <v-sheet v-if="model != null" height="200" tile>
        <v-row class="fill-height" align="center" justify="center">
          <h3 class="title">Selected {{ model }}</h3>
        </v-row>
      </v-sheet>
    </v-expand-transition>
  </v-sheet>
</template>

<script>
import UserService from "../services/user.service";
export default {
  name: "list",
  data() {
    return {
      model: null,
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
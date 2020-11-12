<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content.ebooks }}</h3>
    </header>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "ebook-list",
  data() {
    return {
      content: "",
    };
  },
  methods() {
    
  },

  mounted() {
    // const params = {};
    // params["id"] = this.$store.state.auth.user.id;
    // console.log(params);
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
    )
    .catch(console.log('error'));
  },
};
</script>

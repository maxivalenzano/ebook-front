<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center mr-2">
        <router-link to="/home" class="navbar-brand"> eBook Store </router-link>
      </div>

      <v-btn to="/ebooks" text> Libros </v-btn>

      <v-btn to="/add" text> Agregar </v-btn>

      <v-btn to="/list" text> Mis libros </v-btn>

      <v-btn v-if="currentUser" to="/profile" text> User </v-btn>

      <v-btn v-if="showAdminBoard" to="/admin" text> Admin Board </v-btn>

      <v-btn v-if="showModeratorBoard" to="/mod" text> Moderator Board </v-btn>

      <div v-if="currentUser" class="ml-auto">
        <v-btn to="/profile" text>
          <font-awesome-icon icon="user" />
          {{ currentUser.username }}
        </v-btn>

        <v-btn href @click.prevent="logOut" text>
          <font-awesome-icon icon="sign-out-alt" />LogOut
        </v-btn>
      </div>

      <div v-if="!currentUser" class="ml-auto">
        <v-btn to="/register" text>
          <font-awesome-icon icon="user-plus" />Sign Up
        </v-btn>
        <v-btn to="/login" text>
          <font-awesome-icon icon="sign-in-alt" />Login
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    
    <Footer> </Footer>
  </v-app>
</template>

<script>
export default {
  name: "app",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_MODERATOR");
      }
      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
  components: {
    Footer: () => import("./components/Footer")
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>

<template>
  <div class="container list">
    <header class="jumbotron">
      <h3>
        Bienvenido: <strong>{{currentUser.firstname}} {{currentUser.lastname}}</strong> 
      </h3>
    </header>
    <p>
      <strong>Usuario:</strong>
      {{currentUser.username}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Titulos:</strong>
    <ul>
      <li v-for="(ebook, i) in content.ebooks" :key="i">{{ebook.title}}</li>
    </ul>
    <strong>Roles:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul>
  </div>
</template>

<script>
import UserService from "../services/user.service";
export default {
  name: 'Profile',
  data() {
    return {
      content: '',
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
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
  }
};
</script>
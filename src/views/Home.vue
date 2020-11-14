<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
<ViewPDF
  :pdfPath="selectedPdf"
/>
  </div>
</template>

<script>
import UserService from '../services/user.service';
const url = 'http://localhost:8080/api/files/ld-Analisis y Diseno de Sistemas_Kendall-8va.pdf';

export default {
  name: 'Home',
  data() {
    return {
      content: '',
      selectedPdf: url,
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  components: {
    ViewPDF: () => import("../components/ViewPDF"),
  },
};
</script>

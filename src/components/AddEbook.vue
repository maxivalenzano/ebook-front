<template>
<v-row class="list px-3 mx-auto">
  <h2 class="display-1 mb-4 mt-4">Añadir un libro nuevo</h2>
  <v-card flat>
    <v-snackbar
      v-if="!error"
      v-model="snackbar"
      absolute
      top
      right
      color="success"
    >
      <span>Se añadió correctamente el libro</span>
      <v-icon dark> mdi-checkbox-marked-circle </v-icon>
    </v-snackbar>
    <v-snackbar
      v-else
      v-model="snackbar"
      absolute
      top
      right
      color="red darken-4"
    >
      <span>{{ message }}</span>
      <v-icon dark> mdi-checkbox-marked-circle </v-icon>
    </v-snackbar>
    <v-form ref="form" @submit.prevent="submit">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="ebook.title"
              :rules="[(v) => !!v || 'el titulo es requerido']"
              label="Titulo"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="ebook.description"
              :rules="[(v) => !!v || 'se requiere una descripción']"
              label="Descripción"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="ebook.author"
              :rules="[(v) => !!v || 'se requiere un autor']"
              label="Autor"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="ebook.editorial"
              :rules="[(v) => !!v || 'se requiere una editorial']"
              label="Editorial"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              type="number"
              v-model.number="ebook.year"
              :rules="[(v) => v > 1 || 'el año es requerido']"
              label="Año publicación"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              type="number"
              v-model.number="ebook.price"
              :rules="[(v) => v > 1 || 'el precio es requerido']"
              label="Precio"
              prefix="$"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-file-input
              :rules="[
                (v) =>
                  !v ||
                  v.size < 16 * 1024 * 1024 ||
                  'El tamaño del PDF debe ser inferior a 15 MB',
              ]"
              accept="application/pdf"
              show-size
              placeholder="Seleccione un archivo"
              label="PDF"
              @change="selectFile"
            ></v-file-input>
            <div v-if="currentFile">
              <v-progress-linear
                v-model="progress"
                color="light-blue"
                height="25"
                reactive
              >
                <strong>{{ progress }} %</strong>
              </v-progress-linear>
            </div>
            <v-alert v-if="messageF" border="left" color="blue-grey" dark>
              {{ messageF }}
            </v-alert>
          </v-col>
          <v-col cols="12" sm="6">
            <v-file-input
              :rules="[
                (v) =>
                  !v ||
                  v.size < 2 * 1024 * 1024 ||
                  'El tamaño de la imagen debe ser inferior a 2 MB',
              ]"
              accept="image/png, image/jpeg, image/bmp, image/jpg"
              show-size
              placeholder="Seleccione una imagen"
              label="Portada"
              @change="selectImage"
            ></v-file-input>
            <div v-if="currentImage">
              <v-progress-linear
                v-model="progressI"
                color="light-blue"
                height="25"
                reactive
              >
                <strong>{{ progressI }} %</strong>
              </v-progress-linear>
            </div>
            <v-alert v-if="messageI" border="left" color="blue-grey" dark>
              {{ messageI }}
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn :disabled="!formIsValid" @click="saveEbook" text color="primary"
          >Añadir Libro
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="resetForm"> Cancelar </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</v-row>
</template>

<script>
import EbookDataService from "../services/ebook.service";
import UploadService from "../services/upload.service";
import UploadServiceImg from "../services/uploadImg.service";

export default {
  name: "add-ebook",
  data() {
    return {
      ebook: {
        id: null,
        title: "",
        author: "",
        year: "",
        editorial: "",
        description: "",
        price: "",
        published: false,
        url: "",
        image: "",
      },
      snackbar: false,
      terms: false,
      error: false,
      message: "",
      messageF: "", //mensaje del archivo de subida
      currentFile: undefined,
      progress: 0, //es el porcentaje de progreso de carga de archivos
      messageI: "", //mensaje del archivo de subida
      currentImage: undefined,
      progressI: 0, //es el porcentaje de progreso de carga de archivos
    };
  },
  computed: {
    formIsValid() {
      return (
        this.ebook.title &&
        this.ebook.author &&
        this.ebook.year &&
        this.ebook.editorial &&
        this.ebook.description &&
        this.ebook.price &&
        this.ebook.url &&
        this.ebook.image
      );
    },
  },

  methods: {
    //creamos el paquete a mandar
    saveEbook() {
      const data = {
        title: this.ebook.title,
        author: this.ebook.author,
        year: this.ebook.year,
        editorial: this.ebook.editorial,
        description: this.ebook.description,
        price: this.ebook.price,
        url: this.ebook.url,
        image: this.ebook.image,
      };

      EbookDataService.create(data)
        .then((response) => {
          this.ebook.id = response.data.id;
          console.log(response.data);
          this.error = false;
        })
        .catch((e) => {
          this.message = e.response.data.message;
          this.error = true;
          console.log(e);
        });
      console.log("guardandoo....");
      this.error ? null : this.resetForm();
      this.snackbar = true;
    },
    //primero subimos al servidor el archivo para obtener su url
    selectFile(file) {
      if (!file) {return}
      this.progress = 0;
      this.currentFile = file;
      //El progress se calculará basándose en event.loadedy event.total
      UploadService.upload(this.currentFile, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.ebook.url = response.data.fileInfo[0].url; //guardo la url
        })
        .catch((e) => {
          console.log(e);
          this.progress = 0;
          this.messageF = "No se pudo cargar el archivo";
          this.currentFile = undefined;
        });
    },
    selectImage(image) {
      if (!image) {return}
      this.progressI = 0;
      this.currentImage = image;
      //El progress se calculará basándose en event.loadedy event.total
      UploadServiceImg.upload(this.currentImage, (event) => {
        this.progressI = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.ebook.image = response.data.fileInfo[0].url; //guardo la url
        })
        .catch((e) => {
          console.log(e);
          this.progressI = 0;
          this.messageI = "No se pudo cargar la imagen";
          this.currentImage = undefined;
        });
    },
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
      this.currentFile= undefined;
      this.currentImage = undefined;
      this.ebook.url = "";
      this.ebook.image = "";
      this.progressI = 0;
      this.progress = 0;
    },
  },
};
</script>

<style>
.list {
  max-width: 961px;
}
</style>
<template>
<v-container>
  <div class="submit-form mt-3 mx-auto">
    <add-ebook></add-ebook>
    <div v-if="currentFile">
      <div>
        <v-progress-linear
          v-model="progress"
          color="light-blue"
          height="25"
          reactive
        >
          <strong>{{ progress }} %</strong>
        </v-progress-linear>
      </div>
    </div>

    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <v-file-input
          show-size
          label="File input"
          @change="selectFile"
        ></v-file-input>
      </v-col>

      <v-col cols="4" class="pl-2">
        <v-btn color="success" dark small @click="upload">
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-alert v-if="message" border="left" color="blue-grey" dark>
      {{ message }}
    </v-alert>

    <v-card v-if="url.length > 0" class="mx-auto">
      <v-list>
        <v-subheader>Libro Subido</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item>
            <a :href="url">{{name}}</a>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
  </v-container>
</template>

<script>
import UploadService from "../services/upload.service";
import AddEbook from "./AddEbook"

export default {
  name: "upload-files",
  data() {
    return {
      currentFile: undefined,
      progress: 0, //es el porcentaje de progreso de carga de archivos
      message: "",
      url:"", //obtengo el URl del archivo subido
      name:"",
    };
  },
    components: {
    AddEbook,
  },
  methods: {
    selectFile(file) {
      this.progress = 0;
      this.currentFile = file;
    },
    upload() {
      if (!this.currentFile) {
        this.message = "Please select a file!";
        return;
      }

      this.message = "";

      //El progress se calculará basándose en event.loadedy event.total
      UploadService.upload(this.currentFile, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.message = response.data.message;
          this.url = response.data.fileInfo[0].url; //guardo la url
          this.name = response.data.fileInfo[0].name //guardo el nombre
          return UploadService.getFiles(); //obtenemos la información de los archivos
        })
        .then((files) => {
          console.log(files);
          this.fileInfos = files.data; //asignamos a nuestro array los datos de nombre y url
        })
        .catch(() => {
          this.progress = 0;
          this.message = "No se pudo cargar el archivo";
          this.currentFile = undefined;
        });
    },
  },
  mounted() {
    UploadService.getFiles().then((response) => {
      this.fileInfos = response.data;
    });
  },
};
</script>
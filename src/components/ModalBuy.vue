<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="grey darken-2" text v-bind="attrs" v-on="on">
          Comprar
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Proceso de pago</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nombre del Titular"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Número de tarjeta"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Fecha de expiración"
                    placeholder="MM/AA"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Codigo de seguridad"
                    placeholder="123"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1 white--text" @click="dialog = false">
            Cerrar
          </v-btn>
          <v-btn color="grey darken-3 white--text" @click="buy(idebook)">
            Comprar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import UserService from "../services/user.service";
export default {
  name: "cart-modal",
  props: ["idebook"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    buy(ebook) {
      const data = {
        userid: this.$store.state.auth.user.id,
        ebookid: ebook,
      };
      console.log(data);
      UserService.postBuy(data)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
      this.dialog = false;
    },
  },
};
</script>
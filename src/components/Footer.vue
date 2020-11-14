<template>
  <v-footer
    class="py-4"
    dark
    height="auto"
  >
    <v-container class="mx-auto">
      <v-row>
          <v-btn
            v-for="(item, i) in items"
            :key="i"
            :href="item.href"
            class="ml-0 mr-3"
            square
            target="_blank"
            text
          >
            <v-icon v-text="item.icon" />
          </v-btn>

        <v-spacer />

        <v-btn
          title="Go to top"
          @click="$vuetify.goTo(0)"
          text
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'Footer',

    data: () => ({
      items: [
        {
          href: 'https://twitter.com/MaxiValenzano',
          icon: 'mdi-twitter',
        },
        {
          href: 'https://www.instagram.com/maxivalenzano/',
          icon: 'mdi-instagram',
        },
        {
          href: '#!',
          icon: 'mdi-facebook',
        },
        {
          href: '#!',
          icon: 'mdi-google-plus',
        },
        {
          href: '#!',
          icon: 'mdi-reddit',
        },
        {
          href: '#!',
          icon: 'mdi-discord',
        },
        {
          href: '#!',
          icon: 'mdi-pinterest',
        },
      ],
    }),
  }
</script>

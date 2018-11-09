<template>
  <v-app dark>
    <snackbar />
    <v-navigation-drawer
      v-if="isAuthenticated"
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >

      <v-list>

        <v-toolbar
          flat
          class="transparent">
          <v-list class="pa-0">
            <v-list-tile
              router
              to="/"
              exact
            >
              <v-list-tile-action>
                <v-icon>apps</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>My Applications</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-divider light />

        <v-toolbar
          v-show="!!currentApp.id"
          flat
          class="transparent">
          <v-list class="pa-0">
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ currentApp.name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-divider light />

        <v-list-tile
          v-for="(item, i) in navItems"
          v-show="showMenuItem(item)"
          :to="item.to"
          :key="i"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-spacer />
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-btn
              v-if="isAuthenticated"
              icon
              @click.stop="miniVariant = !miniVariant"
            >
              <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'" />
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-side-icon
        v-if="isAuthenticated"
        @click="drawer = !drawer"
      />

      <v-toolbar-title v-text="title"/>

      <v-spacer />

      <v-btn
        v-if="isAuthenticated"
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>person</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      :right="right"
      v-model="rightDrawer"
      temporary
      fixed
    >
      <v-list>
        <v-list-tile @click.native="rightDrawer = false">
          <v-list-tile-action >
            <v-btn icon>
              <v-icon>close</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-list>
          <v-list-tile
            v-for="(item, i) in profileItems"
            :to="item.to"
            :key="i"
            router
            exact
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title" />
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import snackbar from '../components/snackbar'

  export default {
    components: {
      snackbar
    },
    data() {
      return {
        clipped: true,
        drawer: true,
        navItems: [
          { icon: 'pages', title: 'Pages', to: `/app-pages`, showForAppOnly: true},
          { icon: 'bubble_chart', title: 'Collections', to: `/collections`, showForAppOnly: true},
          { icon: 'widgets', title: 'Components', to: `/components`, showForAppOnly: true}
        ],
        profileItems: [
          { icon: 'fingerprint', title: 'Profile', to: '/' },
          { icon: 'attach_money', title: 'Account', to: '/inspire' },
          { icon: 'settings', title: 'Settings', to: '/inspire' },
          { icon: 'help', title: 'Help', to: '/inspire' },
          { icon: 'block', title: 'Sign Out', to: '/auth/sign-off' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'SnapApp'
      }
    },
    computed: mapGetters({
      isAuthenticated: 'isAuthenticated',
      loggedUser: 'loggedUser',
      currentApp: 'apps/current'
    }),
    methods: {
      showMenuItem (item) {
        if (!item.showForAppOnly) return true
        if (item.showForAppOnly && !!this.currentApp.id) return true

        return false
      }
    }
  }
</script>

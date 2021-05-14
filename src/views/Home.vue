<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>

<template lang="pug">
  section#home
      a-result(title="Welcome! glad to see you🎉" subTitle="Do you have a list to do? Add it right away.")
        template(slot="icon")
          a-icon(type="smile" theme="twoTone")
        template(slot="extra")
          a-button(v-if="user" type="primary" @click="$router.push({path:'/dashboard'})") My Dashboard
          a-button(v-if="user" @click="logout()") Logout
          a-button(v-if="!user" type="primary" to="register" @click="$router.push({path:'/register'})") Now Register
          a-button(v-if="!user"  to="register" @click="$router.push({path:'/login'})") Login
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      validationRules: {
        email: [
          "email",
          {
            rules: [
              { type: "email", message: "E-mail is not valid." },
              { required: true, message: "E-mail is required." },
            ],
            normalize: (value) => value?.toLowerCase(),
          },
        ],
        password: [
          "password",
          {
            rules: [
              { required: true, message: "Password is required." },
              {
                min: 8,
                message:
                  "Password should have a minimum length of 8 characters.\n",
              },

              {
                pattern: /^\S+$/,
                message: "Password should not include spaces.\n",
              },
            ],
          },
        ],
      },

      loading: false,
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    ...mapActions(["login"]),
    handleLogin(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.loading = true;
          try {
            await this.login(values);
            this.$notification.success({
              message: "Successfully logged in",
              key: 1,
            });
            this.$router.replace({ path: "/" });
          } catch (error) {
            this.$notification.error({ message: error.message, key: 1 });
          } finally {
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>

<template lang="pug">
  section#login
    a-row(type="flex")
      a-col(span="24")
        h2(style="text-align:center") LogIn
      a-col(span="24")
        a-row(type="flex" justify="center")
          a-col(span="12")
            a-form#components-form-demo-normal-login(:form="form" @submit="handleLogin")
              a-form-item(label="E-mail" has-feedback)
                a-input(type="email" placeholder="Your email" v-decorator="validationRules.email" )
              a-form-item(label="Password" has-feedback)
                a-input(type="password" placeholder="Your password" v-decorator="validationRules.password" )
              a-form-item(style="text-align:right;")
                a-button(type="primary" html-type="submit" :loading="loading" icon="login") Login
                div Don't you have an account? <router-link to="/register">Register</router-link>

</template>

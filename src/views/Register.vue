<script>
import { mapActions } from "vuex";
import { notification } from "ant-design-vue";
export default {
  data() {
    return {
      validationRules: {
        name: [
          "name",
          {
            rules: [{ required: true, message: "Your name is required." }],
          },
        ],
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
              { validator: this.validateToNextPassword },
            ],
          },
        ],
        passwordConfirmation: [
          "passwordConfirmation",
          {
            rules: [
              { required: true, message: "Password confirmation is required." },
              { validator: this.compareToFirstPassword },
            ],
          },
        ],
      },
      formItemLayout: {
        labelCol: {
          sm: { span: 24 },
        },
        wrapperCol: {
          sm: { span: 24 },
        },
      },
      loading: false,
    };
  },

  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: "register",
    });
  },
  methods: {
    ...mapActions(["register"]),
    handleRegister(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          this.loading = true;
          delete values.passwordConfirmation;
          try {
            await this.register(values);
            notification.success({
              message: "Your account was created successfully.",
              duration: 2,
              key: 1,
            });
            setTimeout(() => {
              this.$router.push({ path: "/login" });
            }, 2 * 1000);
          } catch (error) {
            notification.error({
              message: error.message,
              duration: 0,
              key: 1,
            });
          } finally {
            this.loading = false;
          }
        }
      });
    },

    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmPasswordDirty) {
        form.validateFields(["confirmPassword"], { force: true });
      }
      callback();
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("The passwords you entered are inconsistent.");
      } else {
        callback();
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmPasswordDirty = this.confirmPasswordDirty || !!value;
    },
  },
};
</script>

<template lang="pug">
  section#register
    a-row(type="flex")
      a-col(span="24")
        h2(style="text-align:center") Register
      a-col(span="24")
        a-row(type="flex" justify="center")
          a-col(span="12")
            a-form(:form="form" @submit="handleRegister")
              a-form-item(label="Name" v-bind="formItemLayout")
                a-input(placeholder="Your name" v-decorator="validationRules.name")
              a-form-item(label="Email address" v-bind="formItemLayout")
                a-input(placeholder="Your email" v-decorator='validationRules.email')
              a-form-item(label="Password" v-bind="formItemLayout")
                a-input(type="password" placeholder="Your password" v-decorator="validationRules.password")
              a-form-item(label="Confirm password" v-bind="formItemLayout")
                a-input(type="password" placeholder="Your password again" v-decorator="validationRules.passwordConfirmation" @blur="handleConfirmBlur")
              a-form-item(v-bind="formItemLayout" style="text-align:right;")
                a-button(type="primary" html-type="submit" :loading="loading" icon="user-add") Register
                div Already have an account? <router-link to="/login">Log in</router-link>
</template>

<style>
.ant-form-item-label {
  text-align: left;
}
</style>
<style scoped>
img {
  width: 100%;
  height: 100%;
}
</style>

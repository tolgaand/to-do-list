<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    collapsed: false,
  }),
  computed: {
    ...mapState(["user"]),
  },
};
</script>
<template lang="pug">
  a-layout#components-layout-demo-custom-trigger
    a-layout-sider(v-model="collapsed" :trigger="null" collapsible)
        .logo
            h1 #TD List

        a-menu(theme="light" mode="inline" )
          router-link(to="/" role="menu-item" style="padding-left:24px;" class="ant-menu-item" tag="li" exact)
            a-icon(type="home")
            span Home
 
    a-layout
      a-layout-header(style="background:#fff; padding:0")
          a-icon(class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="collapsed = !collapsed")
      a-layout-content( :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }")
        router-view
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
body {
  font-family: "Poppins";
}
.logo h1 {
  font-weight: 700;
}
.ant-layout-sider {
  background: #fff;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>

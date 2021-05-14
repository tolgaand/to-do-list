import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "ant-design-vue/dist/antd.css";

import {
  Button,
  Input,
  Icon,
  Layout,
  Row,
  Col,
  Comment,
  Tooltip,
  Avatar,
  Card,
  Tag,
  Radio,
  Menu,
  Form,
  Alert,
  Empty,
  Tabs,
  Result,
  notification,
  DatePicker,
} from "ant-design-vue";

const components = [
  Button,
  Input,
  Icon,
  Layout,
  Row,
  Col,
  Comment,
  Tooltip,
  Avatar,
  Card,
  Tag,
  Radio,
  Menu,
  Form,
  Alert,
  Empty,
  Tabs,
  Result,
  DatePicker,
];

components.forEach((c) => Vue.use(c));

Vue.config.productionTip = false;
Vue.prototype.$notification = notification;

async function main() {
  const storeInstance = await store();
  new Vue({
    store: storeInstance,
    router: router(storeInstance),
    render: (h) => h(App),
  }).$mount("#app");
}
main();

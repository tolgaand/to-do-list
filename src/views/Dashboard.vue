<script>
import { mapState, mapActions } from "vuex";
import { message } from "ant-design-vue";
import moment from "moment";

export default {
  data() {
    return {
      validationRules: {
        work: [
          "work",
          {
            rules: [
              { required: true, message: "Your work to do is required." },
              {
                min: 8,
                message:
                  "Your to do work should have a minimum length of 8 characters.\n",
              },
            ],
          },
        ],
        time: [
          "time",
          {
            rules: [{ required: true, message: "Your time is required." }],
          },
        ],
      },
      loading: false,
    };
  },
  computed: {
    ...mapState(["user", "toDoList"]),
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "work" });
  },

  methods: {
    ...mapActions(["addWork", "deleteWork", "updateWork"]),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) this.loading = true;
        try {
          if (values.work && values.time) {
            values.time = new Date(values.time).getTime();
            await this.addWork(values);
            message.success("Data created successfully");
            this.form.resetFields(["work", "time"]);
          }
        } catch (error) {
          message.error(error.message);
        } finally {
          this.loading = false;
        }
      });
    },
    async handleDeleteWork(id) {
      const loading = message.loading("Deleting work", 0);
      try {
        await this.deleteWork(id);
        message.success("Work deleted successfully");
      } catch (error) {
        message.error(error.message);
      } finally {
        setTimeout(loading, 1);
      }
    },
    async handleUpdateWork(id) {
      const loading = message.loading("Updating work", 0);
      try {
        await this.updateWork(id);
        message.success("Work updated successfully");
      } catch (error) {
        message.error(error.message);
      } finally {
        setTimeout(loading, 1);
      }
    },
    workStatus(work) {
      if (work.done)
        return {
          message: "Completed",
          icon: "check-circle",
          iconColor: "#52c41a",
          class: "text-line",
        };
      else if (work.endTime > Date.now())
        return {
          message: "Operation in progress",
          icon: "clock-circle",
          iconColor: "silver",
        };
      else
        return {
          message: "Expired",
          icon: "close-circle",
          iconColor: "#f5222d",
          class: "text-line",
        };
    },
    moment,
    disabledDate(current) {
      return moment(current).endOf("day") < moment().endOf("day");
    },
  },
};
</script>

<template lang="pug">
  section#dashboard
    a-row(type="flex")
      a-col(:span="24")
        #userText
          h2 Welcome {{user.displayName}}
          p Thank you for not forgetting me, it's good to see you again🎉
        a-row(type="flex" justify="space-between")
          a-col(span="10")
            h2 Add a new work
            a-form(:form="form" @submit="handleSubmit" )
              a-form-item(label="Work to do" has-feedback )
                a-input(placeholder="Enter the work to be done" type="textarea" rows="2" v-decorator="validationRules.work")
              a-form-item(label="Finish Time" has-feedback )
                a-date-picker(show-time placeholder="Select Time" :disabled-date="disabledDate" v-decorator="validationRules.time")
              a-form-item(style="text-align:right;")
                a-button(type="primary" html-type="submit" :loading="loading" icon="save") Save

          a-col(span="12")
            h2 Your works 
            #works
              p(v-if="!toDoList.length") This place is very clean
              a-card(v-for="work in toDoList" :key="work.id")
                .header
                  p(:class="workStatus(work).class") {{ work.description }}
                  .icons
                    a-icon(v-if="work.endTime > Date.now() && !work.done" type="check" @click="handleUpdateWork(work.id)") 
                    a-icon(type="delete" @click="handleDeleteWork(work.id)") 
                .footer 
                  small Added Time: {{moment(work.createdAt).fromNow()  }}
                  small Finish Time: {{ moment(work.endTime).fromNow() }}
                
                  a-tooltip(placement="top" :title="workStatus(work).message")
                    a-icon(:type="workStatus(work).icon" theme="twoTone" :two-tone-color="workStatus(work).iconColor") 


</template>

<style>
#works .header {
  display: flex;
  justify-content: space-between;
}
#works .header p {
  font-weight: bold;
}
#works .header .icons {
  position: absolute;
  right: 0px;
  top: 0px;
  opacity: 0;
  transition: all 1s;
}
#works .header .icons i {
  cursor: pointer;
  font-size: 20px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
  z-index: 999;
}
#works .ant-card:hover .header .icons {
  opacity: 1;
}

#works .footer i {
  font-size: 20px;
  position: absolute;
  right: 5px;
  bottom: 5px;
}
#works .ant-card {
  margin-top: 10px;
}
#works .ant-card .ant-card-body {
  padding-bottom: 3px;
}
#works .footer small {
  display: block;
}
.text-line {
  text-decoration-line: line-through !important;
}
</style>

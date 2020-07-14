<template>
  <el-dialog :visible.sync="dialogVisible" :fullscreen="true" class="addquestion">
    <div slot="title" class="title">新增题库测试</div>
    <el-form :model="form" class="form" :rules="rules" ref="form">
      <el-form-item label="学科" prop="subject">
        <el-select placeholder="请选择学科" v-model="form.subject">
          <el-option
            v-for="(item, index) in getSubjectlist"
            :label="item.name"
            :key="index"
            :value="item.id"
            v-show="item.status==1"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" prop="step">
        <el-select placeholder="请选择阶段" v-model="form.step">
          <el-option
            :label="value"
            :value="+key"
            v-for="(value, key,index) in stepObj"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="enterprise">
        <el-select placeholder="请选择企业" v-model="form.enterprise">
          <el-option
            v-for="(item, index) in getBusinesslist"
            :key="index"
            :label="item.name"
            :value="item.id"
            v-show="item.status==1"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-cascader v-model="form.city" :options="options" :props="{ value: ' label' }"></el-cascader>
      </el-form-item>
      <el-form-item label="题型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio v-for="(value,key, index) in typeObj" :key="index" :label="+key">{{value}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty">
        <el-radio-group v-model="form.difficulty">
          <el-radio v-for="(value,key, index) in difficultyObj" :key="index" :label="+key">{{value}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <hr />
      <br />
      <el-form-item label="试卷标题" prop="title" class="setMargin">
        <quillEditor
          v-model="form.title"
          :options="{placeholder:'请在这里输入'}"
          @change="editorchange('title')"
        ></quillEditor>
      </el-form-item>
      <el-form-item
        :label="typeObj[form.type]"
        :prop="{1:'single_select_answer',2:'multiple_select_answer',3:'short_answer'}[form.type]"
      >
        <allsevect :form="form" class="allselect" @change="allselectchange"></allsevect>
      </el-form-item>
      <hr />
      <br />
      <el-form-item label="解析视频">
        <uploadFile v-model="form.video" type="video"></uploadFile>
      </el-form-item>
      <el-form-item label="答案解析" prop="answer_analyze" class="setMargin">
        <quillEditor
          v-model="form.answer_analyze"
          :options="{placeholder:'请在这里输入'}"
          @change="editorchange('answer_analyze')"
        ></quillEditor>
      </el-form-item>
      <el-form-item label="试题备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="btn">
      <el-button @click="dialogVisible= false">取消</el-button>
      <el-button type="primary" @click="suinpt">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { regionData } from "element-china-area-data";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import allsevect from "./allsevect.vue";
import { quillEditor } from "vue-quill-editor";
import uploadFile from "./userquesetion";
import { addquestionlist ,editquestionlist} from "@/api/question.js";
export default {
  components: {
    quillEditor,
    allsevect,
    uploadFile
  },
  props: [
    "getSubjectlist",
    "getBusinesslist",
    "stepObj",
    "typeObj",
    "difficultyObj",
    "mode"
  ],

  data() {
    return {
      dialogVisible: false,
      options: regionData,
      form: {
        subject: "", //学科id标识
        step: "", //阶段
        enterprise: "", // 企业
        city: [], //省
        type: 1, //题型
        difficulty: 1, //题目难度
        title: "", //标题
        single_select_answer: "", //单选题
        multiple_select_answer: [], //多选题
        short_answer: "", //简答
        video: "", //解析视频
        answer_analyze: "", //答案解析
        remark: "", //答案备注
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: ""
          },
          {
            label: "B",
            text: "猫不理",
            image: ""
          },
          {
            label: "C",
            text: "麻花",
            image: ""
          },
          {
            label: "D",
            text: "炸酱面",
            image: ""
          }
        ]
      },
      rules: {
        subject: [{ required: true, message: "请选择学科", trigger: "change" }], //学科id标识
        step: [{ required: true, message: "请选择阶段", trigger: "change" }], //阶段
        enterprise: [
          { required: true, message: "请选择企业", trigger: "change" }
        ], // 企业
        city: [{ required: true, message: "请选择城市", trigger: "change" }], //省
        type: [{ required: true, message: "请选择题型", trigger: "change" }], //题型
        difficulty: [
          { required: true, message: "请选择题目难度", trigger: "change" }
        ], //题目难度
        title: [{ required: true, message: "请选择标题", trigger: "change" }], //标题
        single_select_answer: [
          { required: true, message: "请选择单选题", trigger: "change" }
        ], //单选题
        multiple_select_answer: [
          { required: true, message: "请选择多选题", trigger: "change" }
        ], //多选题
        short_answer: [
          { required: true, message: "请输入简答", trigger: "change" }
        ], //简答
        answer_analyze: [
          { required: true, message: "请输入答案解析", trigger: "change" }
        ], //答案解析
        remark: [
          { required: true, message: "请输入答案备注", trigger: "change" }
        ] //答案备注
      }
    };
  },
  methods: {
    suinpt() {
      window.console.log(this.form.single_select_answer);
      window.console.log(this.form.multiple_select_answer);
      window.console.log(this.form.short_answer);
      this.$refs.form.validate(result => {
        if (result) {
          if (this.mode == "add") {
            addquestionlist(this.form).then(() => {
              this.$message.success("添加成功");
              this.dialogVisible = false;
              this.$parent.search();
            });
          }else{
            let _query=JSON.parse(JSON.stringify(this.form))
            _query.city=_query.city.join(",")
            editquestionlist(this.form).then(() => {
              this.$message.success("编辑成功");
              this.dialogVisible = false;
              this.$parent.search();
            });
          }
        }
      });
    },
    editorchange(str) {
      this.$refs.form.validateField(str);
    },
    allselectchange() {
      this.$refs.form.validateField([
        "single_select_answer",
        "multiple_select_answer",
        "short_answer"
      ]);
    }
  }
};
</script>

<style lang="less">
.addquestion {
  .el-dialog__header {
    padding: 0;
  }
  .allsevect {
    .el-input__inner {
      border-color: #dcdfe6;
    }
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .title {
    height: 53px;
    background: rgba(3, 192, 249, 1);
    color: #fff;
    text-align: center;
    line-height: 53px;
  }
  .btn {
    text-align: center;
  }
  .form {
    width: 832px;
    margin: 0 auto;
  }
  .el-select {
    width: 364px;
    margin-left: 30px;
  }
  .el-cascader {
    margin-left: 30px;
    width: 364px;
  }
  .el-form-item__label {
    text-align: left;
  }
  .setMargin {
    .el-form-item__content {
      margin-left: 0px !important;
      margin-top: 50px;
    }
  }
}
</style>
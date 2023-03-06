<template>
  <div class="manage">
    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 用户表单信息 -->
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :inline="true"
        :rules="rules"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请填写地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd"> +新增</el-button>
    </div>
    <div class="common-tabel">
      <el-table stripe height="90%" :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column prop="addr" label="地址">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { Message, MessageBox } from "element-ui";
import { getUser, addUser, editUser, delUser } from "../api";
export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      tableLabel: {
        name: "姓名",
        age: "年龄",
        sex: "性别",
        birth: "出生日期",
        addr: "地址",
      },
      modelType: 0, //0表示新增弹窗 1表示编辑
    };
  },
  methods: {
    submit() {
      if (this.modelType === 0) {
        addUser(this.form).then(() => {
          //重新获取列表接口
          this.getList();
        });
      } else {
        editUser(this.form).then(() => {
          this.getList();
        });
      }
      this.$refs.form.validate((valid) => {
        //清空表单数据
        this.$refs.form.resetFields();
        //关闭弹窗
        this.dialogVisible = !valid;
      });
    },
    //弹窗关闭时
    handleClose() {
      // console.log(this.$refs.form);
      //清除表单内元素
      this.$refs.form.resetFields();
      //关闭弹窗
      this.dialogVisible = false;
    },
    handleEdit(row) {
      this.modelType = 1;
      this.dialogVisible = true;
      //注意需要对当前行数据进行深拷贝,否则会出错
      this.form = JSON.parse(JSON.stringify(row));
    },
    handleDelete(row) {
      MessageBox.confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            Message({
              type: "success",
              message: "删除成功!",
            });
            //从新获取接口
            this.getList();
          });
        })
        .catch(() => {
          Message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleAdd() {
      this.modelType = 0;
      this.dialogVisible = true;
    },
    getList() {
      getUser().then(({ data }) => {
        console.log(data);
        this.tableData = data.list;
      });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style>
</style>
<template>
  <div class="member-level-container">
    <div class="toolbar">
      <el-button type="primary" icon="Plus" @click="showAddDialog">
        添加会员
      </el-button>
    </div>

    <el-table :data="memberList" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="60" align="center" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="phone" label="手机号" width="140" />
      <el-table-column prop="level" label="会员等级" width="120" align="center">
        <template #default="{ row }">
          <el-tag :type="levelTagType(row.level)">{{ row.level }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="province" label="省份" width="100" />
      <el-table-column prop="city" label="城市" width="100" />
      <el-table-column prop="address" label="详细地址" min-width="200" />
      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column label="操作" width="160" align="center" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="showEditDialog(row)">
            编辑
          </el-button>
          <el-popconfirm
            title="确定要删除该会员吗？"
            @confirm="handleDelete(row.id)"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑会员' : '添加会员'"
      width="560px"
      @close="resetForm"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="会员等级" prop="level">
          <el-select v-model="form.level" placeholder="请选择会员等级">
            <el-option label="普通会员" value="普通会员" />
            <el-option label="银卡会员" value="银卡会员" />
            <el-option label="金卡会员" value="金卡会员" />
            <el-option label="钻石会员" value="钻石会员" />
          </el-select>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="form.province" placeholder="请输入省份" />
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="form.city" placeholder="请输入城市" />
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input
            v-model="form.address"
            type="textarea"
            :rows="2"
            placeholder="请输入详细地址"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import { getMembers, addMember, deleteMember, updateMember } from '@/api/member'

export default defineComponent({
  name: 'MemberLevel',
  setup() {
    const formRef = ref(null)

    const state = reactive({
      memberList: [],
      dialogVisible: false,
      isEdit: false,
      editId: null,
      form: {
        name: '',
        phone: '',
        email: '',
        level: '',
        province: '',
        city: '',
        address: '',
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        level: [
          { required: true, message: '请选择会员等级', trigger: 'change' },
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
      },
    })

    const levelTagType = level => {
      const map = {
        普通会员: 'info',
        银卡会员: '',
        金卡会员: 'warning',
        钻石会员: 'success',
      }
      return map[level] || 'info'
    }

    const fetchList = async () => {
      const res = await getMembers()
      if (res.code === 200) {
        state.memberList = res.data.list
      }
    }

    const showAddDialog = () => {
      state.isEdit = false
      state.editId = null
      state.dialogVisible = true
    }

    const showEditDialog = row => {
      state.isEdit = true
      state.editId = row.id
      state.form = {
        name: row.name,
        phone: row.phone,
        email: row.email,
        level: row.level,
        province: row.province,
        city: row.city,
        address: row.address,
      }
      state.dialogVisible = true
    }

    const resetForm = () => {
      state.form = {
        name: '',
        phone: '',
        email: '',
        level: '',
        province: '',
        city: '',
        address: '',
      }
      if (formRef.value) {
        formRef.value.resetFields()
      }
    }

    const handleSubmit = async () => {
      if (!formRef.value) return
      await formRef.value.validate(async valid => {
        if (!valid) return
        if (state.isEdit) {
          const res = await updateMember({ id: state.editId, ...state.form })
          if (res.code === 200) {
            ElMessage.success('编辑成功')
            state.dialogVisible = false
            fetchList()
          }
        } else {
          const res = await addMember(state.form)
          if (res.code === 200) {
            ElMessage.success('添加成功')
            state.dialogVisible = false
            fetchList()
          }
        }
      })
    }

    const handleDelete = async id => {
      const res = await deleteMember({ id })
      if (res.code === 200) {
        ElMessage.success('删除成功')
        fetchList()
      }
    }

    fetchList()

    return {
      ...toRefs(state),
      formRef,
      levelTagType,
      showAddDialog,
      showEditDialog,
      resetForm,
      handleSubmit,
      handleDelete,
      fetchList,
    }
  },
})
</script>

<style scoped>
.member-level-container {
  padding: 20px;
}
.toolbar {
  margin-bottom: 16px;
}
</style>

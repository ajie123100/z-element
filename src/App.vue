<script setup lang="ts">
import { h, onMounted, reactive, ref, watch } from "vue";
import { createPopper, type Instance, type Options } from "@popperjs/core";
import ZButton from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import Icon from "./components/Icon/Icon.vue";
import Alert from "./components/Alert/Alert.vue";
import Tooltip from "./components/Tooltip/Tooltip.vue";
import Dropdown from "./components/Dropdown/Dropdown";
import Message from "./components/Message/Message.vue";
import Input from "./components/Input/Input.vue";
import Switch from "./components/Switch/Switch.vue";
import Select from "./components/Select/Select.vue";
import { createMessage } from "./components/Message/method";
import type { ButtonInstance } from "./components/Button/types";
import type { NameType } from "./components/Collapse/types";
import type { DropdownInstance, MenuOption } from "./components/Dropdown/types";
import type { SelectOption } from "./components/Select/tpyes";
import Form from "./components/Form/Form.vue";
import FormItem from "./components/Form/FormItem.vue";
import type { FormRules } from "./components/Form/types";
const buttonRef = ref<ButtonInstance | null>(null);
const dropdownRef = ref<DropdownInstance | null>(null);
const overlayNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
let popperInstance: Instance | null = null
const options: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabeled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' },
]
const open = () => {
  dropdownRef.value?.show()
}
const close = () => {
  dropdownRef.value?.hide()
}
onMounted(() => {
  const instance = createMessage({ message: 'hello world' })
  createMessage({ message: 'hello world 123', duration: 0, type: 'danger', showClose: true })
  if (buttonRef.value) {
    console.log(buttonRef.value.ref);
  }
  if (overlayNode.value && triggerNode.value) {
    popperInstance = createPopper(triggerNode.value, overlayNode.value, {
      placement: 'right'
    })
  }
  setTimeout(() => {
    popperInstance?.setOptions({ placement: 'bottom' })
  }, 2000)
});
const handleClick = () => {
  alert("12345");
};
const openedValue = ref<NameType[]>(["a"]);
const text = ref('')
const switchValue = ref(false)
const options2 = [
  { label: 'hello', value: 1 },
  { label: 'WWW', value: 2 },
  { label: 'cnm', value: 3 },
  { label: 'nihao', value: 4, disabled: true },
]
const test = ref(1)
const test2 = ref('')
const test3 = ref('')
const customeRender = (node: SelectOption) => {
  return h('div', { className: 'xyz' }, [h('b', node.label), h('span', node.value)])
}
const sss = reactive({
  name: '',
  phone: ''
})
const formRef = ref()
const rules: FormRules = {
  name: [{ type: 'string', required: true, trigger: 'blur' }],
  phone: [{ type: 'string', required: true, trigger: 'blur' }],
}
</script>

<template>
  <Form :model="sss" :rules="rules" ref="formRef">
    <FormItem label="name" prop="name">
      <Input v-model="sss.name" />
    </FormItem>
    <FormItem label="phone" prop="phone">
      <Input v-model="sss.phone" />
    </FormItem>
  </Form>
  <Select v-model="test" placeholder="请选择" :options="options2" clearable></Select>
  <Select v-model="test2" placeholder="请选择" :options="options2" clearable :render-label="customeRender"></Select>
  <Select v-model="test3" placeholder="请选择,可以过滤" :options="options2" filterable clearable></Select>
  <p>{{ test }}</p>
  <Switch v-model="switchValue" active-text="close" inactive-text="open" />
  <Input type="text" size="small" v-model="text" clearable show-password />
  <p>{{ text }}</p>
  <header>
    <Tooltip content="hell world" placement="right" trigger="hover">
      <img src="./assets/logo.svg" width="125" height="125" ref="triggerNode">
    </Tooltip>
    <Dropdown ref="dropdownRef" placement="bottom" trigger="click" :menu-options="options"
      @visible-change="e => console.log(e)" @select="e => console.log(e)">
      <img src="./assets/logo.svg" width="125" height="125" ref="triggerNode">
    </Dropdown>
  </header>


  <Icon icon="arrow-up" size="2xl" spin type="danger" />
  <z-button type="primary" @click="handleClick">Primary</z-button>
  <z-button @click="close" type="success">Primary</z-button>
  <z-button @click="open" type="success">Primary</z-button>
  <z-button type="info">Info</z-button>
  <z-button type="info" plain>plain</z-button><br>
  <z-button size="large" loading>loading</z-button>
  <z-button size="large" icon="arrow-up">icon</z-button>
  <Collapse v-model="openedValue" accordion>
    <CollapseItem name="a">
      <template #title>
        <h1>nice title</h1>
      </template>
      <h1>headline title</h1>
      <div>this is content a aaa</div>
    </CollapseItem>

    <CollapseItem name="b" title="nice title b item b">
      <div>this is content bbbbb test</div>
    </CollapseItem>

    <CollapseItem name="c" title="nice ccc" disabled>
      <div>this is content ccccc test</div>
    </CollapseItem>
  </Collapse>
  {{ openedValue }}
  <br>
  <div style="max-width: 600px">
    <Alert content="Primary alert" type="primary" closable show-icon center />
    <Alert content="Success alert" type="success" closable show-icon />
    <Alert content="Info alert" type="info" @close="handleClick" />
    <Alert content="Warning alert" type="warning" close-text="关闭它" />
    <Alert type="error" show-icon>
      <span>Erroe alert</span>
      <p>Erroe</p>
    </Alert>
  </div>
  <hr>
  <div style="max-width: 600px">
    <Alert content="Primary alert" type="primary" effect="dark" closable show-icon center />
    <Alert content="Success alert" type="success" effect="dark" />
    <Alert content="Info alert" type="info" effect="dark" />
    <Alert content="Warning alert" type="warning" effect="dark" />
    <Alert content="Error alert" type="error" effect="dark" />
  </div>
</template>

<style scoped>
.z-alert {
  margin: 20px 0 0;
}


header {
  line-height: 1.5;
}

.logo {
  display: block;
  border: 1px solid green;
}

.vk-tooltip__popper {
  border: 1px solid red;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

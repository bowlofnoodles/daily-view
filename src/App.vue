<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo">
        <img src="https://cdn.bowlofnoodles.top/img/noodles.png" />
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        v-model:selectedKeys="selectedKeys"
        class="menu"
        @click="onMenuClick"
      >
        <a-menu-item v-for="menu of menuList" :key="menu.key">
          {{ menu.title }}
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content class="content">
      <router-view />
    </a-layout-content>
    <a-layout-footer class="footer">
      每日一看 - daily view ©2021 Created by bowlofnoodles
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts">
type MenuItem = {
  title: string;
  key: string;
  path: string;
};
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const menuList = ref<MenuItem[]>([
      {title: '微博热搜', key: 'weibo', path: '/weibo'},
      {title: '豆瓣', key: 'douban', path: '/douban'}
    ]);
    const selectedKeys = ref<string[]>(['weibo']);
    const router = useRouter();

    const onMenuClick = ({ key }) => {
      if (selectedKeys.value.includes(key)) return;
      const target = menuList.value.find(item => item.key === key);
      if (!target) return;
      router.push(target.path);
    };
    return {
      selectedKeys,
      menuList,
      onMenuClick
    };
  }
});
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  z-index: 1;
  position: fixed;
  .logo {
    float: left;
    height: 40px;
    width: 40px;
    margin-right: 16px;
    img {
      height: 100%;
    }
  }
  .menu {
    line-height: 64px;
  }
}

.content {
  padding: 0 50px;
  margin-top: 64px;
  min-height: ~"calc(100vh - 104px)";
}

.footer {
  text-align: center;
  line-height: 40px;
  padding: 0;
}
</style>

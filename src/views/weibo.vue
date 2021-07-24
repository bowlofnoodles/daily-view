<template>
  <a-spin :spinning="loading">
    <div class="refresh" @click="fetchWeiboHotSpot">
      <RedoOutlined />
    </div>
    <a-list item-layout="horizontal" :data-source="list">
      <template #renderItem="{ item }">
        <a-list-item class="list-item">
          <a-list-item-meta>
            <template #description>
              <template v-if="item.view">
                <EyeOutlined />
                {{ item.view }}
              </template>
            </template>
            <template #title>
              <a :href="item.src" target="_blank">{{ item.title }}</a>
            </template>
            <template #avatar>
              <VerticalAlignTopOutlined v-if="item.rank === 'top'"/>
              <template v-else>{{ item.rank }}</template>
            </template>
          </a-list-item-meta>
          <template #extra>
            <span :class="['icon-txt', item.className]">{{ item.iconText }}</span>
          </template>
        </a-list-item>
      </template>
    </a-list>
  </a-spin>
</template>

<script lang="ts">
import { EyeOutlined, VerticalAlignTopOutlined, RedoOutlined  } from '@ant-design/icons-vue';
import { defineComponent, onMounted, ref } from 'vue';
import { getWeiboHotSpot } from '@/api';
import { milliFormat } from '@/utils';

export default defineComponent({
  setup() {
    const list = ref([]);
    const loading = ref(false);

    const iconClassMapping = {
      '新': 'icon-txt-new',
      '沸': 'icon-txt-boil',
      '热': 'icon-txt-hot',
      '爆': 'icon-txt-boom'
    };

    const fetchWeiboHotSpot = async () => {
      loading.value = true;
      try {
        const data = await getWeiboHotSpot();
        list.value = data.map(item => ({
          ...item,
          view: milliFormat(item.view),
          className: item.iconText ? iconClassMapping[item.iconText] || 'icon-txt-recommend' : ''
        }));
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchWeiboHotSpot);

    return {
      list,
      loading,
      fetchWeiboHotSpot
    };
  },
  components: {
    EyeOutlined,
    VerticalAlignTopOutlined,
    RedoOutlined
  }
});
</script>

<style lang="less" scoped>
@import '@/style/variable.less';

.refresh {
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  cursor: pointer;
  :deep(span) {
    margin-top: 10px;
    font-size: @font-size-big;
    color: @primary-color;
  }
}
  
.list-item {
  padding: 10px;
  margin: 10px;
  border-bottom: 1px solid @border-color-base;
  :deep(.ant-list-item-meta-avatar) {
    min-width: 40px;
    color: @gold-color;
    span {
      font-size: @font-size-big;
      margin-left: -6px;
    }
  }

  .icon-txt {
    display: inline-block;
    line-height: @font-size-sm;
    color: @white-color;
    border-radius: 4px;
    padding: 4px;
    &.icon-txt-hot {
      background: @gold-6;
    }
    &.icon-txt-boom {
      background: @red-8;
    }
    &.icon-txt-boil {
      background: @red-10;
    }
    &.icon-txt-new {
      background: @red-color;
    }
    &.icon-txt-recommend {
      background: @blue-color;
    }
  }
}

</style>

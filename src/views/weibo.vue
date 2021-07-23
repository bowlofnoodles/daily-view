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
          className: iconClassMapping[item.iconText]
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
.refresh {
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  cursor: pointer;
  /deep/ span {
    margin-top: 10px;
    font-size: 20px;
    color: #1890ff;
  }
}
  
.list-item {
  padding: 10px;
  margin: 10px;
  border: 1px solid #f0f0f0;
  /deep/ .ant-list-item-meta-avatar {
    min-width: 40px;
    color: #f26d5f;
    svg {
      font-size: 24px;
      margin-left: -6px;
    }
  }

  .icon-txt {
    display: inline-block;
    line-height: 12px;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    padding: 4px;
    &.icon-txt-hot {
      background: #ff9406;
    }
    &.icon-txt-boom {
      background: #bd0000;
    }
    &.icon-txt-boil {
      background: #f86400;
    }
    &.icon-txt-new {
      background: #ff3852;
    }
  }
}

</style>

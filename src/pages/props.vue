<template>
  <ul class="props">
    <li v-for="(prop, i) in element.props" :key="i">
      <span class="prop">{{ i }}</span>
      <span class="type">{{ propTypes(prop) }}</span>
      <span class="type" v-if="prop.note">- {{ prop.note }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    element: Object
  },
  methods: {
    propTypes(prop) {
      if (typeof prop.type === 'function') {
        return prop.type.name
      }

      let types = []

      for (const key in prop.type) {
        types.push(prop.type[key].name)
      }

      return types.join(', ')
    }
  }
}
</script>

<style scoped lang="scss">
.props {
  margin: 1rem 0 3rem 0;

  li {
    display: flex;
    align-items: center;

    .prop {
      font-size: $font-sm;
      color: $primary-text;
      background-color: #f9fafc;
      border: 1px solid #eaeefb;

      padding: 4px;
      border-radius: 4px;
    }

    .type {
      margin-left: 5px;
      font-size: $font-xs;
      color: $secondary-text;
    }

    &:not(:last-of-type) {
      margin-bottom: 0.5rem;
    }
  }
}
</style>

<template>
  <svg v-html="paths" :viewBox="viewBox" :style="style"></svg>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        required: true,
      },
      width: {
        type: String,
        default: '1rem',
      },
      height: {
        type: String,
        default: '1rem',
      },
    },

    computed: {
      viewBox() {
        const svgAsString = this.svg + '';
        const parts = svgAsString.split('viewBox="');
        const end = parts[1].indexOf('"');
        return parts[1].slice(0, end);
      },
      paths() {
        const svgAsString = this.svg + '';
        const openTag = svgAsString.split('>')[0];

        return svgAsString
          .replace(openTag, '')
          .replace('>', '')
          .replace('</svg>', '');
      },
      svg() {
        return require(`!html-loader!@/assets/svg/${this.icon}.svg`);
      },
      style() {
        return {
          width: this.width,
          height: this.height,
        };
      },
    },
  };
</script>

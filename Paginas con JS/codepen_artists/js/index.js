
new Vue({
  el: '#example',
  data: {
    slides: 8,
    loading: true
  },
  mounted() {
    setTimeout(() => this.loading = false, 2600)
  },
  components: {
    'carousel-3d': Carousel3d.Carousel3d,
    'slide': Carousel3d.Slide
  }
})
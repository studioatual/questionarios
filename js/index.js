Vue.component('VueSelect', {
  props: ['value', 'options'],
  data() {
    return {
      show: false,
    };
  },
  methods: {
    select(value) {
      this.$emit('input', value);
    },
    toggle() {
      this.show = !this.show;
    },
  },
  computed: {
    valueName() {
      if (!this.value) {
        return;
      }
      return this.options.filter((opt) => opt.idx == this.value)[0].name;
    },
  },
  template: `
    <div class="v-select" @click="toggle">
      <div class="v-select-name">{{ valueName }}</div>
      <div class="v-select-container" :class="{ 'show': show }">
        <div v-for="option in options" v-bind:key="option.idx" @click="select(option.idx)" class="v-select-item">{{ option.name }}</div>
      </div>
    </div>
  `,
});

new Vue({
  data() {
    return {
      tipos: [],
      perguntas: [],
    };
  },
  computed: {
    options() {
      let options = [];
      this.tipos.forEach((tipo) => {
        options.push({ idx: tipo.cod_tipo, name: tipo.desc_tipo });
      });
      return options;
    },
  },
  methods: {
    async getData() {
      fetch('http://localhost:3000/data')
        .then((data) => {
          return data.json();
        })
        .then((response) => {
          this.tipos = response.tipos;
          this.perguntas = response.perguntas;
        });
      /*
      try {
        const response = await apex.server.process('GET_DATA');
        this.tipos = response.tipos;
        this.perguntas = response.perguntas;
      } catch (err) {
        console.log(err.responseText);
      }
      */
    },
    addItem() {
      this.perguntas.push({
        cod_checklist: null,
        cod_pergunta: null,
        desc_pergunta: null,
        cod_tipo: null,
        obs: null,
      });
    },
  },
  mounted() {
    this.getData();
  },
}).$mount('#perguntas');

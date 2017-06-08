import Vue from 'vue';
import vueDobPicker from './src/vue-dob-picker';

new Vue({
  el: '#container',
  components: {
      vueDobPicker
  },
  data: {
    date: new Date(1970, 0, 1, 0, 0, 0, 0)
  }
});

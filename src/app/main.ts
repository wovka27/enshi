import { createApp } from 'vue';
import 'src/app/assets/styles/index.scss';
import 'swiper/css';
import App from '@app/App.vue';
import { directives } from '@app/directives';
import { withProviders } from '@app/providers';

const app = createApp(App);

withProviders(app);

directives.forEach((i) => app.directive(...i));

app.mount('#app');

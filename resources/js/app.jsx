import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    if (name.startsWith('User::')) {
      const page = name.replace('User::', '');
      return resolvePageComponent(
        `../../Modules/User/Resources/js/Pages/${page}.jsx`,
        import.meta.glob('../../Modules/User/Resources/js/Pages/**/*.jsx')
      );
    }
    if (name.startsWith('LMS::')) {
      const page = name.replace('LMS::', '');
      return resolvePageComponent(
        `../../Modules/LMS/Resources/js/Pages/${page}.jsx`,
        import.meta.glob('../../Modules/LMS/Resources/js/Pages/**/*.jsx')
      );
    }
    // الافتراضي: صفحات resources/js/Pages
    return resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx')
    );
  },
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);
  },
  progress: {
    color: '#4B5563',
  },
});

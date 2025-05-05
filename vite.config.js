import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                path.resolve(__dirname, 'resources/js/app.jsx'),
                path.resolve(__dirname, 'resources/css/app.css'),
                path.resolve(__dirname, 'Modules/User/resources/js/app.jsx'),
                path.resolve(__dirname, 'Modules/LMS/resources/js/app.jsx')
            ],
            refresh: [
                'resources/js/**',
                'Modules/User/resources/js/**',
                'Modules/LMS/resources/js/**'
            ],
        }),
        react(),
    ],
});
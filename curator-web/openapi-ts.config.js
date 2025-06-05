import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    input: 'http://localhost:3400/openapi.json',
    output: 'src/openapi-ts-client',
    plugins: ['@hey-api/client-fetch'],
});
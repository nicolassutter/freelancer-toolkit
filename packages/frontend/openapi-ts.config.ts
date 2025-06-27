import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    input: '../backend/docs/swagger.yaml',
    output: 'src/client',
    plugins: [
        'zod',
        {
            name: '@hey-api/sdk',
            // auto validate responses with zod
            validator: true,
        },
    ]
});
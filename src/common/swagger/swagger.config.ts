import type { SwaggerCustomOptions } from '@nestjs/swagger';
import { SWAGGER_COMPACT_CSS } from './swagger-styles';

export const SWAGGER_CUSTOM_OPTIONS: SwaggerCustomOptions = {
  swaggerOptions: {
    docExpansion: 'list',
    defaultModelsExpandDepth: 0,
    showExtensions: true,
    showCommonExtensions: true,
  },
  customCss: SWAGGER_COMPACT_CSS,
};

import { readFileSync } from 'fs';
import YAML from 'js-yaml';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

export default function initialize(swaggerDefinitionPath: string): express.RequestHandler[] {
    const documentation = YAML.load(readFileSync(swaggerDefinitionPath).toString('utf8'));

    return [...swaggerUi.serve, swaggerUi.setup(documentation)];
}

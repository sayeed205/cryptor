import z from 'zod';

const envVarsSchema = z.object({
    NODE_ENV: z.string().default('development'),
    PORT: z.string().default('5000'),
    CORS_ORIGIN: z.string().default('*'),
});

const parsed = envVarsSchema.safeParse(Bun.env);

if (!parsed.success) {
    throw new Error(
        `Environment validation error: \n${parsed.error.issues
            .map(issue => `${issue.path.join('.')}: ${issue.message}`)
            .join('\n')}`,
    );
}

export const env = {
    nodeEnv: parsed.data.NODE_ENV,
    server: {
        port: parsed.data.PORT,
    },
    cors: {
        origin: parsed.data.CORS_ORIGIN,
    },
};

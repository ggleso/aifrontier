const defaultPort = 3000;

export interface AppConfig {
  host: string;
  port: number;
  nodeEnv: string;
}

export function loadConfig(environment: NodeJS.ProcessEnv = process.env): AppConfig {
  const rawPort = environment.PORT ?? String(defaultPort);
  const port = Number.parseInt(rawPort, 10);

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }

  return {
    host: environment.HOST ?? '127.0.0.1',
    port,
    nodeEnv: environment.NODE_ENV ?? 'development',
  };
}

import { createApp } from './app.js';
import { loadConfig } from './config.js';

const config = loadConfig();
const server = createApp();

server.listen(config.port, config.host, () => {
  console.log(`aifrontier listening on http://${config.host}:${String(config.port)}`);
});

function shutDown(signal: NodeJS.Signals) {
  console.log(`received ${signal}; shutting down`);
  server.close((error) => {
    if (error) {
      console.error(error);
      process.exitCode = 1;
    }
  });
}

process.once('SIGINT', shutDown);
process.once('SIGTERM', shutDown);

'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
  port: 80,
  host: '0.0.0.0',
});

const init = async () => {
  await server.register(require('inert'));

  server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
          directory: {
              path: 'public'
          }
      }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();

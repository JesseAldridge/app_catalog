'use strict';

const Hapi = require('hapi');
const Mustache = require('mustache');

const server = Hapi.server({
  port: 80,
  host: '0.0.0.0',
});

const init = async () => {
  await server.register(require('inert'));

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      const docs = [
        {
          title: "Men Walk on Moon",
          upvotes: 10,
          downvotes: 3
        },
        {
          title: "Nixon Resigns",
          upvotes: 9,
          downvotes: 5
        }
      ]

      const template_str = `
      {{#doc}}
        <div><b>{{title}}</b><span style="margin: 5px">{{upvotes}}/{{downvotes}}<span></div>
      {{/doc}}
      `;

      return Mustache.render(template_str, {doc: docs});
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

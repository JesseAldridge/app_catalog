'use strict';

const Hapi = require('hapi');
const Mustache = require('mustache');
const Admin = require("firebase-admin");

var serviceAccount = require("./secrets/vote-site-fc0ad-firebase-adminsdk-8ij3z-b93b0f328c.json");

Admin.initializeApp({
  credential: Admin.credential.cert(serviceAccount),
  databaseURL: "https://vote-site-fc0ad.firebaseio.com"
});

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
      const promise = new Promise((resolve, reject) => {
        Admin.database().ref('documents').once('value', snapshot => {
          const template_str = `
          <style>
            body { font-family: Helvetica }
            .wrapper { margin: 5px }
            .post { margin: 12px }
            button { border-radius: 3px }
            .panel { display: inline-block; text-align: center }
            .title { vertical-align: 100% }
            .vote-count { font-size: 80%; color: #888 }
          </style>

          <div class='wrapper'>
            {{#doc}}
              <div class='post'>
                <div class='panel'>
                  <button>👍</button>
                  <div class='vote-count'>{{upvotes}}</div>
                </div>
                <div class='panel'>
                  <button>👎</button>
                  <div class='vote-count'>{{downvotes}}</div>
                </div>
                <span class='title'>{{title}}</span>
              </div>
            {{/doc}}
          </div>
          `;

          const html = Mustache.render(template_str, {doc: snapshot.val()});
          resolve(html);
        });
      });

      return promise;
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

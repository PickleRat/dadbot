'use strict';

let owners = require('../functions/getOwners');

module.exports = {
  name: 'setplaying',

  exec: (client, msg, args) => {
    owners.isOwner(msg.author.id).then(owner => {
      if (owner) {
        var text = args
          .slice(
            args[1].toLowerCase() === 'listening' ||
              args[1].toLowerCase() === 'competing'
              ? 3
              : 2
          )
          .join(' ');
        var n = text.split(' | ')[1];
        text = text.split(' | ')[0];

        let types = {
          'playing': '**Playing**',
          'streaming': '**Streaming**',
          'listening to': '**Listening To**',
          'watching': '**Watching**',
          'custom': '**Custom**',
          'competing in': '**Competing In**'
        };

        if (
          Object.keys(types).indexOf(
            args
              .slice(
                1,
                args[1].toLowerCase() === 'listening' ||
                  args[1].toLowerCase() === 'competing'
                  ? 3
                  : 2
              )
              .join(' ')
          ) === -1
        ) {
          msg.channel.createMessage(
            `\`${args
              .slice(
                1,
                args[1].toLowerCase() === 'listening' ||
                  args[1].toLowerCase() === 'competing'
                  ? 3
                  : 2
              )
              .join(' ')}\` is not a valid game type!`
          );
          return;
        }

        let i = 0;
        let interval = setInterval(() => {
          grafana.remoteEval(
            i,
            `client.editStatus('${args[0]}', ${JSON.stringify({
              name: text,
              type: Object.keys(types).indexOf(
                args
                  .slice(
                    1,
                    args[1].toLowerCase() === 'listening' ||
                      args[1].toLowerCase() === 'competing'
                      ? 3
                      : 2
                  )
                  .join(' ')
              ),
              url: n
            })})`
          );
          if (++i === Number(process.env.instances)) {
            clearInterval(interval);
          }
        }, 500);

        msg.channel.createMessage(
          'I am now ' +
            types[
              args
                .slice(
                  1,
                  args[1].toLowerCase() === 'listening' ||
                    args[1].toLowerCase() === 'competing'
                    ? 3
                    : 2
                )
                .join(' ')
            ] +
            ' ' +
            text
        );
      } else
        client.createMessage(
          msg.channel.id,
          'You need the permission `BOT_OWNER` to use this command!'
        );
    });
  },

  options: {
    hidden: true,
    fullDescription: 'sets what the bot is playing. (Owner only command)',
    usage: '(status) (type) (game name)'
  }
};

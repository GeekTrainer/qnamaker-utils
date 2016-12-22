require('dotenv').config();

import * as restify from 'restify';
import * as builder from 'botbuilder';
import QnADialog from './qnadialog';

class App {
    run() {
        const bot = new builder.UniversalBot(new builder.ChatConnector());

        bot.dialog('/', new QnADialog('1f9546cac0b44a0a9b9832139ddc30c2', '64ac1b5c620f4a4bafbec15192bf284a'));

        const server = restify.createServer();
        server.post('/api/messages', (<builder.ChatConnector> bot.connector('*')).listen());
        server.listen(process.env.PORT);
    }
}

const app = new App();
app.run();
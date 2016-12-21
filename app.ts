require('dotenv').config();

import * as restify from 'restify';
import * as builder from 'botbuilder';
import Formatter from './formatter';

class App {
    run() {
        const server = restify.createServer(process.env.PORT);
        const bot = new builder.UniversalBot(new builder.ChatConnector());

        bot.dialog('/', async (session) => {
            
            Formatter.format(session, '');
            session.endConversation();
        });

        server.listen((<builder.ChatConnector> bot.connector('*')).listen());
    }
}

const app = new App();
app.run();
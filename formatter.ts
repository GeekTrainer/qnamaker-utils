import * as builder from 'botbuilder';

export default class Formatter {
    format(session: builder.Session, response: string) {
        response.split('\n').forEach(async message => {
            session.sendTyping();
            Formatter.sleep(message.length * 5).then(() => {
                session.send(message);
            });
        });
    }

    private static sleep(ms:number = 500) {
        return Promise.resolve(r => setTimeout(r, ms));
    }
}
import * as builder from 'botbuilder';

export default class Formatter {
    static format(session: builder.Session, response: string) {
        const messages = response.split('\n');
        messages.forEach(async message => {
            session.sendTyping();
            await Formatter.sleep();
            session.send(message);
        });
    }

    private static sleep(ms:number = 500) {
        return Promise.resolve(r => setTimeout(r, ms));
    }
}
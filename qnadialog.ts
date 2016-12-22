import Server from './server';
import * as builder from 'botbuilder';
import Formatter from './formatter';

export interface IQnADialogOptions {
    formatter?: Formatter
}

export interface IQnADialogReply {
    score:number,
    answer:string
}

export default class QnADialog extends builder.SimpleDialog {
    constructor(kbId: string, 
                subscriptionKey: string,
                options: IQnADialogOptions = {})
    {
        super(async (session) => {
            if(!options.formatter) options.formatter = new Formatter();

            const question:string = session.message.text;
            const reply = <IQnADialogReply> await Server.getResponse(question, kbId, subscriptionKey);
            options.formatter.format(session, reply.answer);
            session.endConversation();
        })
    }
}
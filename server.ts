import * as https from 'https';

export default class Server {
    private static kbId = '';
    private static key = '';


    static getResponse(question: string) {
        const postBody = JSON.stringify({ 'question': question });

        const options = {
            method: 'POST',
            path: `/qnamaker/v1.0/knowledgebases/${Server.kbId}/generateAnswer`,
            host: 'westus.api.cognitive.microsoft.com',
            headers: {
                'Content-Length': Buffer.byteLength(postBody),
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': Server.key;
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                return Promise.resolve(JSON.parse(data));
            });
        });
        req.write(postBody);
        req.end();
    }
}
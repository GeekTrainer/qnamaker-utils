import https = require('https');

export default class Server {
    static getResponse(question: string, kbId:string, subscriptionKey:string) : Promise<any> {
        return new Promise<string>((resolve, reject) => {
            console.log('loading');
            const postBody = JSON.stringify({ 'question': question });

            const options = {
                method: 'POST',
                path: `/qnamaker/v1.0/knowledgebases/${kbId}/generateAnswer`,
                host: 'westus.api.cognitive.microsoft.com',
                headers: {
                    'Content-Length': Buffer.byteLength(postBody),
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': subscriptionKey
                }
            };

            const req = https.request(options, (res) => {
                let data = '';
                res.on('error', (e) => console.log(e));
                res.on('data', (chunk) => data += chunk);
                res.on('end', () => {
                    console.log('finished');
                    resolve(JSON.parse(data));
                });
            });
            req.write(postBody);
            req.end();
        });
    }
}
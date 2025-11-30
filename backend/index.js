import express from 'express'
import cors from 'cors';
import {generate_link, get_link} from './short-link-service.js'
import {is_valid} from "./id.js";

const app = express()
const port = 3000


app.use(cors())
app.use(express.json())


app.post('/short-link', async (req, res) => {
    const request_body = await req.body;
    const result = generate_link(request_body.link)
    res.send({token: result})
});



app.get(/.*/, async (req, res) => {
    const path = req.path;
    if (path.startsWith("/")) {
        const token = path.substring(1);
        if (is_valid(token)) {
            const meta = get_link(token);
            if (meta) {
                const target_link = meta.link;
                res.status(303);
                res.append('Location', target_link);
                res.end();
                return;
            }
        }
    }
    res.status(404);
    res.append("Content-Type", "text/html");
    res.send(`
                    <!doctype html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport"
                              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>Not Found</title>
                    </head>
                    <body>
                    <h1>Not Found</h1>
                    </body>
                    </html>
    `);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

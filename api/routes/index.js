import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { Router } from "express";
import fs from "fs";
const router = Router();

const prefixApi = '/api/1.0'

const pathRouter = __dirname;

const extensionExtract = (file)=>{
    return file.split('.').shift()
}

fs.readdirSync(pathRouter).filter(file=>{
    const routeWithoutExtension = extensionExtract(file)
    if('index' !== routeWithoutExtension) {
        import(`./${routeWithoutExtension}.js`).then(module=>{
            router.use(`${prefixApi}/${routeWithoutExtension}`, module.router);
        })
    };
});

export default router;

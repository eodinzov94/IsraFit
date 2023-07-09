import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { __dirname } from '../helpers/helper.js';
import ApiError from '../error/ApiError.js';

interface LogRow {
    userEmail: string;
    date: string;
    method: string;
    url: string;
    status: string;
}


class AdminController {
    async getAllLogs(req: Request, res: Response, next: NextFunction) {
        try {
            const fileContent = fs.readFileSync(__dirname + '/access.log', 'utf-8');
            const lines = fileContent.split('\n');
            const logRows: LogRow[] = [];
            for (const line of lines) {
                const fields = line.split(' ');
                if(fields.length !== 5) continue;
                const [userEmail, date,method, url, status] = fields
                logRows.push({
                    userEmail,
                    date,
                    method,
                    url,
                    status,
                });
            }
            res.json({status:'OK',allLogs:logRows});
        } catch (e) { 
            console.log(e)
            next(ApiError.internal('Something went wrong'))
        }

    }
}


export default new AdminController()

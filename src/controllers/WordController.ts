import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';

@Controller('words')
export class WordsController {

    @Post('test')
    private test(req: Request, res: Response) {
        res.status(200).json({ test: 'tested' })
    }

    @Post('.json')
    private addWords(req: Request, res: Response) {
        Logger.Info('words post');
    }
}
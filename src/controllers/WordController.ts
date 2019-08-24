import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';

@Controller('')
export class WordsController {

    /**
     * Takes a JSON array of English-language words and adds them to the corpus (data store).
     */
    @Post('words.json')
    private addWords(req: Request, res: Response) {
        const words = req.body as string[];

        // TODO: Implement

        res.status(201).send();
    }

    /**
     * Deletes the word passed in from the URL from the data store
     */
    @Delete('words/:word.json')
    private deleteWord(req: Request, res: Response) {

        // TODO implement

        res.status(204).send();
    }

    /**
     * Deletes all contents of the data store.
     */
    @Delete('words.json')
    private deleteAllWords(req: Request, res: Response) {

        // TODO implement

        res.status(204).json({ success: true });
    }

    /**
     * Returns a count of words in the corpus and min/max/median/average word length
     */
    @Get('words/info.json')
    private wordCount(req: Request, res: Response) {

        // TODO implement

        res.status(200).json({ info: {} });
    }

    /**
     * Deletes a word and all of its anagrams from the store
     */
    @Delete('words/anagrams/:word.json')
    private deleteWordAndAnagrams(req: Request, res: Response) {

        // TODO implement

        res.status(204).send();
    }
}
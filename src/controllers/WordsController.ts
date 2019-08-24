import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Logger } from '@overnightjs/logger';
import { AnagramManager } from '../AnagramManager';

@Controller('')
export class WordsController {

    constructor(private _anagramManager: AnagramManager) { }

    /**
     * Takes a JSON array of English-language words and adds them to the corpus (data store).
     */
    @Post('words.json')
    public addWords(req: Request, res: Response) {
        const words = req.body.words as string[] || [];

        // Add each word to the corpus
        words.forEach(word => this._anagramManager.addWord(word));

        res.status(201).send();
    }

    /**
     * Deletes the word passed in from the URL from the data store
     */
    @Delete('words/:word.json')
    public deleteWord(req: Request, res: Response) {
        const word = req.params.word;
        this._anagramManager.deleteWord(word);

        res.status(204).send();
    }

    /**
     * Deletes all contents of the data store.
     */
    @Delete('words.json')
    public deleteAllWords(req: Request, res: Response) {
        this._anagramManager.deleteAll();

        res.status(204).send();
    }

    /**
     * Returns a count of words in the corpus and min/max/median/average word length
     */
    @Get('words/info.json')
    public wordCount(req: Request, res: Response) {

        // TODO implement

        res.status(200).json({ info: {} });
    }

    /**
     * Deletes a word and all of its anagrams from the store
     */
    @Delete('words/anagrams/:word.json')
    public deleteWordAndAnagrams(req: Request, res: Response) {
        const word = req.params.word;
        this._anagramManager.deleteAnagrams(this._anagramManager.generateAnagramHash(word));

        res.status(204).send();
    }
}
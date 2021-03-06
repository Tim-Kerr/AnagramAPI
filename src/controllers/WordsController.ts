import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';
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
        this._anagramManager.addWords(words);

        res.status(201).send();
    }

    /**
     * Returns a count of words in the corpus and min/max/median/average word length
     */
    @Get('words/info.json')
    public wordInfo(req: Request, res: Response) {
        res.status(200).json({
            info: {
                wordCount: this._anagramManager.wordCount(),
                wordLength: {
                    min: this._anagramManager.minWordLength(),
                    max: this._anagramManager.maxWordLength(),
                    median: this._anagramManager.medianWordLength(),
                    average: this._anagramManager.averageWordLength()
                }
            }
        });
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
     * Deletes all words from the store.
     */
    @Delete('words.json')
    public deleteAllWords(req: Request, res: Response) {
        this._anagramManager.deleteAll();

        res.status(204).send();
    }

    /**
     * Deletes a word and all of its anagrams from the store
     */
    @Delete('words/anagrams/:word.json')
    public deleteWordAndAnagrams(req: Request, res: Response) {
        const word = req.params.word;
        this._anagramManager.deleteAnagrams(word);

        res.status(204).send();
    }
}
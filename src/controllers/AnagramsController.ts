import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { AnagramManager } from '../AnagramManager';

@Controller('anagrams')
export class AnagramsController {

    constructor(private _anagramManager: AnagramManager) { }

    /**
     * Returns a JSON array of English-language words that are anagrams of the word passed in the URL.
     */
    @Get(':word.json')
    public anagrams(req: Request, res: Response) {
        const word = req.params.word;

        res.status(200).json({ anagrams: this._anagramManager.getAnagramsForWord(word) });
    }

    /**
     * Returns a JSON array of the top *x* words with the most anagrams
     */
    @Get('most')
    public mostAnagrams(req: Request, res: Response) {

        // TODO implement

        res.status(200).json({ words: [] });
    }

    /**
     * Returns a boolean indicating if the words passed in the query string params are anagrams of each other.
     * 
     * Words are passed in query string params as a comma delimited list of words
     * Ex: /anagrams?words=dear,dare,read
     */
    @Get()
    public areAnagrams(req: Request, res: Response) {
        const words = req.query.words.split(',');

        res.status(200).json({ areAnagrams: this._anagramManager.areAnagrams(words) });
    }

    /**
     * Returns all anagram groups of size >= *x*
     */
    @Get('groups')
    public anagramGroups(req: Request, res: Response) {

        // TODO implement

        res.status(200).json({ anagrams: [] })
    }
}
import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { AnagramManager } from '../AnagramManager';

@Controller('anagrams')
export class AnagramsController {

    constructor(private _anagramManager: AnagramManager) { }

    /**
     * Returns a JSON array of English-language words that are anagrams of the word passed in the URL.
     * Takes an optional query param 'limit' that indicates the maximum number of anagrams returned in the response.
     * 0 <= limit <= 100
     * If the limit query param is not supplied the max number of anagrams returned is 100.
     * 
     * Ex: anagrams/read.json?limit=5
     */
    @Get(':word.json')
    public anagrams(req: Request, res: Response) {
        const word = req.params.word;
        let limit = Math.min(100, parseInt(req.query.limit) || 100);
        if (limit <= 0) limit = 100;

        res.status(200).json({ anagrams: this._anagramManager.getAnagramsForWord(word).slice(0, limit) });
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
     * 
     * Takes a required query string param: 'size'.
     * 
     * Ex: anagrams/groups?size=4
     */
    @Get('groups')
    public anagramGroups(req: Request, res: Response) {

        // TODO implement

        res.status(200).json({ anagrams: [] })
    }
}
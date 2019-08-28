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
     * Takes an optional boolean parameter 'includeProperNouns' indicating whether the api should include proper nounds in the result.
     * The API returns proper nounds in the results unless includeProperNouns=false
     * 
     * Ex: anagrams/read.json?limit=5?includeProperNouns=false
     */
    @Get(':word.json')
    public anagrams(req: Request, res: Response) {
        const word = req.params.word;
        let limit = Math.min(100, parseInt(req.query.limit) || 100);
        if (limit <= 0) limit = 100;

        let includeProperNouns = true;
        if (req.query.includeProperNouns === 'false') {
            includeProperNouns = false;
        }

        let anagrams = this._anagramManager.getAnagramsForWord(word, includeProperNouns);

        res.status(200).json({ anagrams: anagrams.slice(0, limit) });
    }

    /**
     * Returns a JSON array of the top *x* words with the most anagrams
     */
    @Get('most')
    public mostAnagrams(req: Request, res: Response) {
        res.status(200).json({ words: this._anagramManager.mostAnagrams() });
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
     * The result will contain at most 100 entries. All other results will be truncated from the response.
     * 
     * Takes a required query string param: 'size'.
     * 0 <= size <= 100
     * 
     * Ex: anagrams/groups?size=4
     */
    @Get('groups')
    public anagramGroups(req: Request, res: Response) {
        let size = Math.min(100, parseInt(req.query.size));
        if (size > 100) size = 100;

        res.status(200).json({ anagrams: this._anagramManager.getAnagramGroupsGreaterThanSize(size).slice(0, 100) })
    }
}
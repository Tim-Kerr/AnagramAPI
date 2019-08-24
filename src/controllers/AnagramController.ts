import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('anagrams')
export class AnagramsController {

    /**
     * Returns a JSON array of English-language words that are anagrams of the word passed in the URL.
     */
    @Get(':word.json')
    private anagrams(req: Request, res: Response) {
        const words: string[] = [];

        // TODO implement

        res.status(200).json({ words });
    }

    /**
     * Returns a JSON array of the words sorted by how many anagrams they have, DESC
     */
    @Get('most')
    private mostAnagrams(req: Request, res: Response) {

        // TODO implement

        res.status(200).json({ words: [] });
    }

    /**
     * Returns a boolean indicating if the words passed in the query string params are anagrams of each other.
     */
    @Get()
    private areAnagrams(req: Request, res: Response) {

        // TODO implement

        res.status(200).json({ result: false });
    }

    /**
     * Returns all anagram groups of size >= *x*
     */
    @Get('groups')
    private anagramGroups(req: Request, res: Response) {

        // TODO implement

        res.status(200).json({ anagrams: [] })
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AnagramManager {
    constructor() {
        this._corpus = [];
        this._anagramLookupTable = {};
        this._wordCount = 0;
        this._totalWordCharacterCount = 0;
    }
    generateAnagramHash(word) {
        const charArray = word.toLowerCase().split('').sort();
        return charArray.reduce((hash, c) => hash + c, '');
    }
    addWord(word) {
        const anagrams = this.getAnagramsArray(word);
        if (!anagrams.includes(word)) {
            anagrams.push(word);
        }
    }
    deleteWord(word) {
        const anagramHash = this.generateAnagramHash(word);
        const anagrams = this.getAnagramsArray(anagramHash);
        this._anagramLookupTable[anagramHash] = anagrams.filter(w => w !== word);
    }
    deleteAnagrams(anagramHash) {
        delete this._anagramLookupTable[anagramHash];
    }
    deleteAll() {
        this._anagramLookupTable = {};
    }
    getAnagramsArray(word) {
        const anagramHash = this.generateAnagramHash(word);
        let anagrams = this._anagramLookupTable[anagramHash];
        if (!anagrams) {
            this._anagramLookupTable[anagramHash] = [];
            anagrams = this._anagramLookupTable[anagramHash];
        }
        return anagrams;
    }
    getAnagramsForWord(word) {
        return this.getAnagramsArray(word).filter(w => w !== word);
    }
    areAnagrams(words) {
        const anagramHashes = [];
        words.forEach(w => {
            anagramHashes.push(this.generateAnagramHash(w));
        });
        return anagramHashes.every(h => h === anagramHashes[0]);
    }
}
exports.AnagramManager = AnagramManager;

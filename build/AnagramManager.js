"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AnagramManager {
    constructor() {
        this._sortedWords = [];
        this._anagramLookupTable = {};
        this._charcterCount = 0;
    }
    generateAnagramHash(word) {
        const charArray = word.toLowerCase().split('').sort();
        return charArray.reduce((hash, c) => hash + c, '');
    }
    addWords(words) {
        words.forEach(word => {
            const anagrams = this.getAnagramsArray(word);
            if (!anagrams.includes(word)) {
                anagrams.push(word);
                this._sortedWords.push(word);
                this._charcterCount += word.length;
            }
        });
        this._sortedWords.sort((a, b) => a.length - b.length);
    }
    deleteWord(word) {
        const anagramHash = this.generateAnagramHash(word);
        const anagrams = this.getAnagramsArray(anagramHash);
        this._anagramLookupTable[anagramHash] = anagrams.filter(w => w !== word);
        this.removeWordFromSortedArray(word);
    }
    deleteAnagrams(word) {
        const anagramHash = this.generateAnagramHash(word);
        if (this._anagramLookupTable[anagramHash]) {
            this._anagramLookupTable[anagramHash].forEach(word => {
                this.removeWordFromSortedArray(word);
            });
        }
        delete this._anagramLookupTable[anagramHash];
    }
    deleteAll() {
        this._anagramLookupTable = {};
        this._sortedWords = [];
        this._charcterCount = 0;
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
    getAnagramsForWord(word, includeProperNouns = true) {
        let anagrams = this.getAnagramsArray(word).filter(w => w !== word);
        if (!includeProperNouns) {
            anagrams = anagrams.filter(a => a.charAt(0) === a.toLocaleLowerCase().charAt(0));
        }
        return anagrams;
    }
    areAnagrams(words) {
        const anagramHashes = [];
        words.forEach(w => {
            anagramHashes.push(this.generateAnagramHash(w));
        });
        return anagramHashes.every(h => h === anagramHashes[0]);
    }
    mostAnagrams() {
        let size = 0;
        let largestAnagramsKey = '';
        Object.keys(this._anagramLookupTable)
            .filter(key => this._anagramLookupTable.hasOwnProperty(key))
            .forEach(key => {
            if (this._anagramLookupTable[key].length > size) {
                largestAnagramsKey = key;
                size = this._anagramLookupTable[key].length;
            }
        });
        return (largestAnagramsKey) ? this._anagramLookupTable[largestAnagramsKey] : [];
    }
    wordCount() {
        return this._sortedWords.length;
    }
    minWordLength() {
        return (this._sortedWords.length > 0) ? this._sortedWords[0].length : 0;
    }
    maxWordLength() {
        return (this._sortedWords.length > 0) ? this._sortedWords[this._sortedWords.length - 1].length : 0;
    }
    medianWordLength() {
        if (!this._sortedWords.length)
            return 0;
        if (this._sortedWords.length % 2 === 0) {
            let num1 = this._sortedWords[Math.floor((this._sortedWords.length - 1) / 2)].length;
            let num2 = this._sortedWords[Math.ceil((this._sortedWords.length - 1) / 2)].length;
            return (num1 + num2) / 2;
        }
        return this._sortedWords[((this._sortedWords.length - 1) / 2)].length;
    }
    averageWordLength() {
        return (this._sortedWords.length > 0) ? this._charcterCount / this._sortedWords.length : 0;
    }
    getAnagramGroupsGreaterThanSize(size) {
        const anagramGroups = [];
        Object.keys(this._anagramLookupTable)
            .filter(key => this._anagramLookupTable.hasOwnProperty(key))
            .forEach(key => {
            if (this._anagramLookupTable[key].length >= size) {
                anagramGroups.push(this._anagramLookupTable[key]);
            }
        });
        return anagramGroups;
    }
    removeWordFromSortedArray(word) {
        const wordIndex = this._sortedWords.indexOf(word);
        if (wordIndex !== -1) {
            this._sortedWords.splice(wordIndex, 1);
            this._charcterCount -= word.length;
        }
    }
}
exports.AnagramManager = AnagramManager;

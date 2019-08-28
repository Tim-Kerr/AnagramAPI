export class AnagramManager {
    private _sortedWords: string[] = [];
    private _anagramLookupTable: { [key: string]: string[] } = {};
    private _charcterCount: number = 0;

    /**
     * Returns the given word's anagram hash.
     * A word and all of its anagrams will share the same anagram hash string.
     * 
     * The anagram hash is computed by:
     * - Calling toLowerCase() on the word string
     * - Split the lower-cased word into a char array
     * - Sort the char array alphabetically
     * - Convert the sorted char array back into a string
     * @param word The word whose anagram hash to generate
     */
    public generateAnagramHash(word: string): string {
        const charArray = word.toLowerCase().split('').sort();
        return charArray.reduce((hash, c) => hash + c, '');
    }

    /**
     * Adds the word to the corpus. 
     * If the word already exists in the corpus it will not be added again.
     * 
     * @param word The word to add to the corpus
     */
    public addWords(words: string[]): void {
        words.forEach(word => {
            const anagrams = this.getAnagramsArray(word);

            // Don't add the word if it already exists in the corpus
            if (!anagrams.includes(word)) {
                anagrams.push(word);
                this._sortedWords.push(word);
                this._charcterCount += word.length;
            }
        });

        this._sortedWords.sort((a, b) => a.length - b.length);
    }

    /**
     * Deletes the word from the corpus
     * 
     * @param word The word to delete from the corpus
     */
    public deleteWord(word: string): void {
        const anagramHash = this.generateAnagramHash(word);
        const anagrams = this.getAnagramsArray(anagramHash);
        this._anagramLookupTable[anagramHash] = anagrams.filter(w => w !== word);

        this.removeWordFromSortedArray(word);
    }

    /**
     * Deletes the word and its anagrams from the corpus
     * 
     * @param anagramHash The anagram hash key to delete from the corpus
     */
    public deleteAnagrams(word: string) {
        const anagramHash = this.generateAnagramHash(word);

        // Remove elements from the sorted words array
        if (this._anagramLookupTable[anagramHash]) {
            this._anagramLookupTable[anagramHash].forEach(word => {
                this.removeWordFromSortedArray(word);
            });
        }

        delete this._anagramLookupTable[anagramHash];
    }

    /**
     * Delete all words from the corpus
     */
    public deleteAll() {
        this._anagramLookupTable = {};
        this._sortedWords = [];
        this._charcterCount = 0;
    }

    /**
     * Returns the array of words that are anagrams of the input word.
     * The input word itself may appear in the array.
     * 
     * @param word The word whose anagrams are being retrieved
     */
    public getAnagramsArray(word: string): string[] {
        const anagramHash = this.generateAnagramHash(word);
        let anagrams = this._anagramLookupTable[anagramHash];
        if (!anagrams) {
            this._anagramLookupTable[anagramHash] = [];
            anagrams = this._anagramLookupTable[anagramHash];
        }

        return anagrams;
    }

    /**
     * Returns an array of words that are anagrams of the input word.
     * The result will not contain the input word itself as a word is not considered an anagram to itself.
     * 
     * @param word The word whose anagrams are being retrieved
     * @param includeProperNouns Indicates whether to include proper nounds in the result
     */
    public getAnagramsForWord(word: string, includeProperNouns: boolean = true) {
        let anagrams = this.getAnagramsArray(word).filter(w => w !== word);
        if (!includeProperNouns) {
            anagrams = anagrams.filter(a => a.charAt(0) === a.toLocaleLowerCase().charAt(0));
        }

        return anagrams;
    }

    /**
     * Returns true if all the words are anagrams of each other, returns false otherwise.
     * @param words Array of words being compared
     */
    public areAnagrams(words: string[]): boolean {
        const anagramHashes: string[] = [];
        words.forEach(w => {
            anagramHashes.push(this.generateAnagramHash(w));
        });

        // Returns true if all elements are the same, returns false otherwise.
        return anagramHashes.every(h => h === anagramHashes[0]);
    }


    /**
     * Returns the anagram group with the most words.
     * In the case of a tie for the longest anagram group, only one of the groups will be returned.
     * 
     * This could be optimized with a better data structure for the problem.
     */
    public mostAnagrams(): string[] {
        let size = 0;
        let largestAnagramsKey = '';

        // Iterate the lookup table and select the anagram group with the most members
        Object.keys(this._anagramLookupTable)
            .filter(key => this._anagramLookupTable.hasOwnProperty(key))
            .forEach(key => {
                if (this._anagramLookupTable[key].length > size) {
                    largestAnagramsKey = key;
                    size = largestAnagramsKey.length;
                }
            })

        return (largestAnagramsKey) ? this._anagramLookupTable[largestAnagramsKey] : [];
    }

    public wordCount(): number {
        return this._sortedWords.length;
    }

    public minWordLength(): number {
        return (this._sortedWords.length > 0) ? this._sortedWords[0].length : 0;
    }

    public maxWordLength(): number {
        return (this._sortedWords.length > 0) ? this._sortedWords[this._sortedWords.length - 1].length : 0;
    }

    public medianWordLength(): number {
        if (!this._sortedWords.length) return 0;

        // Even number, return the average of the middle 2 numbers
        if (this._sortedWords.length % 2 === 0) {
            let num1 = this._sortedWords[Math.floor((this._sortedWords.length - 1) / 2)].length;
            let num2 = this._sortedWords[Math.ceil((this._sortedWords.length - 1) / 2)].length;

            return (num1 + num2) / 2;
        }

        return this._sortedWords[((this._sortedWords.length - 1) / 2)].length;
    }

    public averageWordLength(): number {
        return (this._sortedWords.length > 0) ? this._charcterCount / this._sortedWords.length : 0;
    }

    // TODO
    public getAnagramGroupsGreaterThanSize(size: number) {

    }

    private removeWordFromSortedArray(word: string): void {
        console.log('removeWordFromSortedArray: ', word);
        console.log('sortedArray ', this._sortedWords);
        const wordIndex = this._sortedWords.indexOf(word);
        console.log('wordIndex ', wordIndex);
        if (wordIndex !== -1) {
            this._sortedWords.splice(wordIndex, 1);
            this._charcterCount -= word.length;
        }
    }
}
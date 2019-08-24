export class AnagramManager {

    private _corpus: { [key: string]: string[] } = {};

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
    public addWord(word: string): void {
        const anagrams = this.getAnagramsArray(word);

        // Don't add the word if it already exists in the corpus
        if (!anagrams.includes(word)) {
            anagrams.push(word);
        }
    }

    /**
     * Deletes the word from the corpus
     * 
     * @param word The word to delete from the corpus
     */
    public deleteWord(word: string): void {
        const anagramHash = this.generateAnagramHash(word);
        const anagrams = this.getAnagramsArray(anagramHash);
        this._corpus[anagramHash] = anagrams.filter(w => w !== word);
    }

    /**
     * Deletes the anagrams from the corpus with the specified anagram hash
     * 
     * @param anagramHash The anagram hash key to delete from the corpus
     */
    public deleteAnagrams(anagramHash: string) {
        delete this._corpus[anagramHash];
    }

    /**
     * Delete all words from the corpus
     */
    public deleteAll() {
        this._corpus = {};
    }

    /**
     * Returns the array of words that are anagrams of the input word.
     * The input word itself may appear in the array.
     * 
     * @param word The word whose anagrams are being retrieved
     */
    public getAnagramsArray(word: string): string[] {
        const anagramHash = this.generateAnagramHash(word);
        let anagrams = this._corpus[anagramHash];
        if (!anagrams) {
            this._corpus[anagramHash] = [];
            anagrams = this._corpus[anagramHash];
        }

        return anagrams;
    }


    /**
     * Returns an array of words that are anagrams of the input word.
     * The result will not contain the input word itself as a word is not considered an anagram to itself.
     * 
     * @param word The word whose anagrams are being retrieved
     */
    public getAnagramsForWord(word: string) {
        return this.getAnagramsArray(word).filter(w => w !== word);
    }

    /**
     * Returns true if all the words are anagrams of each other, returns false otherwise.
     * @param words Array of words being compared
     */
    public areAnagrams(words: string[]): boolean {
        const anagramHashes: string[] = [];
        words.forEach(w => {
            anagramHashes.push(this.generateAnagramHash(w));
        })

        // Returns true if all elements are the same, returns false otherwise.
        return anagramHashes.every(h => h === anagramHashes[0]);
    }
}
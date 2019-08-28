
# Anagrams API

Repository: [https://github.com/Tim-Kerr/AnagramAPI](https://github.com/Tim-Kerr/AnagramAPI)

  

## The Tech


*  [NodeJS](https://nodejs.org/en/) (JS runtime)

*  [Express](https://expressjs.com/) (simple web framework for Node)

*  [OvernightJs](https://www.npmjs.com/package/@overnightjs/core) (elegant TypeScript enabled rest endpoint decorators)

## Implementation: Anagram Hash
In order to quickly associate a word with all of its anagrams compute its anagram hash. A word and all of its anagrams will share the same anagram hash. This makes it a great key for the data store! Each value in the key/value store will be an array of the words themselves. This creates an easy data structure with which to associate a word and its anagrams.
`Ex: { 'aedr': ['read', 'dear', 'dare' ] }`

A word's anagram hash is computed by:
1. Calling toLowerCase() on the word string
2. Split the lower-cased word into a char array
3. Sort the char array alphabetically
4. Convert the sorted char array back into a string

The anagram hash is then used in a key/value dictionary to lookup a word's anagrams in O(1) time. Fast! Computing the word's anagram hash is a function of word length since we need to sort the characters of the word. The hash computation runtime would be `O(nlog(n))` where n = word length (assuming JavaScript's `.sort()` function implements some variation of QuickSort).

## Tradeoffs
In order to efficiently calculate word count & min/max/average/median word lengths the anagram key/value dictionary is not the most optimal data structure. The shape of the data doesn't allow for constant time operations to complete the calculations. 

The solution:
* Keep an array of all words in the corpus sorted by word length
* Keep a running total of the total number of characters contained in the corpus (used to calculate average word length). This character total is updated every time a word is added or removed from the corpus.

Pros:
* O(1) Runtime to calculate word count & min/max/average/median word length.

Cons:
* Have to maintain 2 data structures / more memory usage
* Higher runtime O(nlog(n)) when adding and removing words from the corpus because of the need to maintain the sorted order of the array


## API Limitations
* No request validation has been implemented. The API assumes consumers of the api will use the proper data contracts when making requests to the server.
* The API can receive at most 10mb from a single request. A request will be rejected if the payload is larger than 10mb.
* The API will return at most 100 elements in a single response. Any additional possible results will be truncated from the response.

## Interesting Future Features
* Create an endpoint that takes in a word (or multiple words) that returns possible smaller words that can be used out of the characters in the input word(s). 
Examples : 
"Conversation" => "Voices rant on"
"Eleven plus two" => "Twelve plus one"
  

## Installation

* Download the latest version of NodeJS [here](https://nodejs.org/en/download/) (Tested with NodeJS v12.4.0)

* Clone the [repository](https://github.com/Tim-Kerr/AnagramAPI) : `git clone https://github.com/Tim-Kerr/AnagramAPI.git`

## Running the Server
* Included in the project are executables for Linux, MacOS, and Windows. Open the `execuables/` folder and launch the executable for your operating system. (NOTE: Only tested the windows .exe since I don't have a Mac or Linux computer. If for some reason your .exe doesn't work please try running on Windows!)
* If a permissions dialog appears, click "Allow".
* The Anagram API server will open a Node cmd window and start the server on `localhost:3000/`

## Making Requests
* Included in the project is a file called `AnagramAPI.postman_collection.json`. This file contains all of the requests (along with payload examples) for the api. [Postman](https://www.getpostman.com/downloads/) is an HTTP client that allows you to test your API endpoints.
* Import the postman collection by clicking the `Import` button in the top bar of postman and navigating to the postman collection on disk.
* Once the server is running you can make requests and receive responses from the api. (NOTE: The `dictionary.txt` file has been converted to JSON and placed in the `Add Words` request in the postman collection)
* Each request in the collection contains a description of each endpoint

## Running Tests
* Start the server
* In the root directory of the project execute: `npm run test` (must install Ruby)
* This executes the ruby tests located in `tests/anagram_test.rb`
  

## API

**Add Words:**
Takes a JSON array of English-language words and adds them to the corpus (data store). 
* Url: `POST localhost:3000/words.json`
* Payload: `{ "words": ["word1", "word2", "word3", ...] }`
* Returns: `201 Created`

(extra credit)
**Word Info**
Returns a count of words in the corpus and min/max/median/average word length
* Url: `GET localhost:3000/words/info.json`
* Returns: `200`

    {
	    "wordCount": <word_count_value>,
	    "wordLength":{
		    "min": <min_value>,
		    "max": <max_value>,
		    "median": <median_value>,
		    "average": <average_value>
	    }
    }


**Delete Word**
Deletes the word passed in from the URL from the data store
* Url: `DELETE localhost:3000/words/:word.json`
* Returns: `204`

**Delete All Words**
Deletes all words from the store.
* Url: `DELETE localhost:3000/words.json`
* Returns: `204`

(extra credit)
**Delete Word And Anagrams**
Deletes a word and all of its anagrams from the store
* Url: `DELETE localhost:3000/words/anagrams/:word.json`
* Returns: `204`

**Get Anagrams**
Returns a JSON array of English-language words that are anagrams of the word passed in the URL.
Takes an optional query param `limit` that indicates the maximum number of anagrams returned in the response.
0 <= limit <= 100
Takes an optional boolean query param `includeProperNouns` that indicates whether or not to include proper nouns in the result.
If not specified, the API returns proper nouns by default.

If the `limit` query param is not supplied the max number of anagrams returned is 100.
* Url: `GET localhost:3000/:word.json?limit=<limit>?includeProperNouns=true`
* Returns: `200`

    {
	    "anagrams": [...]
    }

(extra credit)
**Most Anagrams**
Returns a JSON array of the top *x* words with the most anagrams
* Url: `GET localhost:3000/most`
* Returns: `200`

    {
	    "words": [...]
    }

(extra credit)
**Are Anagrams**
Returns a boolean indicating if the words passed in the query string params are anagrams of each other.
Words are passed in query string params as a comma delimited list of words
`Ex: /anagrams?words=dear,dare,read`
* Url: `GET localhost:3000/anagrams?words=<word1>,<word2>,...`
* Returns `200`

    {
	    "areAnagrams": <true|false>
    }

(extra credit)
**Get Anagram Groups**
Returns a JSON array of all anagram groups of size >= *x*. Each element in the array is an anagram group.
0 >= size >= 100
Takes a required query string param: `size`
* Url: `GET localhost:3000/anagrams/groups?size=<size>`
* Returns: `200`
 

    {
	    "anagrams": [
		    ["word1", "word2", ...],
		    ["word3", "word4", ...],
		    ...
	    ]
    }

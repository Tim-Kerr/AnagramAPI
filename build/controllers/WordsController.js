"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const AnagramManager_1 = require("../AnagramManager");
let WordsController = class WordsController {
    constructor(_anagramManager) {
        this._anagramManager = _anagramManager;
    }
    addWords(req, res) {
        const words = req.body.words || [];
        this._anagramManager.addWords(words);
        res.status(201).send();
    }
    wordInfo(req, res) {
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
    deleteWord(req, res) {
        const word = req.params.word;
        this._anagramManager.deleteWord(word);
        res.status(204).send();
    }
    deleteAllWords(req, res) {
        this._anagramManager.deleteAll();
        res.status(204).send();
    }
    deleteWordAndAnagrams(req, res) {
        const word = req.params.word;
        this._anagramManager.deleteAnagrams(word);
        res.status(204).send();
    }
};
tslib_1.__decorate([
    core_1.Post('words.json'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], WordsController.prototype, "addWords", null);
tslib_1.__decorate([
    core_1.Get('words/info.json'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], WordsController.prototype, "wordInfo", null);
tslib_1.__decorate([
    core_1.Delete('words/:word.json'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], WordsController.prototype, "deleteWord", null);
tslib_1.__decorate([
    core_1.Delete('words.json'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], WordsController.prototype, "deleteAllWords", null);
tslib_1.__decorate([
    core_1.Delete('words/anagrams/:word.json'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], WordsController.prototype, "deleteWordAndAnagrams", null);
WordsController = tslib_1.__decorate([
    core_1.Controller(''),
    tslib_1.__metadata("design:paramtypes", [AnagramManager_1.AnagramManager])
], WordsController);
exports.WordsController = WordsController;

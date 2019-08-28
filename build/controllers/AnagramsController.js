"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const AnagramManager_1 = require("../AnagramManager");
let AnagramsController = class AnagramsController {
    constructor(_anagramManager) {
        this._anagramManager = _anagramManager;
    }
    anagrams(req, res) {
        const word = req.params.word;
        let limit = Math.min(100, parseInt(req.query.limit) || 100);
        if (limit <= 0)
            limit = 100;
        let includeProperNouns = true;
        if (req.query.includeProperNouns === 'false') {
            includeProperNouns = false;
        }
        let anagrams = this._anagramManager.getAnagramsForWord(word, includeProperNouns);
        res.status(200).json({ anagrams: anagrams.slice(0, limit) });
    }
    mostAnagrams(req, res) {
        res.status(200).json({ words: this._anagramManager.mostAnagrams() });
    }
    areAnagrams(req, res) {
        const words = req.query.words.split(',');
        res.status(200).json({ areAnagrams: this._anagramManager.areAnagrams(words) });
    }
    anagramGroups(req, res) {
        let size = Math.min(100, parseInt(req.query.size));
        if (size > 100)
            size = 100;
        res.status(200).json({ anagrams: this._anagramManager.getAnagramGroupsGreaterThanSize(size).slice(0, 100) });
    }
};
tslib_1.__decorate([
    core_1.Get(':word.json'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AnagramsController.prototype, "anagrams", null);
tslib_1.__decorate([
    core_1.Get('most'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AnagramsController.prototype, "mostAnagrams", null);
tslib_1.__decorate([
    core_1.Get(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AnagramsController.prototype, "areAnagrams", null);
tslib_1.__decorate([
    core_1.Get('groups'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AnagramsController.prototype, "anagramGroups", null);
AnagramsController = tslib_1.__decorate([
    core_1.Controller('anagrams'),
    tslib_1.__metadata("design:paramtypes", [AnagramManager_1.AnagramManager])
], AnagramsController);
exports.AnagramsController = AnagramsController;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@overnightjs/core");
const bodyParser = require("body-parser");
const AnagramsController_1 = require("./controllers/AnagramsController");
const WordsController_1 = require("./controllers/WordsController");
const logger_1 = require("@overnightjs/logger");
const AnagramManager_1 = require("./AnagramManager");
class AnagramAPIServer extends core_1.Server {
    constructor() {
        super(true);
        this.SERVER_STARTED = 'AnagramAPI server started on port: ';
        this.app.use(bodyParser.json({ limit: '10mb' }));
        this.initControllers();
    }
    start(port) {
        this.app.listen(port, () => {
            logger_1.Logger.Imp(this.SERVER_STARTED + port);
        });
    }
    initControllers() {
        const anagramManager = new AnagramManager_1.AnagramManager();
        const controllers = [new AnagramsController_1.AnagramsController(anagramManager), new WordsController_1.WordsController(anagramManager)];
        super.addControllers(controllers);
    }
}
exports.AnagramAPIServer = AnagramAPIServer;

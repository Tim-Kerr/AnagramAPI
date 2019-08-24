import { Server } from '@overnightjs/core';
import * as bodyParser from 'body-parser';
import { AnagramsController } from './controllers/AnagramsController';
import { WordsController } from './controllers/WordsController';
import { Logger } from '@overnightjs/logger';
import { AnagramManager } from './AnagramManager';

export class AnagramAPIServer extends Server {

    private readonly SERVER_STARTED = 'AnagramAPI server started on port: ';

    constructor() {
        super(true);

        this.app.use(bodyParser.json());
        this.initControllers();
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }

    private initControllers() {
        const anagramManager = new AnagramManager();
        const controllers = [new AnagramsController(anagramManager), new WordsController(anagramManager)];
        super.addControllers(controllers);
    }
}
import { Server } from '@overnightjs/core';
import * as bodyParser from 'body-parser';
import { AnagramsController } from './controllers/AnagramController';
import { WordsController } from './controllers/WordController';
import { Logger } from '@overnightjs/logger';

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
        const controllers = [new AnagramsController(), new WordsController()];
        super.addControllers(controllers);
    }
}
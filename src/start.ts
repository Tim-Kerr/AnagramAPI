import { AnagramAPIServer } from './AnagramServer';

const anagramServer = new AnagramAPIServer();
anagramServer.start(3000);
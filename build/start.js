"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnagramServer_1 = require("./AnagramServer");
const anagramServer = new AnagramServer_1.AnagramAPIServer();
anagramServer.start(3000);

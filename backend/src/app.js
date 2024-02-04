import express from 'express'
import cors from 'cors'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'
import { socketIO } from './utils/socket.js'
import { connectDB } from './utils/connectDB.js'
import router from './router/index.js'

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "*",
        method: ["*"],
    },
});

app.use(express.static(path.join(process.cwd(), 'uploads')));
app.use(cors());
app.use(express.json());
app.use(router);

socketIO(io);

connectDB(server).then(() => { });

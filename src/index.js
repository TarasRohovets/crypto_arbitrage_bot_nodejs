import ArbitrageBot from "./worker/arbitrage-bot";
import express from "express";

// Create Express server
const app = express();

// Start the Express Server
app.listen("8080", () => {
    // tslint:disable-next-line:no-console
    console.log("server started");
    
    const instance = new ArbitrageBot();
    // const bot = new ArbitrageBot();
    const POLLING_INTERVAL = 1000;
    instance.priceMonitor = setInterval(async () => {
        await instance.monitorPrice();
    }, POLLING_INTERVAL);
});
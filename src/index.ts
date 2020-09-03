import app from "./app";



// Start the Express Server
const server = app.listen(app.get("port"), () => {
    // tslint:disable-next-line:no-console
    console.log("server started");
});

export default server;
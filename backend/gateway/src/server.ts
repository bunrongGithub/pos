import app from "./app";
import config from "./configs"

const runServer = async () => {
    try {
        app.listen(config.port, function () {
            console.info(`Gateway running on port ${config.port}`);
        })
    } catch (error) {
        throw error
    }

}

runServer();
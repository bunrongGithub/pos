import app from "./app";


const runServer = async () => {
    try {
        app.listen(4000, function () {
            console.info(`User Service running on port 4000`)
        })
    } catch (error) {
        throw error
    }

}




runServer();
import express from "express"
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import {config} from "./common/config/index.js"
import {errorHandler} from "./middleware/error.js";
import module from "./modules/app.module.js"


const app = express()

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/v1/", module.router);

if(config.NODE_ENV === "development") {
	app.use(morgan('dev'))
}


app.use(errorHandler)

const port = config.port || 3000
app.listen(port, () => {
	console.log(`Server is running in ${config.NODE_ENV} on: https://localhost:${port}`.bold)
})
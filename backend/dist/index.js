"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./src/db");
const express = require("express");
const app = express();
const port = 4000;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    (0, db_1.connectDB)();
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
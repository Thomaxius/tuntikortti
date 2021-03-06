import express from "express";

import serverRenderer from '../middleware/renderer';
import configureStore from '../../src/store/configureStore';
const app = express();
const path = require("path");


const actionIndex = (req, res, next) => {
    const store = configureStore();
    serverRenderer(store)(req, res, next)
};

// root (/) should always serve our server rendered page
app.use('^/$', actionIndex);

// other static resources should just be served as they are
app.use(express.static(
    path.resolve(__dirname, '..', '..', 'build'),
    { maxAge: '30d' },
));

// any other route should be handled by react-router, so serve the index page
app.use('*', actionIndex);


export default app;

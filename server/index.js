const express = require('express');
const graphQL = require('express-graphql');
const mongoose = require('mongoose');
const logger = require('morgan');

const schema = require('./schema')
if (process.env.NODE_ENV !== 'production') {
    const dotEnv = require('dotenv');
    dotEnv.config();
}


const PORT = process.env.PORT || 3000
const app = express();
app.use(logger('dev'))

const mongoURL = () => {
    if (process.env.NODE_ENV === "development") {
        return mongoose.connect(process.env.DEV_MONGO_URL, { useNewUrlParser: true })
    }
    if (process.env.NODE_ENV === "testing") {
        return mongoose.connect(process.env.TESTING_MONGO_URL, { useNewUrlParser: true })
    }
    if (process.env.NODE_ENV === "production") {
        return mongoose.connect(process.env.PROD_MONGO_URL, { useNewUrlParser: true })
    }
}

mongoURL()
.then(() => console.log('connected to database'))
.catch(() => console.log('failed to connect to the database'));


app.use('/grahpql', graphQL({
    schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`Server runnning on port ${PORT}`)
})
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import { mongo } from "./connection.js"
import { dashboardRouter } from "./routers/dashboard.js"
import { printDetailsRouter } from "./routers/printDetails.js"
import { addExpensesRouter } from "./routers/addExpenses.js";
import { expensesListRouter } from './routers/expensesList.js';
import { transferredAmountRouter } from "./routers/transferredAmount.js";
import { signupRouter } from './routers/signup.js';
import { loginRouter } from './routers/login.js';
import { forgotPasswordRouter } from './routers/forgotPassword.js';
import { resetPasswordRouter } from './routers/resetPassword.js';
import { auth } from "./middleware/auth.js";

//env file
dotenv.config();
const app = express();

//middleware
app.use(express.json())
app.use(cors());

//Mongo db connection
mongo();

let PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send("Hello World!!!")
})

//Before
app.use("/signup", signupRouter)
app.use("/login", loginRouter)
app.use("/forgot-password", forgotPasswordRouter)
app.use("/reset-password", resetPasswordRouter)

//After
app.use("/dashboard", auth, dashboardRouter)
app.use("/dashboard/print-details", printDetailsRouter)
app.use("/add-expenses", auth, addExpensesRouter)
app.use("/expenses-list", auth, expensesListRouter)
app.use("/expenses-list/:id", auth, expensesListRouter)
app.use("/transferred-amount", auth, transferredAmountRouter)


app.listen(PORT, () => { console.log("App is running on: " + PORT) });
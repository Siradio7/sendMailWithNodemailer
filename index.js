import nodemailer from "nodemailer"
import { google } from "googleapis"
import dotenv from "dotenv"

dotenv.config({path: "./vars/.env"})

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const MY_EMAIL = process.env.MY_EMAIL

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
})

const sendMailTest = async (to) => {
    const ACCESS_TOKEN = await oauth2Client.getAccessToken()
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: MY_EMAIL,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: ACCESS_TOKEN
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const from = MY_EMAIL
    const subject = "Nodemailer - Test"
    const html = `
        <h1>Nodemailer - Test</h1>
        <p>Test 3</p>
        <p>It's work</p>
    `

    return new Promise((resolve, reject) => {
        transporter.sendMail({ from, to: to, subject, html }, (error, info) => {
            if (error) reject(error)
            
            resolve(info)
        })
    })
}

const info = sendMailTest("mamadousiradioudiallo14@gmail.com")

console.log(info)
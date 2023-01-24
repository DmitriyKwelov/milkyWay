const nodemailer = require('nodemailer')

class MailService{

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.rambler.ru",
            port: "465",
            secure: true,
            auth: {
                user: "testmilkyway@rambler.ru",
                pass: "ZDh-scL-6g6-gmz"
            }
        })
    }

    async sendActivationMail(to, link) {
        try {
            console.log('2222')
            await this.transporter.sendMail({
                from: "testmilkyway@rambler.ru",
                to,
                subject: 'Активация аккаунта на ' + 'MilkyWay',
                text: '',
                html:
                    `
                <div>
                    <h1>Для активации пройдите по ссылке</h1>    
                    <a href="${link}">${link}</a>            
                </div>
            `
            })
            console.log('4444')
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new MailService();
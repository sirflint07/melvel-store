const { MailtrapClient } = require("mailtrap");
const dotenv = require('dotenv');

dotenv.config();

const client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Golden Designs",
};

module.exports = {
    client, sender
}
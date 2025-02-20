const { client, sender } = require("./config");
const { VERIFICATION_EMAIL_TEMPLATE, WELCOME_ONBOARDING, PASSWORD_RESET_EMAIL_TEMPLATE } = require("./emailTemplate");

module.exports = {
    sendVerificationEmail: async (email, verificationToken) => {
        const recipients = [
            {
              email,
            }
          ];
       
          try {
            const response = client.send({
                from: sender,
                to: recipients,
                subject: "Verify your email address",
                html: VERIFICATION_EMAIL_TEMPLATE.replace(`{verificationCode}`, verificationToken),
                category: "Email Verification",
              })

            console.log(response)
          } catch (error) {
            console.log('Error Sending Verification Mail, ', error)
            throw new Error(`Could not send email, ${error}`)
          }
    },

    sendWelcomeEmail: async (username, email) => {
      const recipient = [{
        email
      }]

      try {
        const response = await client.send({
          from: sender,
          to: recipient,
          subject: 'Registration Successful! Welcome on board',
          html: WELCOME_ONBOARDING.replace(`{username}`, username),
          category: 'Welcome Email'
        })

        console.log(`Welcome email sent successfully`, response)
      } catch (error) {
        console.log(error.message)
      }
    },

    sendResetEmail: async (email, resetLink) => {
      const recipient = [{email}]
      try {
        const response = await client.send({
          from: sender,
          to: recipient,
          subject: 'Password Reset',
          html: PASSWORD_RESET_EMAIL_TEMPLATE.replace(`{resetURL}`, resetLink).replace(),
          category: 'Password Reset'
        })
      } catch (error) {
        console.log(error.message)
      }
    }
}
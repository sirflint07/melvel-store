module.exports = {
    VERIFICATION_EMAIL_TEMPLATE: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p className='text-red'>Hello, {username}</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in one (1) hour for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`,
WELCOME_ONBOARDING: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Melvel Store</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <!-- Header Section -->
  <div style="background: linear-gradient(to right, #1d4ed8, #333333); padding: 30px; text-align: center; border-radius: 5px 5px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Sneaker World!</h1>
  </div>

  <!-- Content Section -->
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p style="font-size: 16px; margin: 0 0 20px;">Hello {username},</p>
    <p style="font-size: 16px; margin: 0 0 20px;">Welcome to <strong>Sneaker World</strong>! We're excited to have you join our community of sneaker enthusiasts. Get ready to explore the latest drops, exclusive releases, and timeless classics.</p>
    
    <!-- Call-to-Action Button -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="{shopLink}" style="background-color: #1d4ed8; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">
        Start Shopping Now
      </a>
    </div>

    <p style="font-size: 16px; margin: 0 0 20px;">Here’s what you can do next:</p>
    <ul style="font-size: 16px; margin: 0 0 20px; padding-left: 20px;">
      <li>Browse our <a href="{newArrivalsLink}" style="color: #000000; text-decoration: none;">new arrivals</a> for the freshest kicks.</li>
      <li>Check out our <a href="{exclusiveDropsLink}" style="color: #000000; text-decoration: none;">exclusive drops</a> before they sell out.</li>
      <li>Save your favorite sneakers to your wishlist for easy access.</li>
    </ul>

    <p style="font-size: 16px; margin: 0 0 20px;">As a special welcome gift, use the code <strong>WELCOME10</strong> at checkout to get 10% off your first order!</p>

    <p style="font-size: 16px; margin: 0 0 20px;">If you have any questions or need assistance, feel free to reply to this email or visit our <a href="{supportLink}" style="color: #000000; text-decoration: none;">support page</a>.</p>

    <p style="font-size: 16px; margin: 0;">Step into style,<br><strong>The Sneaker World Team</strong></p>
  </div>

  <!-- Footer Section -->
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
    <p>If you no longer wish to receive emails from us, you can <a href="{unsubscribeLink}" style="color: #000000; text-decoration: none;">unsubscribe</a>.</p>
  </div>
</body>
</html>`,
PASSWORD_RESET_SUCCESS_TEMPLATE: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello, {email}</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>`,

PASSWORD_RESET_EMAIL_TEMPLATE: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>`
}
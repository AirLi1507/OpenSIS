import transporter from "../config/email"
import logger from "../config/logger"

const sendResetLink = async (email: string, token: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"OpenSIS Team" <${process.env.GOOGLE_EMAIL}>`,
      to: email,
      subject: "Password reset link for OpenSIS account",
      text: "You may now reset your account password with the following link. If you didn't perform any related operations, please don't leak this link to anybody.",
      html: `<a href="https://${process.env.APP_URL}/auth/reset-password?token=${token}">Reset link</a>`
    })
    logger.info(`Password reset link sent to ${email} with the email id: ${info.messageId}`)
    return
  } catch (err) {
    logger.error(`An error occurred when sending password reset link to certain email: ${err}`)
    return
  }
}

export {
  sendResetLink
}

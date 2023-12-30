const { createTransporter } = require("./config");
require("dotenv").config();

const sendMail = async (email, options = {}) => {
  try {
    const transporter = await createTransporter();

    if (!transporter) return { success: false };

    await transporter.sendMail({
      from: `E-maquis service <${process.env.GMAIL_USER}>`,
      to: email,
      subject: options.subject,
      text: options.text || options.message,
      html: options.html,
    });

    return { success: true };
  } catch (err) {
    return { success: false };
  }
};

module.exports = {
  sendMail,
};

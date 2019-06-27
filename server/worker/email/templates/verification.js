import mailGenerator from "../template";

const emailTemplate = url => {
  const emailBody = {
    body: {
      name: "Dear user",
      intro:
        "Welcome to Todo Application! We are excited that you want to use our application.",
      action: {
        instructions:
          "To get started with Todo Application, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: url
        }
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help."
    }
  };

  return mailGenerator.generate(emailBody);
};

export default emailTemplate;

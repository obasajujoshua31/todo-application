import Mailgen from "mailgen";

// Configure mailgen by setting a theme and your product info
const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    // Appears in header & footer of e-mails
    name: "Todo Application",
    link: "https://github.com/obasajujoshua31/todo-application"
    // Optional product logo
    // logo: 'https://mailgen.js/img/logo.png'
  }
});

export default mailGenerator;

const { Command } = require("commander");
const chalk = require("chalk");
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
} = require("./contacts.js");

const program = new Command();

program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if (getContactById) {
        console.log(chalk.green("Contact found"));
        console.table(contact);
        return contact;
      } else {
        console.log(chalk.blue("Contact not found"));
      }
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(chalk.green("Add new contact"));
      console.log(newContact);
      // return newContact;
      break;

    case "remove":
      const deleteContact = await removeContact(id);
      console.log(deleteContact);
      // return deleteContact;
      break;
    default:
      console.warn(chalk.red("Unknown action type!"));
  }
};

invokeAction(argv);

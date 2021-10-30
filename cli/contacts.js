const fs = require("fs/promises");

const path = require("path");
const crypto = require("crypto");

const FILE = "contacts.json";
const contactPath = path.join(__dirname, FILE);

const readData = async () => {
  const result = await fs.readFile(contactPath, "utf8");
  return JSON.parse(result);
};

const listContacts = readData;

const getContactById = async (contactId) => {
  const contacts = await readData();
  const [result] = contacts.filter(
    (contact) => contact.id === Number(contactId)
  );
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (id) => {
  const contacts = await readData();
  const idx = contacts.findIndex((item) => item.id === Number(id));
  if (idx === -1) {
    return null;
  }
  const removeItem = contacts.splice(idx, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return removeItem;
};

const addContact = async (name, email, phone) => {
  const contacts = await readData();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };

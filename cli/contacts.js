const fs = require("fs/promises");

const path = require("path");
const crypto = require("crypto");

const FILE = "contacts.json";

const readData = async () => {
  const result = await fs.readFile(path.join(__dirname, FILE), "utf8");
  return JSON.parse(result);
};

const listContacts = async () => {
  return await readData();
};

const getContactById = async (contactId) => {
  const contacts = await readData();
  const [result] = contacts.filter((contact) => contact.id === contactId);
  if (!result) {
    return null;
  }
  // console.table(result);
  return result;
};

const removeContact = async (id) => {
  const contacts = await readData();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const removeItem = contacts.splice(idx, 1);
  await fs.writeFile(
    path.join(__dirname, FILE),
    JSON.stringify(contacts, null, 2)
  );
  return removeItem;
};

const addContact = async (name, email, phone) => {
  const contacts = await readData();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, FILE),
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };

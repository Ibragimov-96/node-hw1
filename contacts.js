
const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("db", "contacts.json");
console.log(contactsPath);

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.log(data.toString()))
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8")
    .then((data) => {
      
      const contact = JSON.parse(data.toString()).find(
        contacts => +contacts.id === contactId
      );
      console.log(contact)
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
    fs.readFile(contactsPath, "utf8")
    .then((data) => {
      
      const contact = JSON.parse(data)
     
      const result = contact.findIndex(cont => 
        +cont.id === contactId
       
      )
      contact.splice(result,1)
      const obj = JSON.stringify(contact)
      fs.writeFile(contactsPath, obj, "utf8")
      console.log(obj)
      if(result === -1){
        return null;
      }
    
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  // ...твой код
  
    fs.readFile(contactsPath, "utf8")
    .then((data) => {
        const contact = JSON.parse(data)
        
        const newContact ={
            name,
            email,
            phone,
            id: (contact.length + 1).toString(),
        }
        contact.push(newContact)
        const obj = JSON.stringify(contact)
       console.log(obj)
        fs.writeFile(contactsPath, obj, "utf8")
    }).catch((err) => console.log(err.message));
}

module.exports = { listContacts, getContactById, removeContact, addContact };

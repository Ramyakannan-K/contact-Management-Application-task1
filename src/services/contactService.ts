
import { Contact, ContactFormData } from '../types/contact';

const STORAGE_KEY = 'contacts';

export class ContactService {
  static getAllContacts(): Contact[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const contacts = JSON.parse(data);
      return contacts.map((contact: any) => ({
        ...contact,
        createdAt: new Date(contact.createdAt),
        updatedAt: new Date(contact.updatedAt),
      }));
    } catch (error) {
      console.error('Error loading contacts:', error);
      return [];
    }
  }

  static saveContacts(contacts: Contact[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    } catch (error) {
      console.error('Error saving contacts:', error);
    }
  }

  static createContact(formData: ContactFormData): Contact {
    const contacts = this.getAllContacts();
    
    // Check for duplicate email
    const existingContact = contacts.find(
      contact => contact.email.toLowerCase() === formData.email.toLowerCase()
    );
    
    if (existingContact) {
      throw new Error('A contact with this email already exists');
    }

    const newContact: Contact = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    contacts.push(newContact);
    this.saveContacts(contacts);
    return newContact;
  }

  static updateContact(id: string, formData: ContactFormData): Contact {
    const contacts = this.getAllContacts();
    const contactIndex = contacts.findIndex(contact => contact.id === id);
    
    if (contactIndex === -1) {
      throw new Error('Contact not found');
    }

    // Check for duplicate email (excluding current contact)
    const existingContact = contacts.find(
      contact => contact.email.toLowerCase() === formData.email.toLowerCase() && contact.id !== id
    );
    
    if (existingContact) {
      throw new Error('A contact with this email already exists');
    }

    const updatedContact: Contact = {
      ...contacts[contactIndex],
      ...formData,
      updatedAt: new Date(),
    };

    contacts[contactIndex] = updatedContact;
    this.saveContacts(contacts);
    return updatedContact;
  }

  static deleteContact(id: string): void {
    const contacts = this.getAllContacts();
    const filteredContacts = contacts.filter(contact => contact.id !== id);
    this.saveContacts(filteredContacts);
  }

  static getContactById(id: string): Contact | null {
    const contacts = this.getAllContacts();
    return contacts.find(contact => contact.id === id) || null;
  }
}

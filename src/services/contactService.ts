
import { Contact, ContactFormData } from '../types/contact';

const API_BASE_URL = 'http://localhost:5000/api';

export class ContactService {
  static async getAllContacts(): Promise<Contact[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`);
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const contacts = await response.json();
      return contacts.map((contact: any) => ({
        ...contact,
        createdAt: new Date(contact.createdAt),
        updatedAt: new Date(contact.updatedAt),
      }));
    } catch (error) {
      console.error('Error loading contacts:', error);
      throw new Error('Failed to load contacts');
    }
  }

  static async createContact(formData: ContactFormData): Promise<Contact> {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create contact');
      }

      const contact = await response.json();
      return {
        ...contact,
        createdAt: new Date(contact.createdAt),
        updatedAt: new Date(contact.updatedAt),
      };
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }

  static async updateContact(id: string, formData: ContactFormData): Promise<Contact> {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update contact');
      }

      const contact = await response.json();
      return {
        ...contact,
        createdAt: new Date(contact.createdAt),
        updatedAt: new Date(contact.updatedAt),
      };
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  }

  static async deleteContact(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }

  static async getContactById(id: string): Promise<Contact | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts/${id}`);
      
      if (response.status === 404) {
        return null;
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch contact');
      }

      const contact = await response.json();
      return {
        ...contact,
        createdAt: new Date(contact.createdAt),
        updatedAt: new Date(contact.updatedAt),
      };
    } catch (error) {
      console.error('Error loading contact:', error);
      return null;
    }
  }
}


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import { Contact } from '../types/contact';
import { ContactService } from '../services/contactService';
import { UserPlus, ArrowLeft, BookOpen } from 'lucide-react';

type ViewMode = 'list' | 'form';

const Index = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    const loadedContacts = ContactService.getAllContacts();
    setContacts(loadedContacts);
  };

  const handleAddNew = () => {
    setEditingContact(null);
    setViewMode('form');
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setViewMode('form');
  };

  const handleFormSave = () => {
    loadContacts();
    setViewMode('list');
    setEditingContact(null);
  };

  const handleFormCancel = () => {
    setViewMode('list');
    setEditingContact(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Contact Manager
                </h1>
                <p className="text-gray-600">Organize and manage your contacts efficiently</p>
              </div>
            </div>

            {viewMode === 'list' ? (
              <Button
                onClick={handleAddNew}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                size="lg"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Add New Contact
              </Button>
            ) : (
              <Button
                onClick={handleFormCancel}
                variant="outline"
                size="lg"
                className="hover:bg-gray-50 transition-all duration-200"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Contacts
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {viewMode === 'list' ? (
          <ContactList
            contacts={contacts}
            onEdit={handleEdit}
            onContactsChange={loadContacts}
          />
        ) : (
          <ContactForm
            contact={editingContact}
            onSave={handleFormSave}
            onCancel={handleFormCancel}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>Contact Management Application - Built with React, TypeScript & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;


export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
}

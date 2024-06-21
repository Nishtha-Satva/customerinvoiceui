export type LineItem = {
    id: string;
    description: string;
    quantity: number;
    price: number;
    subtotal: number;
  };
  
  export type Invoice = {
    id: string;
    customer: string;
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    status: string;
    lineItems: LineItem[];
    total: number;
  };
  
  export type Customer = {
    id: string;
    name: string;
    email: string;
    mobile: string
  };
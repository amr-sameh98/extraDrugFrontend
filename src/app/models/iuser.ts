export interface Iuser {
  fullName: string;
  email: string;
  username: string;
  phoneNo: string[];
  address: {
    city: string;
    postalCode: string;
    street: string
  };
  password: string;
}

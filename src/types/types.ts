export type Hospital = {
  id: string;
  name: string;
  address: string | "";
  district: string;
  phone: string;
  [key: string]: string | "";
};

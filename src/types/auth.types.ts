export type USERSIGNUPTODBTYPE = {
  email: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
};
export type ADMINSIGNUPTODBTYPE = {
  hashedPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  businessName: string;
  category: string;
  bankName: string;
  accountNumber: number;
  accountName: string;
};

export type RETURNTYPE_USERSIGNUPTODBTYPE = Promise<{
  userIdToString: string;
}>;
export type RETURNTYPE_ADMINSIGNUPTODBTYPE = Promise<{
  adminIdToString: string;
}>;

import Admin from "../models/Admin";
import Person from "../models/User";
import {
  ADMINSIGNUPTODBTYPE,
  RETURNTYPE_ADMINSIGNUPTODBTYPE,
  RETURNTYPE_USERSIGNUPTODBTYPE,
  USERSIGNUPTODBTYPE,
} from "../types/auth.types.js";

export const USERSIGNUPTODB = async ({
  email,
  hashedPassword,
  firstName,
  lastName,
}: USERSIGNUPTODBTYPE): Promise<RETURNTYPE_USERSIGNUPTODBTYPE> => {
  const saveToDatabase = await new Person({
    email: email.toLowerCase(),
    password: hashedPassword,
    firstName,
    lastName,
  });

  const user = await saveToDatabase.save();
  const userIdToString = await user._id.toString();
  return { userIdToString };
};
export const ADMINSIGNUPTODB = async ({
  hashedPassword,
  email,
  firstName,
  lastName,
  phoneNumber,
  businessName,
  category,
  bankName,
  accountNumber,
  accountName,
}: ADMINSIGNUPTODBTYPE): Promise<RETURNTYPE_ADMINSIGNUPTODBTYPE> => {
  const saveToDatabase = await new Admin({
    email: email.toLowerCase(),
    password: hashedPassword,
    firstName,
    lastName,
    phoneNumber,
    businessName,
    category: category.toLowerCase(),
    bankName,
    accountNumber,
    accountName,
  });

  const admin = await saveToDatabase.save();
  const adminIdToString = await admin._id.toString();
  return { adminIdToString };
};

export const checkUserExists = async (email: string) => {
  const checkIfUserExist = await Person.findOne({ email: email.toLowerCase() });
  return checkIfUserExist;
};
export const checkAdminExists = async (email: string) => {
  const checkIfAdminExist = await Admin.findOne({ email: email.toLowerCase() });
  return checkIfAdminExist;
};

export const get_user_details = async (userId: string) => {
  const user = await Person.findById(userId).select("-password");
  return user;
};
export const get_admin_details = async (userId: string) => {
  const user = await Admin.findById(userId).select("-password");
  return user;
};

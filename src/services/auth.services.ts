import Person from "../models/User";
import {
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

export const checkUserExists = async (email: string) => {
  const checkIfUserExist = await Person.findOne({ email: email.toLowerCase() });
  return checkIfUserExist;
};


export const get_user_details = async (userId: string) => {
  const user = await Person.findById(userId).select("-password");
  return user;
}
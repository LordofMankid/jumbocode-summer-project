// /lib/api/users.ts
import connectToDatabase from '@/lib/mongoose';
import User, { IUser } from '@/lib/models/User';

export interface UserProps {
  name: string;
  email: string;
  // Add other fields as needed
}

export const getAllUsers = async (): Promise<UserProps[]> => {
  await connectToDatabase();
  const users: IUser[] = await User.find({});
  return users.map((user) => ({
    name: user.name,
    email: user.email
    // Include other fields as necessary
  }));
};

export const getUserById = async (id: string): Promise<UserProps | null> => {
  await connectToDatabase();
  const user: IUser | null = await User.findById(id);
  if (user) {
    return {
      name: user.name,
      email: user.email
      // Include other fields as necessary
    };
  } else {
    return null;
  }
};

export const addUser = async (user: UserProps): Promise<UserProps> => {
  await connectToDatabase();
  const newUser = new User(user);
  await newUser.save();
  return {
    name: newUser.name,
    email: newUser.email
    // Include other fields as necessary
  };
};

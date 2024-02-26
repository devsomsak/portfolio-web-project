"use server";

import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL as string;
interface UserDoc extends Document {
  clerkId: string;
  email: string;
  username: string;
  photo: string;
  firstName?: string;
  lastName?: string;
  planId: number;
  creditBalance: number;
}
// mongoose.connect(MONGODB_URL)
//   .then(async () => {
//     console.log('Connected to MongoDB');

    // Create && Test mockup data
    // const mockUserData: Partial<UserDoc> = {
    //   clerkId: 'user_2cqQqIrw1udfdSrgqZLFPIBQ2SB',
    //   email: 'devrleang@gmail.com',
    //   username: 'devrleang',
    //   photo: 'example_photo.jpg',
    //   firstName: 'leang',
    //   lastName: 'Dev',
    //   planId: 2,
    //   creditBalance: 8888888888,
    // };

  //   try {
  //     // Insert mockup data into the User collection
  //     const newUser = await User.create(mockUserData);
  //     console.log('Mockup user data inserted:', newUser);
  //   } catch (error) {
  //     console.error('Error creating mockup user data:', error);
  //   }
  // })
  // .catch(error => {
  //   console.error('MongoDB connection error:', error);
  // });

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();
    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("CreateUser error: ",error)
    handleError(error);
  }
}


export async function getUserById(userId: string) {
  try {
    console.log('ConsoleLOG User ID:', userId);
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Read User error: ", error);
    // Handle the error directly here
    // For example, you can log the error and return a specific error message
    return { error: "An error occurred while reading user data" };
  }
}

// READ
// export async function getUserById(userId: string) {
//   try {
//     await connectToDatabase();

//     const user = await User.findOne({ clerkId: userId });

//     if (!user) throw new Error("User not found");

//     return JSON.parse(JSON.stringify(user));
//   } catch (error) {
//     console.error("Read User error: ",error)
//     handleError(error);
//   }
// }

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error("Update User error: ",error)
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    console.error("Delete User error: ",error)
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee }},
      { new: true }
    )

    if(!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    handleError(error);
  }
}
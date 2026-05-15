import {  } from "express";
import { Request, Response } from "express";
import connectDB from "../typeorm";
import { User } from "../entities/User";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepository = connectDB.getRepository(User);
    const users = await userRepository.find();
    res.status(200).json(users);
      } catch (error) {
    res.status(500).send('Error fetching users');
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userRepository = connectDB.getRepository(User);
    const newUser = userRepository.create(req.body);
    await userRepository.save(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send('Error creating user');
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userRepository = connectDB.getRepository(User);
    console.log("Updating user with ID:", id);
    console.log("userRepository:", userRepository);
    // const user = await userRepository.findOne({
    // where: {id: parseInt(id)}
    // });

    // if (!user) {
    //   res.status(404).send('User not found');
    //   return;
    // }
    // userRepository.merge(user, req.body);
    // const updatedUser = await userRepository.save(user);
    // res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send('Error updating user');
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userRepository = connectDB.getRepository(User);
    // const user = await userRepository.findOne(id);
    // if (!user) {
    //   res.status(404).send('User not found');
    //   return;
    // }
    // await userRepository.remove(user);
    res.status(200).send('User deleted');
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
};

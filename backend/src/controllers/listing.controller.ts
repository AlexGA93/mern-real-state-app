import { Request, Response, NextFunction } from 'express';
import { Listing } from '../database/models/Listing.model';

export const createListing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // create a listing by the mongoose model
    const listing = await Listing.create(req.body);

    res.status(201).json(listing);

  } catch (error) {
    next(error);
  }
};
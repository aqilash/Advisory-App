import prisma from "../utils/prisma.js";
import calculateCrow from "../utils/crowFlies.js";

export const getAllListing = async (req, res, next) => {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: { id: "asc" },
    });
    const role = req.user.role_type;
    res.render("listing/index", { listings, role });
  } catch (e) {
    next(e);
  }
};

export const getListingByID = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) * 1 || 1;
    const limit = parseInt(req.query.limit) * 1 || 100;
    const skip = (page - 1) * limit;
    const userID = req.user.user_id;

    const listings = await prisma.listing.findMany({
      skip: skip,
      take: limit,
      where: {
        user_id: userID,
      },
    });

    const finalListings = [];
    for (let listing of listings) {
      const lat = listing.latitude;
      const long = listing.longitude;
      const distance = calculateCrow(lat, long); // Default starting point set to MBMR Tower

      finalListings.push({
        id: listing.id,
        name: listing.name,
        distance,
        created_at: listing.created_at,
        updated_at: listing.updated_at,
      });
    }

    res.status(200).json({
      status: res.statusCode || 200,
      message: res.statusMessage || "Success",
      result: {
        current_page: page,
        data: finalListings,
      },
    });
  } catch (e) {
    next(e);
  }
};

export const renderCreateForm = (req, res) => {
  res.render("listing/add");
};

export const createListing = async (req, res, next) => {
  try {
    const { name, latitude, longitude } = req.body.listing;
    const userID = req.user.user_id;

    const newListing = await prisma.listing.create({
      data: {
        name,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        user: {
          connect: { id: userID },
        },
      },
    });
    res.redirect(`/listing/${newListing.id}`);
  } catch (e) {
    next(e);
  }
};

export const renderDetails = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const listing = await prisma.listing.findUnique({
      where: {
        id,
      },
    });
    listing.role = req.user.role_type;
    res.render("listing/details", { listing });
  } catch (e) {
    next(e);
  }
};

export const renderEditForm = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const listing = await prisma.listing.findUnique({
      where: {
        id,
      },
    });
    res.render("listing/edit", { listing });
  } catch (e) {
    next(e);
  }
};

export const editListing = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name, latitude, longitude } = req.body.listing;

    const updatedListing = await prisma.listing.update({
      where: {
        id,
      },
      data: {
        name,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });
    res.redirect(`/listing/${updatedListing.id}`);
  } catch (e) {
    next(e);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const deletedListing = await prisma.listing.delete({
      where: {
        id,
      },
    });
    res.redirect("/listing");
  } catch (e) {
    next(e);
  }
};

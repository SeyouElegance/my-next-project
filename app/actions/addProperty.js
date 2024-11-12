"use server";

import { getSessionUser } from "@/utils/getSessionUser";
import connectToDB from "@/config/database";
import Property from "@/models/Property";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

async function addProperty(formData) {
  //connect to db
  await connectToDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id) {
    throw new Error("User not authenticated");
  }

  const {
    user: { id: userId },
  } = sessionUser;
  // Access all values from amenities and images
  const amenities = Array.from(formData.getAll("amenities"));
  const images = Array.from(formData.getAll("images")).filter(
    (image) => image.name !== ""
  );

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zip: formData.get("location.zip"),
      country: formData.get("location.country"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities,
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const imagesUrls = [];

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert to base64
    const imageBase64 = imageData.toString("base64");

    //Make a post request to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/jpg;base64,${imageBase64}`,
      {
        folder: "propertypule",
      }
    );

    imagesUrls.push(result.secure_url);
  }

  propertyData.images = imagesUrls;

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath("/", "layout");

  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;

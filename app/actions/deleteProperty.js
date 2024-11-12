"use server";

import Property from "@/models/Property";
import { revalidatePath } from "next/cache";
import cloudinary from "@/config/cloudinary";
import { getSessionUser } from "@/utils/getSessionUser";

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();
  console.log("sessionUser", sessionUser);
  const {
    user: { id },
  } = sessionUser;
  if (!id || !sessionUser.user.id) {
    throw new Error("User not authenticated");
  }

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property not found");
  }

  // Verify ownership
  if (property.owner.toString() !== id) {
    throw new Error("Unauthorized");
  }

  // extract public id from image url
  const publicIds = property.images.map((imageUrl) => {
    const urlParts = imageUrl.split("/");
    return urlParts.at(-1).split(".")[0];
  });

  // delete images from cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("propertypule/" + publicId);
    }
  }

  revalidatePath("/", "layout");

  await property.deleteOne();
}

export default deleteProperty;

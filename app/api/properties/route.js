import connectToDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties
export const GET = async () => {
  try {
    await connectToDB();
    const properties = await Property.find({}).lean();
    console.log("properties", properties);
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred", { status: 500 });
  }
};

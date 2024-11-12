import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export async function getSessionUser() {
  const session = await getServerSession(authOptions);

  console.log("session", session);
  if (!session || !session.user) {
    return null;
  }

  return {
    user: session.user,
    id: session.user.id,
  };
}

import { getUserAuth } from "./auth/utils";

export default async function validateSession() {
    const { session } = await getUserAuth();
    if (!session) throw new Error("Unauthorized");
}

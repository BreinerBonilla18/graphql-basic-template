/* ---------------- typeDefs ----------------- */
import { typeDefs as Users } from "./typeDefs/users.js";
/* ---------------- resolvers ---------------- */
import { resolvers as UserQueries } from "./resolvers/queries.js";
import { resolvers as UserMutations } from "./resolvers/mutations.js";

export const typeDefs = [Users];
export const resolvers = [UserQueries, UserMutations];

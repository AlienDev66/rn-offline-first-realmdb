import Realm from "realm";
import { OrderSchema } from "./Schemas/OrderSchema";

export const getRealm = async () =>
  await Realm.open({
    // open a connection realm
    path: "decode-app", // name of database connection
    schema: [OrderSchema], // all schemas
    schemaVersion: 3, // version of schema
  });

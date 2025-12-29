import clientPromise from "@/lib/mongodb";

export async function getCollection(collectionName:string) {
  const client = await clientPromise;
  const db = client.db(); // default DB from URI
  return db.collection(collectionName); // 👈 THIS defines the collection
}

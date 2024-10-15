'use server'
import { MongoClient } from "mongodb"
import { Document, WithId, ObjectId } from "mongodb"
import { returnSignedUrl } from "./s3"

export async function searchOfficerRecord(records_id: string): Promise<WithId<Document>> {
  if (!process.env.MONGODB_URI) throw new Error("Database URI not specified.")
  if (!records_id) throw new Error("No Record ID Specified.")
  const client = new MongoClient(process.env.MONGODB_URI)
  try {
    const database = client.db("test")
    const collection = database.collection("officers")
    
    const officer = await collection.findOne({ _id: new ObjectId(records_id) })
    if (!officer) throw new Error('No officer found with nominated ID')
    return officer
  } finally {
    await client.close()
  }
}

export async function searchOfficer(barcode_result: string): Promise<WithId<Document>> {
    const results_array = barcode_result.split("\n", 3)
    const recordsId = results_array[0]
    const officer_record = await searchOfficerRecord(recordsId)
    const newImageUrl = await returnSignedUrl(officer_record.image)
    return { ...officer_record, image: newImageUrl }
}
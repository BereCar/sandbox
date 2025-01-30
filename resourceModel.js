const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GeoJSON = require("mongoose-geojson-schema");
mongoose.set("strictQuery", false);

const ResourceSchema = new Schema({
  name: { type: String, required: true },  // ✔ Correspondance XML : <cit:title>
  description: { type: String, required: true },  // ✔ Correspondance XML : <mri:abstract>
  publication_date: { type: Date },  // ✔ Correspondance XML : <cit:date> (type publication)
  keywords: [{ type: String }],  // ✔ Correspondance XML : <mri:MD_Keywords> <mri:keyword>
  language: { type: String, enum: ["fr", "en"] },  // ✔ Correspondance XML : <lan:LanguageCode>
  contact: { type: String },  // ✔ Correspondance XML : <cit:electronicMailAddress>
  external_url: { type: String },  // ✔ Correspondance XML : <cit:CI_OnlineResource> <cit:linkage>
  boundingBox: {  // ✔ Correspondance XML : <gex:EX_GeographicBoundingBox>
    west: { type: Number },
    east: { type: Number },
    south: { type: Number },
    north: { type: Number }
  },
  projection: { type: String },  // ✔ Correspondance XML : <mrs:referenceSystemIdentifier> (EPSG)
  licence: { type: String },  // ✔ Correspondance XML : <mco:MD_LegalConstraints>
  owner: { type: String },  // ✔ Correspondance XML : <cit:CI_Organisation> <cit:name>
  status: { type: String, enum: ["onGoing", "completed", "planned"] },  // ✔ Correspondance XML : <mri:MD_ProgressCode> 
  metadataStandardName: { type: String },  //  <mdb:metadataStandardName>
  metadataStandardVersion: { type: String },  //  <mdb:metadataStandardVersion>
  contact_role: { type: String },  //  <cit:role>
  temporalExtent: { type: String },  //  <mri:extent><temporalExtent>
  dataQuality: { type: String },  //  <dqk:DataQuality>
  lineage: { type: String },  //  <dqk:LI_Lineage>
  distribution: { type: String },  //  <mrd:MD_Distribution>
  spatialRepresentationType: { type: String },  //  <mri:spatialRepresentationType>
  resolution: { type: String }  //  <mri:resolution>
});

module.exports = mongoose.model("Resource", ResourceSchema);

import {  UploadFile } from "src/app/shared-file/models/upload-file.model";
import { Serializable } from "../../../core/model/serializable.model";


export class AppResource implements Serializable {
  id?: string;
  bbox: Array<any> = new Array<any>();
  published: boolean = true;
  contact: string;
  coproducers: string[]; 
  description: any;  
  extent: any; // west, south, east, north
  files: Array<any> = new Array<any>();
  fileDescription: Array<any> = new Array<any>(); 
  fileData: Array<any> = new Array<any>(); 
  fileSymbo: Array<any> = new Array<any>(); 
  frequenceMaj: string;
  gpf_id: string = ''; 
  gpf_path: string = '';
  gpf_url_flux: Array<any> = new Array<any>(); 
  gpf_url_metadata: Array<any> = new Array<any>(); 
  gpf_urls_annexes: Array<any> = new Array<any>();  
  img: string = '';
  img_url: string = '';
  keywords?: Array<string>;
  langage: string = ''; 
  licence: string = '';
  linkToData: string = '';
  millesime: string = '';
  name?: string;
  owner?: string; 
  purpose: string;
  resourcesConnexes: Array<any> = new Array<any>();
  sous_type: string;
  srs: string;
  shared: string;
  status: string;
  technicalName: string;
  territoire: Array<any> = new Array<any>();    
  type?:   string = '';
  uploadDate?: string;
  useCase?: string;

  serialise() {
    const descriptionFiles = this.fileDescription ? this.fileDescription.map((item: any) => item.id || item) : [];
    const symboFiles = this.fileSymbo ? this.fileSymbo.map((item: any) => item.id || item) : [];
    const dataFiles = this.fileData ? this.fileData.map((item: any) => item.id || item) : [];
    const files = this.files ? this.files.map((item: any) => item.id || item) : [];
    const resource: any = {  
      published: this.published,
      bbox: this.bbox,
      contact: this.contact,
      coproducers: this.coproducers,       
      description: this.description,     
      extent: this.extent,
      files: files, 
      fileDescription: descriptionFiles,
      fileData: dataFiles,
      fileSymbo: symboFiles,
      frequenceMaj: this.frequenceMaj,
      gpf_id: this.gpf_id,     
      gpf_path: this.gpf_path,
      gpf_url_flux: this.gpf_url_flux,
      gpf_url_metadata: this.gpf_url_metadata,
      gpf_urls_annexes: this.gpf_urls_annexes,
      img: this.img,
      img_url: this.img_url,
      keywords: this.keywords,
      langage: this.langage,  
      licence: this.licence,
      linkToData: this.linkToData,
      millesime: this.millesime,
      name: this.name,
      owner: this.owner,     
      purpose: this.purpose,
      resourcesConnexes: this.resourcesConnexes,
      sous_type: this.sous_type,
      shared: this.shared,
      srs: this.srs,
      status : this.status,
      technicalName: this.technicalName,
      territoire: this.territoire,       
      type: this.type,     
      uploadDate: this.uploadDate,
      useCase: this.useCase
    };
   
    if (this.id && this.id !== '') {
      resource['_id'] = this.id;
    }
  }

  deserialise(input: any): AppResource {
    
    let files = [];
    if (input.files) {
      files = input.files.filter((item: any) => item && item._id)
        .map((item: any) => new UploadFile().deserialize(item));
    }
    Object.assign(this, {
      id: input._id, 
      bbox: input.bbox,
      published: input.published, 
      contact: input.contact,
      coproducers: input.coproducers,        
      description: input.description,          
      extent: input.extent,
      files: files,
      fileDescription: input.fileDescription,
      fileData: input.fileData,
      fileSymbo: input.fileSymbo,
      frequenceMaj: input.frequenceMaj,
      gpf_id: input.gpf_id,     
      gpf_path: input.gpf_path,
      gpf_url_flux: input.gpf_url_flux,
      gpf_url_metadata: input.gpf_url_metadata,
      gpf_urls_annexes: input.gpf_urls_annexes,  
      img: input.img,
      img_url: input.img_url,
      keywords: input.keywords,
      langage: input.langage,  
      licence: input.licence,
      linkToData: input.linkToData,
      millesime: input.millesime,      
      name: input.name,
      owner: input.owner,        
      purpose: input.purpose,
      resourcesConnexes: input.resourcesConnexes,
      sous_type: input.sous_type,
      srs: input.srs,
      status : input.status,
      technicalName: input.technicalName,
      territoire: input.territoire,     
      type: input.type,    
      uploadDate: input.uploadDate,
      useCase: input.useCase
    });
    return this;
  }
}

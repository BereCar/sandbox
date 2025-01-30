import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";

import { AppResource } from "../../model/app-resource.model";
import { RESOURCE_TYPES_ENUM } from "../../model/resource-type.enum";
import { MatDialog } from "@angular/material/dialog";
import { ResourceService } from "../../services/resource.service";
import { AlertDialogComponent } from "src/app/shared-design-ign/alert-dialog/alert-dialog.component";
import { AlertDialogData } from "src/app/shared-design-ign/model/alert-dialog-data.model";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { RawPropertiesDialogComponent } from "../../../components/raw-properties-dialog/raw-properties-dialog.component";

@Component({
  selector: "app-resource-detail",
  templateUrl: "./resource-detail.component.html",
  styleUrls: ["./resource-detail.component.css"],
})
export class ResourceDetailComponent implements OnInit {
  resource!: any;
  url?: string;
  breadcrumb?: any = {};
  all_metadata_url = 'https://data.geopf.fr/csw/dhda_c?REQUEST=GetRecords&SERVICE=CSW&VERSION=2.0.2&RESULTTYPE=results&elementSetName=full&TYPENAMES=gmd:MD_Metadata';
  
  urlSafe: SafeResourceUrl;
  alternateSafe: SafeResourceUrl;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private resourceService: ResourceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        map((response: any) => {
          this.resource = response.data;
          this.breadcrumb.current = this.resource.title || this.resource.name;
        })
      )
      .subscribe();
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.resource.gpf_url_metadata);
    this.alternateSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.all_metadata_url);
  }
  
  transformType(type: string) {
    const types = RESOURCE_TYPES_ENUM;
    return types.find((t) => t.value === type).name;
  }

  showRawObjectDialog() {
    const dialogRef = this.dialog.open(RawPropertiesDialogComponent, { data: this.resource });
    dialogRef.afterClosed().subscribe();
  }


  public showConfirmDialog() {
    this.alertConfirm("Cette ressource va être supprimée définitivement.");
  }
  private alertConfirm(message: string) {
    let newDialogData = new AlertDialogData();
    newDialogData.title = `Êtes-vous sûr ?`;
    newDialogData.content = message;
    newDialogData.confirmButtonText = "OK";
    newDialogData.leaveButtonText = "Non";

    this.dialog
      .open(AlertDialogComponent, {
        width: "860px",
        data: newDialogData,
      })
      .afterClosed()
      .pipe(
        map((data) => {
          if (data === null) {
            return;
          } else {
            this.resourceService.delete(this.resource.id).subscribe();
            this.router.navigate(["/", "catalogue"]);
          }
        })
      )
      .subscribe();
  }
}

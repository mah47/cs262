import { Component } from '@angular/core';
import { IonicPage,
         NavController,
         NavParams,
         ViewController,
         ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@IonicPage({
   name: 'view-gallery'
})
@Component({
  selector: 'page-view-gallery',
  templateUrl: 'view-gallery.html',
})
export class ViewGalleryPage {


   /**
    * @name name
    * @type {String}
    * @public
    * @description              Record name value
    */
   public name : string;



   /**
    * @name description
    * @type {String}
    * @public
    * @description              Record description value
    */
   public description : string;



   /**
    * @name thumbnail
    * @type {String}
    * @public
    * @description              Record thumbnail value
    */
   public thumbnail : string;



   constructor(public navCtrl 		: NavController,
   			   public navParams 	: NavParams,
   			   private _TOAST 		: ToastController,
   			   private _VIEW        : ViewController,
   			   private _HTTP 		: HttpClient)
   {
   }




   /**
    * Retrieve the navigation parameters
    * on the ionViewDidLoad lifecycle event
    *
    * @public
    * @method ionViewDidLoad
    * @return {None}
    */
   ionViewDidLoad()
   {
      this.name 				=	this.navParams.data.record.name;
      this.description			=	this.navParams.data.record.description;
      this.thumbnail			=	this.navParams.data.record.thumbnail;

   }




   /**
    * Call the declared route within the node application to
    * generate a PDF document based on the supplied parameters
    * sent via the Angular HttpClient POST method
    *
    * @public
    * @method generatePDF
    * @return {None}
    */
   generatePDF() : void
   {
      let headers 		: any		 = new HttpHeaders({ 'Content-Type': 'application/json' }),
          options 		: any 		 = { name : this.name, description : this.description, thumbnail : this.thumbnail },
          url       	: any      	 = this._HOST + "api/generate-pdf";


      this._HTTP
      .post(url, options, headers)
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         this.displayNotification(name + ' was successfully created');
      },
      (error : any) =>
      {
         console.dir(error);
      });
   }



   /**
    * Displays a message to the user
    *
    * @public
    * @method displayNotification
    * @param item    {String}      The message to be displayed
    * @return {None}
    */
   displayNotification(message : string) : void
   {
      let toast = this._TOAST.create({
         message 	: message,
         duration 	: 3000
      });
      toast.present();
   }




   /**
    * Closes the modal window where the component view is displayed
    * @public
    * @method closeModal
    * @return {None}
    */
   closeModal() : void
   {
      this._VIEW.dismiss();
   }

}
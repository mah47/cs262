import { Component } from '@angular/core';
import { ModalController, NavController, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


   /**
    * @name items
    * @type {Array}
    * @public
    * @description              Used to store the retrieved documents from the
                                MongoDB database
    */
   public items : Array<any>;



   /**
    * @name _HOST
    * @type {String}
    * @private
    * @description              The network IP Address and port number that the
                                node application is running on
    */
   private _HOST : string 			=	"http://ENTER-YOUR-NETWORK-IP-ADDRESS-HERE:8080/";



   constructor(public navCtrl 		: NavController,
   			   private _MODAL  		: ModalController,
               private _TOAST       : ToastController,
   			   private _HTTP        : HttpClient)
   {

   }



   /**
    * Retrieve the documents from the MongoDB database
    * on the ionViewDidEnter lifecycle event
    *
    * @public
    * @method ionViewDidEnter
    * @return {None}
    */
   ionViewDidEnter() : void
   {
      this.retrieve();
   }



   /**
    * Delete a selected document from the MongoDB database
    *
    * @public
    * @method deleteRecord
    * @param item    {Object}      The JavaScript map of data that
    *                              represents the retrieved document
    *                              from MongoDB
    * @return {None}
    */
   deleteRecord(item : any) : void
   {
      // Retrieve the document ID from the supplied parameter and
      // define the URL which triggers the node route for deleting the document
      let recordID 		: string		= item._id,
          url       	: any      	 	= this._HOST + "api/gallery/" + recordID;

      // Use Angular's Http module's delete method
      this._HTTP
      .delete(url)
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         this.retrieve();
         this.displayNotification(data.records.name + ' was successfully deleted');
      },
      (error : any) =>
      {
         console.dir(error);
      });
   }



   /**
    * Retrieve documents from the MongoDB database
    *
    * @public
    * @method retrieve
    * @return {None}
    */
   retrieve() : void
   {
      this._HTTP
      .get(this._HOST + "api/gallery")
      .subscribe((data : any) =>
      {
         // If the request was successful notify the user
         this.items = data.records;
      },
      (error : any) =>
      {
         console.dir(error);
      });
   }



   /**
    * Send the record (for the selected document from the MongoDB
    * database) to the manage-gallery page to be edited in the
    * template form fields
    *
    * @public
    * @method updateRecord
    * @param item    {Object}      The JavaScript map of data that
    *                              represents the retrieved document
    *                              from MongoDB
    * @return {None}
    */
   updateRecord(item : any) : void
   {
      this.navCtrl.push('manage-gallery', { record : item });
   }



   /**
    * Add a new record courtesy of the template form fields on
    * the manage-gallery page
    *
    * @public
    * @method addRecord
    * @return {None}
    */
   addRecord() : void
   {
      this.navCtrl.push('manage-gallery');
   }




   /**
    * View the selected record in a modal window
    *
    * @public
    * @method viewRecord
    * @param item    {Object}      The JavaScript map of data that
    *                              represents the retrieved document
    *                              from MongoDB
    * @return {None}
    */
   viewRecord(item : any): none
   {
      let modal = this._MODAL.create('view-gallery', { record : item });
      modal.present();
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

}
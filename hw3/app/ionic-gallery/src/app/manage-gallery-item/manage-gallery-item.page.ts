import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonicPage,
         NavController,
         NavParams,
         ToastController } from 'ionic-angular';
import {
   FormBuilder,
   FormGroup,
   Validators } from '@angular/forms';
import { ImageProvider } from '../../providers/image/image';


@IonicPage({
	name: 'manage-gallery'
})
@Component({
  selector: 'page-manage-gallery-item',
  templateUrl: 'manage-gallery-item.html',
})
export class ManageGalleryItemPage {




   /**
    * @name form
    * @type {FormGroup}
    * @public
    * @description              References a FormGroup object for use
    *                           with form validation/management
    */
   public form                  : FormGroup;



   /**
    * @name name
    * @type {Any}
    * @public
    * @description              Model for managing input values in the template's
    *                           name field
    */
   public name                  : any;



   /**
    * @name description
    * @type {Any}
    * @public
    * @description              Model for managing input values in the template's
    *                           description field
    */
   public description		     : any;



   /**
    * @name thumbnail
    * @type {Any}
    * @public
    * @description              Model for storing selected image value
    */
   public thumbnail		     : any;



   /**
    * @name displayed
    * @type {Any}
    * @public
    * @description              Model for storing selected value from the template's
    *                           displayed field
    */
   public displayed		     : any;



   /**
    * @name _ID
    * @type {String}
    * @private
    * @description              Stores the MongoDB document ID for the record
    *                           being displayed/amended
    */
   private _ID                  : String;



   /**
    * @name image
    * @type {Any}
    * @public
    * @description              Model for storing selected image value
    */
   public image              	: any;



   /**
    * @name pageTitle
    * @type {Any}
    * @public
    * @description              Manages the value displayed for the component's
    *                           page title
    */
   public pageTitle           	: string;



   /**
    * @name _HOST
    * @type {String}
    * @private
    * @description              The network IP Address and port number that the
                                node application is running on
    */
   private _HOST : string 			=	"http://ENTER-YOUR-NETWORK-IP-ADDRESS-HERE:8080/";



   constructor(public navCtrl 		: NavController,
   			   public navParams 	: NavParams,
   			   private _FB          : FormBuilder,
   			   private _HTTP        : HttpClient,
   			   private _TOAST       : ToastController,
   			   private _IMAGE       : ImageProvider)
   {
      // Define form validation - VERY basic!
      this.form = this._FB.group({
         'name'        	   : ['', Validators.required],
         'description'     : ['', Validators.required],
         'thumbnail'       : ['', Validators.required],
         'displayed'       : ['', Validators.required]
      });

   }



   /**
    * Use the ionViewDidLoad lifecycle event to detect whether particular
    * navigation parameters were set and, if so, retrieve those and assign
    * to public properties (which can then be displayed/edited in the template
    * form)
    *
    * @public
    * @method ionViewDidLoad
    * @return {None}
    */
   ionViewDidLoad() : void
   {
     if(this.navParams.get("record"))
     {
        this._ID 				=	this.navParams.data.record._id;
        this.name 				=	this.navParams.data.record.name;
        this.description		=	this.navParams.data.record.description;
        this.thumbnail			=	this.navParams.data.record.thumbnail;
        this.image   			=	this.navParams.data.record.thumbnail;
        this.displayed			=	this.navParams.data.record.displayed;
        this.pageTitle 			=	"Update";
     }
     else {
        this.pageTitle 			=	"Create";
     }
   }



   /**
    *
    * Handles whether an existing record is being updated or a new record
    * is added to the MongoDB database - this is determined by listening
    * for the presence of navigation parameters and offering the appropriate
    * logic for each scenario
    *
    * @public
    * @method manageGallery
    * @return {None}
    */
   manageGallery() : void
   {
      // Retrieve form field values, set up the JavaScript map of values to be
      // passed to node/MongoDB and declare the URL that we need to supply to
      // the Angular Http calls
      let name      	: any        = this.form.controls['name'].value,
          description   : any        = this.form.controls['description'].value,
          thumbnail   	: any        = this.form.controls['thumbnail'].value,
          displayed     : any        = this.form.controls['displayed'].value,
          headers 		: any		 = new HttpHeaders({ 'Content-Type': 'application/json' }),
          options       : any	     = { name : name, description : description, thumbnail : thumbnail, displayed: displayed },
          url       	: any      	 = this._HOST + "api/gallery";

      // Do we have a record to update?
      if(this.navParams.get("record"))
      {
         // Use the HttpClient put method to update the existing record
         this._HTTP
         .put(url + '/' + this._ID, options, headers)
         .subscribe((data : any) =>
         {
            // If the request was successful clear the form of data
            // and notify the user
            this.clearForm();
            this.displayNotification(name + ' was successfully updated');
         },
         (error : any) =>
         {
            console.dir(error);
         });
      }
      else
      {
         // Use the HttpClient post method to create a new record
         this._HTTP
         .post(url, options, headers)
         .subscribe((data : any) =>
         {
            // If the request was successful clear the form of data
            // and notify the user
            this.clearForm();
            this.displayNotification(name + ' was successfully created');
         },
         (error : any) =>
         {
            console.dir(error);
         });
      }
   }



   /**
    * Set models/properties to empty string values
    *
    * @public
    * @method clearForm
    * @return {None}
    */
   clearForm() : void
   {
      this.name 		= "";
      this.description	= "";
      this.thumbnail 	= "";
      this.image 		= "";
      this.displayed 	= "";
      this._ID 			= "";
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
    * Use the device camera to capture a photographic image
    * (courtesy of the takePhotograph method of the ImageProvider
    * service) and assign this, as a bade64-encoded string, to
    * public properties used in the component template
    *
    * @public
    * @method takePhotograph
    * @return {None}
    */
   takePhotograph() : void
   {
      this._IMAGE
      .takePhotograph()
      .then((image)=>
      {
         this.thumbnail   	= image.toString();
         this.image   		= image.toString();
      })
      .catch((err)=>
      {
         console.log(err);
      });
   }



   /**
    * Use the device photolibrary to select a photographic image
    * (courtesy of the takePhotograph method of the ImageProvider
    * service) and assign this, as a bade64-encoded string, to
    * public properties used in the component template
    *
    * @public
    * @method selectImage
    * @return {None}
    */
   selectImage() : void
   {
      this._IMAGE
      .selectPhotograph()
      .then((image)=>
      {
         this.thumbnail   	= image.toString();
         this.image   		= image.toString();
      })
      .catch((err)=>
      {
         console.log(err);
      });
   }



}

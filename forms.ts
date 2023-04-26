import { JSForm } from "lib/ezforms-react/jsforms";
import {
  TextField,
  TextAreaField,
  NumberField,
  FileField,
  SelectField,
  RadioField,
  MultiSelectField,
  CheckboxField,
  BooleanField,
  DateField,
} from "lib/ezforms-react/jsforms.fields";

class UserForm extends JSForm {
  static formType = "user";
  static fields = [
    new TextField("email", "Email", "your email here",[], "email"),
    new TextField("password", "Password", "your password here",[], "password"),
    new TextField("firstName", "First Name", "your first name here",[], "firstName"),
    new TextField("lastName", "Last Name", "your last name here",[], "lastName"),
    new TextField("currentJob", "Current Job", "your current job here",[], "currentJob"),
    new NumberField("truckNumber", "Truck Number", "your truck number here",[], "truckNumber"),
  ];
}

class ItemForm extends JSForm {
    static formType = "item";
    static fields = [
        new TextField("name", "Name", "your name here",[], "name"),
        new TextField("description", "Description", "your description here",[], "description"),
        new TextField("dimensions", "Dimensions", "your dimensions here",[], "dimensions"),
        new FileField("img", "Image",[], "img"),
        new TextField("category", "Category", "your category here",[], "category"),
        new TextField("submodel", "Submodel", "your submodel here",[], "submodel"),
        new NumberField("threshold", "Threshold", "your threshold here",[], "threshold"),
    ];
}

class TruckForm extends JSForm {
    static formType = "truck";
    static fields = [
        new TextField("name", "Name", "your name here",[], "name"),
        new TextField("make", "Make", "your make here",[], "make"),
        new TextField("model", "Model", "your model here",[], "model"),
        new TextField("year", "Year", "your year here",[], "year"),
        new TextField("vin ", "VIN", "your vin here",[], "vin"),
        new TextField("licencePlate", "Licence Plate", "your licence plate here",[], "licencePlate"),
        new NumberField("diverID", "Driver ID", "your driver id here",[], "driverID")
    ];
}

class WarehouseForm extends JSForm {
    static formType = "warehouse";
    static fields = [
        new TextField("name", "Name", "your name here",[], "name"),
        new TextField("address", "Address", "your address here",[], "address"),
        new MultiSelectField("stock", "Stock", [],[], "stock")
    ];
}

class JobForm extends JSForm {
    static formType = "job";
    static fields = [
        new TextField("name", "Name", "your name here",[], "name"),
        new TextField("location", "Location", "your location here",[], "location"),
        new MultiSelectField("items", "Items", [],[], "items"),
        new MultiSelectField("workers", "Workers", [],[], "workers"),
        new FileField("files", "Files", [], "files"),
        new FileField("notes", "Notes", [], "notes")
    ];
}

export { UserForm, ItemForm, TruckForm, WarehouseForm, JobForm };
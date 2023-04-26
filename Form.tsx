import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  usePostRequest,
  useGetRequest,
  usePutRequest,
} from "hooks/customHooks";
import { UserForm, ItemForm, WarehouseForm, JobForm, TruckForm } from "./forms";
import { TextInput, MultiSelectInput, FileInput, NumberInput } from "./FormComponents";

//A generic form component that takes in a list of fields and creates the inputs and labels via map probebly
//use a generic fetch component that modulates depending on the inputs

//interfeace for fields
interface Field {
  name: string;
  type: string;
  label: string;
}

//interface for props
interface FormProps {
  formStyle: UserForm | ItemForm | WarehouseForm | JobForm | TruckForm;
}

export default function Form({ formStyle }: FormProps) {
  const [errors, setErrors] = useState({
    email: true,
    password: true,
  });
  const [submittable, setSubmittable] = useState(true);
  const location = useLocation();
  const { postRequest } = usePostRequest();
  const { getRequest } = useGetRequest();
  const { putRequest } = usePutRequest();

  //submit function
  useEffect(() => {
    if (document && document.getElementById("input-form") !== null) {
      document
        .getElementById("input-form")!
        .addEventListener("submit", submitForm);
    } else {
      console.log("input-form not found");
    }
  }, []);

  //fetch for form population if edit
  useEffect(() => {
    if (
      location.pathname.split("/")[3] !== undefined &&
      location.pathname.split("/")[3] !== null
    ) {
      getRequest(`${formStyle}/${location.pathname.split("/")[3]}`)
        .then((data) => {
          console.log("Success:", data);
          //set inputs default values to data parameters
          formStyle.fields.forEach((field) => {
            if (document && document.getElementById(field.name) !== null) {
              (document.getElementById(field.name) as HTMLInputElement)!.value =
                data[field.name];
            } else {
              console.log("input not found");
            }
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [location]);

  //fetch to submit form
  function submitForm(event: Event) {
    event.preventDefault();
    //create new FormData object
    const form = document.getElementById("input-form");
    const formData = new FormData(form as HTMLFormElement);
    if (
      location.pathname.split("/")[3] !== undefined &&
      location.pathname.split("/")[3] !== null
    ) {
      putRequest(
        `${formStyle}/${location.pathname.split("/")[3]}`,
        formData
      ).then((data) => console.log(data));
    } else {
      postRequest(formStyle.formType, formData).then((data) =>
        console.log(data)
      );
    }
  }

  //update submittable(if applicable) on change
  useEffect(() => {
    if (!errors.email && !errors.password) {
      setSubmittable(true);
    } else {
      setSubmittable(false);
    }
  }, [errors]);

  //only allow form to be submitted if all fields are filled in

  function checkSubmittable() {
    setSubmittable(true);

    formStyle.fields.forEach((field) => {
      const element = document.getElementById(field.name) as HTMLInputElement;
      if (element) {
        if (element.value === "") {
          setSubmittable(false);
        }
      }
    });
  }
  useEffect(() => {
    document.addEventListener("input", checkSubmittable);

    return () => {
      document.removeEventListener("input", checkSubmittable);
    };
  }, []);

  return (
    <form id="input-form">
      {formStyle.fields.map((field) => (
        <div>
          {field.type === "text" ? (
            <TextInput field={field} errors={errors} setErrors={setErrors} />
          ) : field.type === "number" ? (
            <NumberInput field={field} />
          ) : field.type === "file" ? (
            <FileInput field={field} />
          ) : field.type === "multiselect" ? (
           <MultiSelectInput field={field}/>
          ) : (
            <></>
          )}
        </div>
      ))}
      <button type="submit" disabled={!submittable}>
        Submit
      </button>
    </form>
  );
}

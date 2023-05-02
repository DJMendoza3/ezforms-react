import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  usePostRequest,
  useGetRequest,
  usePutRequest,
} from "hooks/customHooks";
import { UserForm, ItemForm, WarehouseForm, JobForm, TruckForm } from "./forms";
import { TextInput, MultiSelectInput, FileInput, NumberInput, SelectInput } from "./FormComponents";

import styles from "./forms.module.css";
//A generic form component that takes in a list of fields and creates the inputs and labels via map probebly
//use a generic fetch component that modulates depending on the inputs

//interface for props
interface FormProps {
  formStyle: UserForm | ItemForm | WarehouseForm | JobForm | TruckForm;
}

export default function Form({ formStyle }: FormProps) {
  const [errors, setErrors] = useState({});
  const [submittable, setSubmittable] = useState(true);
  const location = useLocation();
  const { postRequest } = usePostRequest();
  const { getRequest } = useGetRequest();
  const { putRequest } = usePutRequest();

  //build error object 
  useEffect(() => {
    formStyle.fields.forEach((field) => {
      setErrors(prev => {return {...prev, [field.name]: false}});
    });
  }, [formStyle])

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

  useEffect(() => {
    console.log(errors);
  }, [errors]);

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
    if (Object.values(errors).includes(true)) {
      setSubmittable(false);
    } else {
      setSubmittable(true);
    }
  }, [errors]);

  useEffect(() => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("input", (event) => toggleLabel(event));
    });
  }, []);



  function toggleLabel(event: Event): void {
    const target = event.target as HTMLInputElement;
    const label = document.getElementById(`${target.name}-label`);
    if (label && target.type === 'text') {
      if (target.value.length > 0) {
        label.className = styles["active"];
      } else {
        label.className = styles[""];
      }
    }
  }


  return (
    <form id="input-form">
      {formStyle.fields.map((field) => (
        <div className={styles["form-control"]}>
          {field.type === "text" ? (
            <TextInput field={field} setErrors={setErrors} />
          ) : field.type === "number" ? (
            <NumberInput field={field} setErrors={setErrors} />
          ) : field.type === "file" ? (
            <FileInput field={field} setErrors={setErrors} />
          ) : field.type === "multiselect" ? (
           <MultiSelectInput field={field}setErrors={setErrors}/>
          ) : field.type === "select" ? (
            <SelectInput field={field} setErrors={setErrors} />
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

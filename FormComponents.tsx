import { useState, useEffect } from "react";
import { useAppSelector } from "redux/hooks";
import {
  TextField,
  NumberField,
  MultiSelectField,
  FileField,
} from "lib/ezforms-react/jsforms.fields";

import styles from "./formComponents.module.css";

interface TextFieldProps {
  field: TextField;
  errors: React.ComponentState;
  setErrors: React.Dispatch<
    React.SetStateAction<{ email: Boolean; password: Boolean }>
  >;
}

export function TextInput({ field, errors, setErrors }: TextFieldProps) {
  function usernameCheck() {
    const emailElement = document.getElementById("email") as HTMLInputElement;
    if (emailElement) {
      emailElement.addEventListener("input", () => {
        const emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRegex.test(emailElement.value)) {
          setErrors((prevState) => ({ ...prevState, email: false }));
        } else {
          setErrors((prevState) => ({ ...prevState, email: true }));
        }
      });
    }
  }

  function passwordCheck() {
    const passwordElement = document.getElementById(
      "password"
    ) as HTMLInputElement;
    if (passwordElement) {
      passwordElement.addEventListener("input", () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (passwordRegex.test(passwordElement.value)) {
          setErrors((prevState) => ({ ...prevState, password: false }));
        } else {
          setErrors((prevState) => ({ ...prevState, password: true }));
        }
      });
    }
  }

  useEffect(() => {
    document.addEventListener("input", usernameCheck);
    document.addEventListener("input", passwordCheck);

    return () => {
      document.removeEventListener("input", usernameCheck);
      document.removeEventListener("input", passwordCheck);
    };
  }, []);

  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      <input type={field.type} name={field.name} id={field.name} />
      {field.name === "password" && errors.password && (
        <p>
          Password must be at least 8 characters long and contain at least one
          uppercase letter, one lowercase letter and one number
        </p>
      )}
      {field.name === "email" && errors.email && (
        <p>Please enter a valid email address</p>
      )}
    </>
  );
}

interface NumberFieldProps {
  field: NumberField;
}

export function NumberInput({ field }: NumberFieldProps) {
  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      <input type={field.type} name={field.name} id={field.name} />
    </>
  );
}

interface MultiSelectFieldProps {
  field: MultiSelectField;
}

export function MultiSelectInput({ field }: MultiSelectFieldProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const inventory = useAppSelector((state) => state.item.inventory);

  const toggleOption = (name: string) => {
    setSelected((prevSelected) => {
      // if it's in, remove
      const newArray = [...prevSelected];
      if (newArray.includes(name)) {
        return newArray.filter((item) => item !== name);
        // else, add
      } else {
        newArray.push(name);
        return newArray;
      }
    });
  };

  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      <div className={styles["dropdown"]}>
        <div className={styles["dropdown__selected"]}>
          <div>
            {selected.map((item) => {
              return (
                <button
                  onClick={() => toggleOption(item)}
                  className={styles["selected-item"]}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
        <ul className={styles["dropdown__options"]}>
          {inventory.map((option) => {
            const isSelected = selected.includes(option.name);

            if (!isSelected) {
              return (
                <li
                  className={styles["dropdown__option"]}
                  onClick={() => toggleOption(option.name)}
                >
                  <span>{option.name}</span>
                </li>
              );
            } else {
              return(<></>);
            }
          })}
        </ul>
      </div>
    </>
  );
}

interface FileFieldProps {
  field: FileField;
}

export function FileInput({ field }: FileFieldProps) {
  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      <input type={field.type} name={field.name} id={field.name} />
    </>
  );
}

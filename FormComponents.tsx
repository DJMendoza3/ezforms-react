import { useState, useEffect } from "react";
import { useAppSelector } from "redux/hooks";
import {
  TextField,
  NumberField,
  MultiSelectField,
  FileField,
} from "lib/ezforms-react/jsforms.fields";

import styles from "./formComponents.module.css";

const useValueValidation = (id: string, validators: any[]) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      input.addEventListener("input", () => {
        let errorTriggered = false;
        if (input.value !== null && input.value !== undefined) {
          validators.map((validator) => {
            if (validator(input.value) !== null) {
              errorTriggered = true;
              setError(validator(input.value));
            } else if (errorTriggered === false) {
              setError(null);
            }
          });
        }
      });
    }
  }, [id, validators]);

  return error;
};

interface TextFieldProps {
  field: TextField;
  setErrors: React.Dispatch<
    React.SetStateAction<{ email: Boolean; password: Boolean }>
  >;
}

export function TextInput({ field, setErrors }: TextFieldProps) {
  const error = useValueValidation(field.name, field.validators);

  useEffect(() => {
    if (error) {
      setErrors((prev) => {
        return { ...prev, [field.name]: true };
      });
    } else {
      setErrors((prev) => {
        return { ...prev, [field.name]: false };
      });
    }
  }, [error, field.name, setErrors]);

  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      <input type={field.type} name={field.name} id={field.name} />
      {error && <p>{error}</p>}
    </>
  );
}

interface NumberFieldProps {
  field: NumberField;
}

export function NumberInput({ field }: NumberFieldProps) {
  const error = useValueValidation(field.name, field.validators);
  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      <input type={field.type} name={field.name} id={field.name} />
      {error && <p>{error}</p>}
    </>
  );
}

interface MultiSelectFieldProps {
  field: MultiSelectField;
}

export function MultiSelectInput({ field }: MultiSelectFieldProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const inventory = useAppSelector((state) => state.item.inventory);
  const error = useValueValidation(field.name, field.validators);

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
              return <></>;
            }
          })}
        </ul>
      </div>
      {error && <p>{error}</p>}
    </>
  );
}

interface FileFieldProps {
  field: FileField;
}

export function FileInput({ field }: FileFieldProps) {
  const error = useValueValidation(field.name, field.validators);
  return (
    <>
      <label htmlFor={field.name}>{field.label}</label>
      <input type={field.type} name={field.name} id={field.name} />
      {error && <p>{error}</p>}
    </>
  );
}

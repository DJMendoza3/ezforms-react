import { useEffect } from "react";

export default function TruckForm() {
    useEffect(() => {
        if (document && document.getElementById("truck-form") !== null) {
          document
            .getElementById("truck-form")!
            .addEventListener("submit", createTruck);
        } else {
          console.log("truck form not found");
        }
      }, []);
    
      function createTruck(event: Event) {
        event.preventDefault();
        //create new FormData object
        const form = document.getElementById("truck-form");
        const formData = new FormData(form as HTMLFormElement);
        //append data to formData object
        formData.append("title", "Truck 1");
        formData.append("location", "Location 1");
        //send data to server
        fetch("http://localhost:5000/createtruck", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.get("name"),
            location: formData.get("location"),
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    return(
        <form id="truck-form">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="make">Make</label>
            <input type="text" name="make" id="make" />
            <label htmlFor="model">Model</label>
            <input type="text" name="model" id="model" />
            <label htmlFor="year">Year</label>
            <input type="text" name="year" id="year" />
            <label htmlFor="licensePlate">License Plate</label>
            <input type="text" name="licensePlate" id="licensePlate" />
            <label htmlFor="vin">VIN</label>
            <input type="text" name="vin" id="vin" />
            <label htmlFor="color">Color</label>
            <input type="text" name="color" id="color" />
            <label htmlFor="driver">Driver</label>
            <input type="text" name="driver" id="driver" />
            <button type="submit">Submit</button>
        </form>
    );
}
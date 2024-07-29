import { makeObservable, observable, action, runInAction } from 'mobx';
import axios from 'axios';
import Swal from 'sweetalert2'
class CityData
{
    citiesList=[];
    constructor()
    {
    makeObservable(this,{
        citiesList: observable,
        addCity: action,
        editCity: action,
        deleteCity: action

    })
    }
    initialCities = async () => {
        try {
          const result = await axios.get("https://localhost:7068/api/City");
          runInAction(() => {
            this.citiesList = result.data;
          });
        } catch (error) {
          console.error("Failed to fetch cities", error);
        }
      }
      addCity = async (data) => {
        try {
          console.log("data",data)
          const response = await axios.post("https://localhost:7068/api/City",data);
          if(response.status==200)
          {
          console.log("City added successfully:", response.data);
            Swal.fire({
              title: "City added successfully!",
              icon: "success"
            });
          }
          else if(response.status==204)
          {
          console.log("City name is exist");
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "City name is already exist",
            });
          }
        } catch (error) {
          console.error("Failed to add city", error);
        }
      };
      editCity = async (id, data) => {
        try {
          console.log("data", id, data);
          const response = await axios.put(`https://localhost:7068/api/City/${id}`, data, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if(response.status==200)
          {
            console.log("The changes were saved successfully:", response.data);
              Swal.fire({
                title: "The changes were saved successfully!",
                icon: "success"
              });
            }
          else if(response.status==204)
          {
            console.log("City name is exist");
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "City name is already exist",
              });
            }
        } catch (error) {
          console.error("Failed to edit city", error);
        }
      };   
      deleteCity = async (id) => {
        try {
          console.log("id",id)
          const response = await axios.delete(`https://localhost:7068/api/City/${id}`);
          console.log("City deleted successfully");
          Swal.fire({
            title: "Deleted!",
            text: "Your City has been deleted.",
            icon: "success"
          });
        } catch (error) {
          console.error("Failed to delete city", error);
        }
      };   
      
}
export default new CityData();
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditWorkoutPage = () => {
  const { id } = useParams(); // get the workout ID from the URL
  const navigate = useNavigate(); // get the navigation object from the hook

  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");


  useEffect(() => {
    // fetch the workout data from the server using the ID
    async function fetchWorkoutData() {
      try {
        const response = await axios.get(`https://workout-api-mh.azurewebsites.net/edit/${id}`);
        const workout = response.data;
        setName(workout.name);
        setReps(workout.reps);
        setWeight(workout.weight);
      } catch (error) {
        console.log(error);
      }
    }
    fetchWorkoutData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent the default form submission behavior

    // send a PUT request to the server to update the workout
    try {
      await axios.put(`https://workout-api-mh.azurewebsites.net/edit/${id}`, { name, reps, weight });
      navigate("/"); // navigate back to the homepage using the hook
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    // send a DELETE request to the server to delete the workout
    try {
      await axios.delete(`https://workout-api-mh.azurewebsites.net/delete/${id}`);
      navigate("/"); // navigate back to the homepage using the hook
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-auto">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Edit Workout</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group ">
                  <label htmlFor="id">ID:</label>
                  <input type="text" id="id" className="form-control-plaintext" value={id} readOnly/>
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name:</label><input type="text" id="name" className="form-control" 
                  value={name} onChange={(event) => setName(event.target.value)}/>
                </div>
                <div className="form-group">
                  <label htmlFor="reps">Reps:</label>
                  <input type="text" id="reps" className="form-control" value={reps} 
                  onChange={(event) => setReps(event.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="weight">Weight: {weight} </label>
                  <input type="text" id="weight" placehodler={weight} className="form-control" value={weight}
                    onChange={(event) => setWeight(event.target.value)} />
                </div>
                <div className="form-group d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit}>
                    Save
                    </button>
                    <button type="button" className="btn btn-danger mt-3" onClick={handleDelete}>
                    Delete
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
     </div>
    </div>
  );
};

export default EditWorkoutPage;

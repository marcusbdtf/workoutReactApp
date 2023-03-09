import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useMsal } from "@azure/msal-react";

const EditWorkoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accounts } = useMsal();
  const userId = accounts[0].idTokenClaims.oid;

  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    async function fetchWorkoutData() {
      try {
        const response = await axios.get(`https://workout-api-mh.azurewebsites.net/workouts/${id}`);
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
    event.preventDefault();
    try {
      const updatedWorkout = {
        name,
        reps,
        weight
      };
      await axios.put(`https://workout-api-mh.azurewebsites.net/workouts/${userId}/${id}`, updatedWorkout);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      console.log(`Deleting workout with ID ${id}`);
      await axios.delete(`https://workout-api-mh.azurewebsites.net/workouts/${userId}/${id}`);
      console.log(`Workout with ID ${id} deleted successfully`);
      navigate("/");
    } catch (error) {
      console.log(`Error deleting workout with ID ${id}`, error);
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
                  <input
                    type="text"
                    id="id"
                    className="form-control-plaintext"
                    value={id}
                    readOnly/>
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(event) => setName(event.target.value)}/>
                </div>
                <div className="form-group">
                  <label htmlFor="reps">Reps:</label>
                  <input
                    type="text"
                    id="reps"
                    className="form-control"
                    value={reps}
                    onChange={(event) => setReps(event.target.value)}/>
                </div>
                <div className="form-group">
                  <label htmlFor="weight">Weight: {weight} </label>
                  <input
                    type="text"
                    id="weight"
                    className="form-control"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}/>
                </div>
                <div className="form-group d-flex justify-content-between">
                  <button
                    type="submit"
                    className="btn btn-primary mt-3"
                    onClick={handleSubmit}>
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mt-3"
                    onClick={handleDelete}>
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

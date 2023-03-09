import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMsal } from "@azure/msal-react";

function AddWorkoutPage() {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const navigate = useNavigate();

  const { accounts } = useMsal();
  const userId = accounts[0].idTokenClaims.oid;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://workout-api-mh.azurewebsites.net/workouts", {
        userId,
        name,
        reps,
        weight,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = (e) => {
    navigate("/")
  }

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-6">
        <h1 className="text-center">Add Workout</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
                type="text" id="name" className="form-control" value={name} onChange={(event) => 
                    setName(event.target.value)}/>
            </div>
            <div className="form-group">
            <label htmlFor="reps">Reps:</label>
            <input
                type="text" id="reps"
                className="form-control" value={reps} onChange={(event) => setReps(event.target.value)}/>
            </div>
            <div className="form-group"> 
            <label htmlFor="weight">Weight:</label>
            <input
                type="text" id="weight" className="form-control" value={weight} onChange={(event) => 
                setWeight(event.target.value)}/></div>

            <div className="form-group d-flex justify-content-between">

                <button type="submit" className="btn btn-primary mt-3" 
                onClick={handleSubmit}> Save </button>

                <button type="button" className="btn btn-secondary mt-3" 
                onClick={handleBack}> Back </button>
            </div>
        </form>
        </div>
    </div>
    </div>
  );
}

export default AddWorkoutPage;

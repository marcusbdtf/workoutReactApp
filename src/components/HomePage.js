import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMsal } from "@azure/msal-react";

function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const { accounts } = useMsal();
  const userAccount = accounts[0];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://workout-api-mh.azurewebsites.net/workouts/${userAccount.idTokenClaims.oid}`,
          {
            headers: {
              Authorization: `Bearer ${userAccount.idToken}`,
            },
          }
        );
        console.log(userAccount.idTokenClaims.oid)
        setWorkouts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [userAccount]);

  return (
    <>
      <div className="container">
        <h1 className="text-center mt-5 mb-3">Workout-Logbook</h1>
        <h3 className="mt-4">Previous Workouts</h3>
        <p>
          <em>Press (Name) To Edit</em>
        </p>
        <Link to="/add" className="btn btn-primary mb-2">
          Add Workout
        </Link>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {workouts.map((workout) => (
            <div key={workout.id} className="col">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/edit/${workout.id}`} workout={workout}>
                      Name:{" "}
                      {workout.name
                        .toString()
                        .charAt(0)
                        .toUpperCase() + workout.name.slice(1)}
                    </Link>
                  </h5>
                  <ul className="list-unstyled">
                    <li>Reps: {workout.reps}</li>
                    <li>Weight: {workout.weight}</li>
                    <li>Date: {workout.date}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;

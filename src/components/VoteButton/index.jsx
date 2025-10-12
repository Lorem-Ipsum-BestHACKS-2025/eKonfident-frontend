import axios from "axios";

import style from "./index.module.css";

export default function VoteButton({ className, id, count, voteGiven = 0 }) {
  return (
    <section className={`${style.component} ${className}`}>
      {voteGiven > 0 ? (
        <button disabled>+</button>
      ) : (
        <button onClick={() => addVote(id, voteGiven, 1)}>+</button>
      )}
      <span>{count}</span>
      {voteGiven < 0 ? (
        <button disabled>-</button>
      ) : (
        <button onClick={() => addVote(id, voteGiven, -1)}>-</button>
      )}
    </section>
  );
}

function addVote(id, voteGiven, vote) {
  // Data to send to the API
  const voteData = {
    upvoteChange: vote > 0 ? vote : undefined,
    downvoteChange: vote < 0 ? Math.abs(vote) : undefined,
  };

  console.log(voteData);

  axios
    .patch(`http://localhost:3000/report/${id}`, voteData)
    .then((response) => {
      // Handle successful response
      console.log("Vote submitted successfully!", response.data);
      // **In a real application, you would typically dispatch an action or update state here
      // to reflect the new vote count on the UI.**
      location.reload();
    })
    .catch((error) => {
      // Handle errors
      console.error("There was an error submitting the vote!", error);

      // Log specific error details if available
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Server response data:", error.response.data);
        console.log("Server status:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Axios error message:", error.message);
      }
    });
}

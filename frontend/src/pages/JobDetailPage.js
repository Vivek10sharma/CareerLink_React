import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

  axios.get(`http://localhost:5000/api/candidate/:${id}`)
    .then((res) => {
      setJob(res.data);
    })
    .catch((err) => {
      console.error('Error loading job:', err);
      setError('Failed to load job details.');
    });
}, [id]);


  if (error) {
    return (
      <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
        {error}
      </div>
    );
  }

  if (!job || !job.title) {
  return (
    <div className="text-center py-10 text-gray-500">
      Loading job details...
    </div>
  );
}


  // Print the full job JSON on page:
  return (
    <div style={{ whiteSpace: 'pre-wrap', margin: '20px', fontFamily: 'monospace' }}>
      <h2>Job Data (Raw JSON):</h2>
      {JSON.stringify(job, null, 2)}
    </div>
  );
};

export default JobDetailPage;

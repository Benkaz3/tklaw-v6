// src/hooks/useContentful.js
import { useState, useEffect, useRef } from 'react';
import client from './contentful';
import isEqual from 'lodash/isEqual';

const useContentful = (queries) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use a ref to store the previous queries
  const previousQueriesRef = useRef();

  useEffect(() => {
    // Check if the queries have changed using deep comparison
    if (!isEqual(previousQueriesRef.current, queries)) {
      previousQueriesRef.current = queries;

      // Fetch data when queries change
      const fetchData = async () => {
        setLoading(true);
        try {
          const results = await Promise.all(
            queries.map((query) => client.getEntries(query))
          );
          // Extract data from each result and store it in an object
          const dataObject = results.reduce((acc, result, index) => {
            acc[queries[index].content_type] = result.items;
            return acc;
          }, {});
          setData(dataObject);
        } catch (err) {
          console.error('Fetch Error:', err); // Error output
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [queries]);

  return { data, loading, error };
};

export default useContentful;

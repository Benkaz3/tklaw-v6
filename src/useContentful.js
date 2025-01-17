import { useState, useEffect, useRef } from 'react';
import client from './contentful';
import isEqual from 'lodash/isEqual';

const useContentful = (queries) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const previousQueriesRef = useRef();

  useEffect(() => {
    if (!isEqual(previousQueriesRef.current, queries)) {
      previousQueriesRef.current = queries;
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const results = await Promise.all(queries.map((query) => client.getEntries(query)));
          const dataObject = results.reduce((acc, result, index) => {
            const contentType = queries[index]?.content_type;
            if (contentType && result.items) {
              acc[contentType] = result.items;
            }
            return acc;
          }, {});
          setData(dataObject);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [queries]);

  return { data: Object.keys(data).length > 0 ? data : null, loading, error };
};

export default useContentful;
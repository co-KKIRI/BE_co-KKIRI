import axios from 'axios';
import { useEffect, useState } from 'react';

function Page() {
  const [data, setData] = useState('123');

  useEffect(() => {
    const getFetch = async () => {
      const response = await axios.get(`http://localhost:8080`);

      const { data } = response;
      setData(data);
    };

    // const postFetch = async () => {
    //   await axios.post(`http://localhost8080/api/test`, { email: 'test' });
    // };

    // const patchFetch = async () => {
    //   await axios.patch(
    //     `http://localhost8080/api/user/3/reservation/10/cancel`,
    //     { email: 'test' },
    //   );
    // };

    getFetch();
    // postFetch();
    // patchFetch();
  }, []);

  return <></>;
}

export default Page;

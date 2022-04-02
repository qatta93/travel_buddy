import React, { useEffect } from 'react';
// import { fetchApi } from '../../../helpers/api';
import { IRequest } from '../../../types';
import './style.css';

interface RequestCardProps {
  request: IRequest;
}

// interface IStatus {
//   status: string,
// }

const RequestCard = ({ request }:RequestCardProps) => {
  // const [status, setStatus] = useState<IStatus>();
  const tripId = request.trip_id;

  useEffect(() => {
    const putStatusData = async () => {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React Hooks PUT Request Example' }),
      };
      const data = await fetch(`/api/requests/${tripId}`, requestOptions);
      console.log(data);
      // setStatus(data);
    };
    putStatusData();
  }, []);

  const acceptRequest = (status:any) => status;

  return (
    <article className="request-card">
      <header className="request-card__header">
        <h1 className="request-card__title">Thomas, 22.03</h1>
        <p className="request-card__email">fff@gmail.com</p>
      </header>
      <p className="request-card__text">{request.message}</p>
      <div className="request-card__buttons">
        <button type="button" className="request-card__button request-card__button--accept" onClick={() => acceptRequest(request.status)}>accept</button>
        <button type="button" className="request-card__button request-card__button--reject">reject</button>
      </div>
    </article>
  );
};

export default RequestCard;

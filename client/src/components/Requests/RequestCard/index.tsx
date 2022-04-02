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
  // const requestId = request.id;

  useEffect(() => {

  }, []);

  const acceptRequest = () => {
    const requestId = request.id;
    const putStatusData = async () => {
      const newRequest = {
        ...request,
        status: 'accepted',
      };
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRequest),
      };
      const response = await fetch(`http://localhost:5500/api/requests/${requestId}`, requestOptions);
      const data = await response.json();
      console.log(data);
      console.log(requestId);
      // setStatus(data);
    };
    putStatusData();
  };

  return (
    <article className="request-card">
      <header className="request-card__header">
        <h1 className="request-card__title">Thomas, 22.03</h1>
        <p className="request-card__email">fff@gmail.com</p>
      </header>
      <p className="request-card__text">{request.message}</p>
      <div className="request-card__buttons">
        <button type="button" className="request-card__button request-card__button--accept" onClick={() => acceptRequest()}>accept</button>
        <button type="button" className="request-card__button request-card__button--reject">reject</button>
      </div>
    </article>
  );
};

export default RequestCard;

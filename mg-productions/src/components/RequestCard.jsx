import { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReqCar from './ReqCar';
import { useStateValue } from '../context/StateProvider';
import { fetchRequest } from '../api';

function RequestCard({user}) {
    const [{ allRequest }, dispatch] = useStateValue();

    
    const handleRequestFetch = async (id) => {
        try {
            const res = await fetchRequest(id);
            if (res) {
                dispatch({
                    type: 'SET_REQUEST',
                    allRequest: res.data.requests,
                });
            } else {
                console.error('Error fetching requests');
            }
        } catch (error) {
            console.error('Error in handleRequestFetch:', error);
        }
    };

    useEffect(() => {
        console.log(allRequest, user?._id)
        if (!allRequest || user?._id) {
            handleRequestFetch(user._id);
        }
    }, [user]);

    return (
        <div>
            <h2>User Requests</h2>
            {console.log('uses req : ' + allRequest)}
            {allRequest && allRequest.length > 0 ? (
                allRequest.map((request) => (
                    <ReqCar key={request._id} request={request} />
                ))
            ) : (
                <p>No requests found.</p>
            )}
        </div>
    );
}
RequestCard.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
    }).isRequired,
};


export default RequestCard;

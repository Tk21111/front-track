import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetMachineMutation } from './userApiSlice';

const SetTrashCan = () => {
    const { id } = useParams();

    const [fetchMachineId, { data, isSuccess, isLoading, isError, error }] = useSetMachineMutation();
    const [hasFetch, setHasFetch] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!hasFetch && id) {
                try {
                    await fetchMachineId({ trashCan: id }).unwrap();
                    setHasFetch(true);
                } catch (err) {
                    console.error('Error fetching machine:', err);
                }
            }
        };

        fetchData();
    }, [id, hasFetch, fetchMachineId]);

    return (
        <div>
            <h2>Set Trash Can</h2>

            {isLoading && <p>Loading...</p>}
            {isError && <p style={{ color: 'red' }}>Error: {error?.message || 'Something went wrong'}</p>}
            <div className='user-list-parent'>
                {isSuccess && data && (
                    <div key={data._id} className='food-waste-item'>
                        <div className="food-waste-details" style={{marginLeft : '0px'}}>
                            <p><strong>ID:</strong> {data._id || "null"}</p>
                            <p><strong>Status:</strong> {data.trashFull ||"false"}</p>
                            <p><strong>CurrentUser:</strong> {data?.currentUser?.username || "null"}</p>
                        </div>
                    </div>
                )}
            </div>
            

            {!isLoading && !isError && !isSuccess && <p>Waiting for data...</p>}
        </div>
    );
};

export default SetTrashCan;

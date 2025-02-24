import React from 'react';
import { useGetMachineQuery } from './userApiSlice';
import { QRCodeSVG } from 'qrcode.react';

const TrashCanPov = () => {
    const { data, isLoading, isError, error } = useGetMachineQuery(); // Corrected function call

    return (
        <div>
            <h2>Trash Can POV</h2>

            {isLoading && <p>Loading...</p>} {/* Show loading state */}
            {isError && <p style={{ color: 'red' }}>Error: {error?.message || "Something went wrong"}</p>} {/* Handle errors */}

            {data?.length > 0 ? (
                data.map((val) => (
                    <div key={val._id} className='food-waste-item'>
                        <div className='food-waste-front'>
                            {val._id ? <QRCodeSVG value={`${process.env.REACT_APP_HOSTING}/setmachine/${val._id}`} size={50} /> : <p>No User ID Available</p>}
                        </div>
                        <div className='overcontent'>
                            <div className='food-waste-content'>
                                <div className="food-waste-details">
                                    <p><strong>ID:</strong> {val._id || "null"}</p>
                                    <p><strong>ID:</strong> {val.name || "null"}</p>
                                    <p><strong>Status:</strong> {val.trashFull || "null"}</p>
                                    <p><strong>CurrentUser:</strong> {val?.currentUser?.username || "null"}</p>
                                    <p><strong>TimeSigin:</strong> {val?.timeSetCurrentUser || "null"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                !isLoading && <p>No trash cans available.</p> // Only show when data is empty and not loading
            )}
        </div>
    );
};

export default TrashCanPov;

import React from 'react';
import Carlist from './Carlist';

export default function Trainings() {

    useEffect(() => {
        getTrainings();
      }, [])

    return (
        <div>
            <h1>This is Trainings page</h1>
        </div>
    )
}
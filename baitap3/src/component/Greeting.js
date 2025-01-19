import React, { useState, useEffect } from 'react';

const Greeting = () => {
    const [firstName, setFirstName] = useState(window.localStorage.getItem('classFirstName') || '');
    const [lastName, setLastName] = useState(window.localStorage.getItem('classLastName') || '');

    useEffect(() => {
        window.localStorage.setItem('classFirstName', firstName);
        window.localStorage.setItem('classLastName', lastName);
    }, [firstName, lastName]);

    return (
        <div>
            <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <br />
            <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <p>
                Hello, <span>{firstName} {lastName}</span>
            </p>
        </div>
    );
};

export default Greeting;
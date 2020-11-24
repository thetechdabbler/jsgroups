import React from 'react';

const HOC = (WrappedComponent, props) => {
    return (<><WrappedComponent {...props} /></>);
};

export default HOC;
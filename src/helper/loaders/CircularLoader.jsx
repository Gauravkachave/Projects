import * as React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

const Circularloader = () => (
    <CircularProgress
        variant='indeterminate'
        disableShrink
        className='loader__circular-progress'
        size={24}
        thickness={4}
        style={{ animationDuration: '550ms', color: '#ff4569', position: 'absolute', top: '50%', left: '50%', marginTop: -12, marginLeft: -12 }}
    />
);
export default Circularloader;

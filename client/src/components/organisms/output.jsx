import React from 'react';
  import { 
    CardHeader, 
    CardHeading, 
  } from '../../styled_component'

  function Output({calculatedAmount}) {
    return (
        <CardHeader>
            <CardHeading>
                {calculatedAmount}
            </CardHeading>
        </CardHeader>
    );
  }
  
  export default Output;
  
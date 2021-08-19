import React from 'react';
  import { 
    CardSelect,  
    CardInput, 
    CardFieldset, 
    CardButton, 
    Option
  } from '../../styled_component'
  import { currencies } from '../../assets/currencySymbols';

  function Input({handleSubmit, onSubmit, register}) {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardFieldset>
            <CardSelect
                {...register("from")}
                id='from'
                name='from'
                placeholder='from'
                required
            >
                <Option value="USD">USD</Option>
                <Option value="EUR">EUR</Option>
                <Option value="GBP">GBP</Option>
                <Option value="LKR">LKR</Option>
                
            </CardSelect>
            </CardFieldset>

            <CardFieldset>
            <CardSelect
                id='to'
                name='to'
                {...register("to")}
                placeholder='to'
                required
            >
                {currencies.map(currency => 
                <option key={currency} value={currency}>{currency}</option>
                )}
            </CardSelect>
            </CardFieldset>

            <CardFieldset>
            <CardInput
                id='amount'
                name='amount'
                {...register("amount")}
                placeholder='amount'
                type='number'
                required
            />
            </CardFieldset>

            <CardFieldset>
            <CardButton
                id='button'
                name='button'
            type='submit'>
                Calculate
            </CardButton>
            </CardFieldset>
            </form>
    );
  }
  
  export default Input;
  



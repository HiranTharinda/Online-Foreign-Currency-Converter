import React, {
  useState, 
  useEffect
} from 'react';
import { 
  useDispatch,
  useSelector
} from 'react-redux';
import { useForm } from 'react-hook-form';
import { 
  CardWrapper, 
  CardSelect, 
  CardBody, 
  CardInput, 
  CardFieldset, 
  CardButton, 
  CardHeader, 
  CardHeading, 
  Option 
} from '../../styled_component'
import { convertCurrency } from '../../actions/conversionAction'

import { currencies } from '../../assets/currencySymbols';

function Calculater() {

  const dispatch = useDispatch();
  const result = useSelector(state => state.result)
  const { handleSubmit, register } = useForm()
  const [toCurrency, setToCurrency] = useState(null)
  const [amount, setAmount] = useState(null)
  const [calculatedAmount, setCalculatedAmount] = useState(0)

  useEffect(() => {
    if(result.result && result.result.data){
      if(result.result.data.success){
          setCalculatedAmount(`${toCurrency} ${Math.round(result.result.data.rates[toCurrency]*amount)}`)
      } else {
        if(result.result.data.error.code === 101){
          setCalculatedAmount('You have not supplied an API Access Key.')
        }
        if(result.result.data.error.code === 105){
          setCalculatedAmount('Unfortunately this currency is not allowed for free users. Try different one.')
        }
      }
    } else {
      setCalculatedAmount('Something wrong with the server')
    }
  }, [result])

  const onSubmit = (params) => {
    setToCurrency(params.to)
    setAmount(params.amount)
    const formValues = {
      from: params.from,
      to: params.to,
    }
    dispatch(convertCurrency(formValues));
  }
  return (
    <CardWrapper>
      <CardHeader>
        <CardHeading>
          Currency Converter
        </CardHeading>
      </CardHeader>

      <CardBody>
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
              id='amout'
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
        <CardHeader>
          <CardHeading>
            {calculatedAmount}
          </CardHeading>
        </CardHeader>
      </CardBody>
    </CardWrapper>

  );
}

export default Calculater;

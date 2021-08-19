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
  CardBody, 
  CardHeader, 
  CardHeading, 
} from '../../styled_component'
import { convertCurrency } from '../../actions/conversionAction'
import Output from '../organisms/output'
import Input from '../organisms/input';

function Calculater() {

  const dispatch = useDispatch();
  const result = useSelector(state => state.result)
  const { handleSubmit, register } = useForm()
  const [calculatedAmount, setCalculatedAmount] = useState(0)

  useEffect(() => {
    if(result.result && result.result.data){
      if(result.result.data.success){
          setCalculatedAmount(`${result.result.data.toCurrency} ${result.result.data.amount}`)
      } else {
        if(result.result.data.error.code === 101){
          setCalculatedAmount('You have not supplied an API Access Key.')
        }
        if(result.result.data.error.code === 105){
          setCalculatedAmount('Unfortunately this currency is not allowed for free users. Try different one.')
        }
      }
    } else {
      setCalculatedAmount(0)
    }
  }, [result])

  const onSubmit = (params) => {
    const formValues = {
      fromCurrency: params.from,
      toCurrency: params.to,
      amount:parseFloat(params.amount)
    }
    dispatch(convertCurrency(formValues));
  }
  return (
    <CardWrapper>
      <CardHeader>
        <CardHeading>
          Curreny Converter
        </CardHeading>
      </CardHeader>

      <CardBody>
          <Input
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
          />
          <Output
            calculatedAmount={calculatedAmount} 
          />
      </CardBody>
    </CardWrapper>

  );
}

export default Calculater;

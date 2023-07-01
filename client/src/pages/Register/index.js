import React, { useEffect } from 'react'
import {Button, Form, Input, Radio, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import OrgHospitalForm from './OrgHospitalForm';
import { RegisterUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../redux/loadersSlice';
import { getAntdInputValidation } from '../../utils/helpers';

function Register () {
  const [type, setType] = useState('donar');
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const onFinish = async (values) => {
    console.log(values);
    try{
      dispatch(SetLoading(true));
      const response=await RegisterUser(
        {...values, 
        userType: type});
      dispatch(SetLoading(false));
      if(response.success){
        message.success(response.message);
        navigate("/login");
      } else{
        throw new Error(response.message);
      }
    }catch(error){
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if(localStorage.getItem("token")){
      navigate("/");
    }
  }, []);

  return (
    <div className='flex h-screen items-center justify-center bg-primary'>
      <div>
      <Form layout='vertical' className='bg-white rounded shadow grid grid-cols-2 p-5 max-w-md w-full gap-4'
      onFinish={onFinish}>
            <h1 className='col-span-2 uppercase text-2xl'>
              <span className='text-primary'><br></br><br></br><br></br>{type.toUpperCase()} Registration</span>
              <hr></hr>
            </h1>
            
            <Radio.Group onChange={(e) => setType(e.target.value)} value={type} className='col-span-2'>
              <Radio value="donar">Donar</Radio>
              <Radio value="hospital">Hospital</Radio>
              <Radio value="organization">Organization</Radio>
            </Radio.Group>

            {type==='donar' && (
              <>
                {" "}
                <Form.Item label="Name" name='name' rules={getAntdInputValidation()}>
                  <Input>
                  </Input>
                </Form.Item>
                <Form.Item label="Email" name='email' rules={getAntdInputValidation()}>
                  <Input>
                  </Input>
                </Form.Item>
                <Form.Item label="Phone" name='phone' rules={getAntdInputValidation()}>
                  <Input>
                  </Input>
                </Form.Item>
                <Form.Item label="Password" name='password' rules={getAntdInputValidation()}>
                  <Input type='password'>
                  </Input>
                </Form.Item>
              </>
            )}

            {type !=='donar' && <OrgHospitalForm type={type}></OrgHospitalForm>}

        <Button type='primary' block className='col-span-2'
        htmlType='submit'>
          Register
        </Button>

        <Link to="/login" className="col-span-2 text-center text-gray-700 underline">
          Already have an account? Login
        </Link>
      </Form>
      </div>
      
    </div>
  )
}

export default Register
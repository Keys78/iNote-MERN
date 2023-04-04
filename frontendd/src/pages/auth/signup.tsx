/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector, } from "@/network/hooks";
import Google_logo from '@/components/assets/svg/Google_logo';
import { signupUser } from "@/features/auth/authSlice";
import Logo from "@/components/Logo";
import Link from 'next/link';
import { toast } from 'react-toastify';
import Button from '@/components/Button';
import Loader from '@/components/Loader';

export type SignupData = {
  username: string,
  email: string;
  password: string;
};

const Signup = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>('password');
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);




  const SignUpValidation = yup.object().shape({
    username: yup
      .string()
      .min(3, "username requires at least 3 characters")
      .required("username is required"),
    email: yup
      .string()
      .email("Please provide a valid email address")
      .required("email is required"),
    password: yup
      .string()
      // .min(8, "Password must be at least at 6 characters")
      .required("password is required"),
  });

  const handleToggle = () => {
    if (inputType === "password") {
      setInputType('text')
      setIsVisible(!isVisible)
    } else {
      setInputType('password')
      setIsVisible(!isVisible)
    }
  }


  return (
    <section className="max-w-[400px] w-full mx-auto my-8">
      {isLoading && <Loader />}
      <div className='mx-[16px]'>
        <Logo />
        <h1 className='pt-6 pb-1 font-bold text-xl text-center'>Create your account</h1>
        <article className=" pb-8 text-center sm:text-[16px] text-[14px]">
          Please note that the sign-up process requires email verification.
          Your email address will only be used to verify your identity in order to ensure security.
        </article>

        <div>
          <Formik
            validationSchema={SignUpValidation}
            initialValues={{
              username: "",
              email: "",
              password: ""
            }}

            onSubmit={async (
              values: SignupData,
              { resetForm }: FormikHelpers<SignupData>
            ) => {
              const data = { ...values, };
              dispatch(signupUser(data));
              // resetForm();


            }}

          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <div className="">

                  <div className="input-container">
                    <label className='opacity-50 pl-2' htmlFor="username">Username</label>
                    <input
                      className="input-class"
                      type="text"
                      value={props.values.username}
                      onBlur={props.handleBlur("username")}
                      onChange={props.handleChange("username")}
                    />
                    <span className={"text-red-500 text-[10px] translate-x-2 animate-pulse transition-all"}>
                      {props.touched.username && props.errors.username}
                    </span>
                  </div>

                  <div className="input-container">
                    <label className='opacity-50 pl-2' htmlFor="email">Email</label>
                    <input
                      className="input-class"
                      type="text"
                      value={props.values.email}
                      onBlur={props.handleBlur("email")}
                      onChange={props.handleChange("email")}
                    />
                    <span className={"text-red-500 text-[10px] translate-x-2 animate-pulse transition-all"}>
                      {props.touched.email && props.errors.email}
                    </span>
                  </div>

                  <label className='opacity-50 pl-2' htmlFor="password">Password</label>
                  <div className='password-input'>
                    <div>
                      <input
                        className="input-class-p"
                        type={inputType}
                        value={props.values.password}
                        onBlur={props.handleBlur("password")}
                        onChange={props.handleChange("password")}
                        autoComplete={'off'}
                      />

                    </div>
                    <span className='cursor-pointer' onClick={() => handleToggle()}>{!isVisible ? 'SHOW' : 'HIDE'}</span>
                  </div>
                  <span className={"text-red-500 text-[10px] translate-x-2 animate-pulse transition-all -mt-6 mb-6"}>
                    {props.touched.password && props.errors.password}
                  </span>

                </div>
                <br />
                <div className="my-2 lg:block flex justify-center items-center">
                  <button
                    type='submit'
                    className='gen-btn-class w-full py-3 rounded-[5px] text-[18px]'
                  >
                    Sign in
                  </button>
                </div>

                <div className='text-center pt-4'>
                  Already have an account? &nbsp;
                  <Link href={'/auth/login'}><span className='text-[#635FC7]'>Log in</span></Link>
                </div>

                <div className='divide text-center'>
                  <hr />
                  <span>OR</span>
                </div>

                <button disabled={true} className='flex items-center w-full justify-center rounded-[5px] border border-[#635FC7] py-3 space-x-3 cursor-pointer'>
                  <Google_logo />
                  <span>Continue with Google</span>
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  )
}

export default Signup
import React from 'react';
import { useForm } from 'react-hook-form';
import {Link, useNavigate, useParams} from "react-router-dom";
import MainLayout from '../../components/MainLayout'
import {otpVerify} from '../../services/index/users'; // You need to create this function
import { useMutation } from '@tanstack/react-query';
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import { userActions } from '../../store/reducers/userReducers';

const OTPPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams()
    console.log(id);

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ otp }) => {
            return otpVerify({ id, otp });
        },
        onSuccess: (data) => {
            toast.success('Login successful!');

            dispatch(userActions.setUserInfo(data));
            localStorage.setItem('account', JSON.stringify(data));
            navigate("/");
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            otp: "",
        },
        mode: "onChange",
    });

    const submitHandler = (data) => {
        const otp = data;
        mutate({ otp });
    };

    return (
        <MainLayout>
            <section className="container mx-auto px-5 py-10">
                <div className="w-full max-w-sm mx-auto">
                    <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">Enter OTP</h1>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="flex flex-col mb-6 w-full">
                            <label htmlFor="otp" className="text-[#5a7184] font-semibold block">OTP</label>
                            <input type="text" id="otp"
                                   {...register("otp", {
                                       minLength: {
                                           value: 4,
                                           message: "OTP Must be 4 characters",
                                       },
                                       maxLength: {
                                           value: 4,
                                           message: "OTP Must be 4 characters",
                                       },
                                       required: {
                                           value: true,
                                           message: "OTP is required",
                                       },
                                   })}
                                   placeholder="Enter OTP"
                                   className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none ${errors.otp ? "border border-red-500" : "border border-[#c3cad9]"}`}
                            />
                            {errors.otp && (
                                <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
                            )}
                        </div>

                        <button type="submit" disabled={!isValid || isLoading} className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed">
                            Submit OTP
                        </button>
                    </form>
                </div>
            </section>
        </MainLayout>
    );
};

export default OTPPage;
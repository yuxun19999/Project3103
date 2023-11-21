import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import MainLayout from '../../components/MainLayout'
import {forgotPasswordRequest, resetPasswordRequest} from '../../services/index/users'; // You need to create this function
import { useMutation } from '@tanstack/react-query';
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ email }) => {
            return forgotPasswordRequest({ email });
        },
        onSuccess: () => {
            toast.success('Password reset email sent. Please check your inbox.');
            navigate("/login");
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
            email: "",
        },
        mode: "onChange",
    });

    const submitHandler = (data) => {
        const email = data;
        console.log(data)
        mutate({ email });
    };

    return (
        <MainLayout>
            <section className="container mx-auto px-5 py-10">
                <div className="w-full max-w-sm mx-auto">
                    <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">Forgot Password</h1>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="flex flex-col mb-6 w-full">
                            <label htmlFor="email" className="text-[#5a7184] font-semibold block">Email</label>
                            <input type="email" id="email"
                                {...register("email", {
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Please enter a valid email',
                                    },
                                    required: {
                                        value: true,
                                        message: "Email is required",
                                    },
                                })}
                                placeholder="Enter Email"
                                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none ${errors.email ? "border border-red-500" : "border border-[#c3cad9]"}`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <button type="submit" disabled={!isValid || isLoading} className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed">
                            Send Reset Link
                        </button>

                        <p className="text-sm font-semibold text-[#5a7184]">
                            Remembered your password? <Link to="/login" className="text-primary">
                                Login Now </Link>
                        </p>
                    </form>
                </div>
            </section>
        </MainLayout>
    );
};

export default ForgotPasswordPage;
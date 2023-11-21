import React from 'react';
import { useForm } from 'react-hook-form';
import {Link, useNavigate, useParams} from "react-router-dom";
import MainLayout from '../../components/MainLayout'
import {resetPasswordRequest} from '../../services/index/users'; // You need to create this function
import { useMutation } from '@tanstack/react-query';
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const {id, token} = useParams()
    console.log(id, token);

    const { mutate, isLoading } = useMutation({
        mutationFn: ({ password }) => {
            return resetPasswordRequest({ id, token, password });
        },
        onSuccess: () => {
            toast.success('Password reset successful!');
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
            password: "",
        },
        mode: "onChange",
    });

    const submitHandler = (data) => {
        const password = data;
        console.log(data)
        mutate({ password });
    };

    return (
        <MainLayout>
            <section className="container mx-auto px-5 py-10">
                <div className="w-full max-w-sm mx-auto">
                    <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">Reset Password</h1>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="flex flex-col mb-6 w-full">
                            <label htmlFor="password" className="text-[#5a7184] font-semibold block">Password</label>
                            <input type="password" id="password"
                                   {...register("password", {
                                       minLength: {
                                           value: 8,
                                           message: "Password Must be more at least 8 characters",
                                       },
                                       required: {
                                           value: true,
                                           message: "Password is required",
                                       },
                                   })}
                                   placeholder="Enter Password"
                                   className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none ${errors.password ? "border border-red-500" : "border border-[#c3cad9]"}`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <button type="submit" disabled={!isValid || isLoading} className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed">
                            Reset Password
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

export default ResetPasswordPage;
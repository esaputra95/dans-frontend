import { useFormik } from 'formik';
import { ChangeEvent } from 'react'
import { fetchPost } from '../../hooks';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { service } from '../../service';

type formLoginType = {
    username?: string;
    password?: string;
}
const dataDumy = {
    username: '',
    password: ''
}

type ResponseProps = {code: string, data: string, message: string }

const storeSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });   

const LoginPage = () => {
    const navigate = useNavigate();

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        formik.setValues({ ...formik.values, [event.target.name]: event.target.value });
    };

    const formik = useFormik({
        initialValues: {
            ...dataDumy
        },
        onSubmit: async (value, helper) => {
            await handleActionlogin('login', value);
            helper.resetForm();
        },
        validationSchema: storeSchema,
        validateOnChange: false
    });

    const handleActionlogin = async (url:string, form:formLoginType) => {
        const response = await fetchPost<ResponseProps>(url, form)
        if(!response.error){
            service.defaults.headers = {
                'X-Custom-Header': 'foobar',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${response.data.data}`
            }
            sessionStorage.setItem('token', response.data.data);
            navigate("/");
        }
    }   

    return (
        <div className='w-full h-screen bg-gray-100 flex justify-center items-center'>
            <div className="flex flex-col justify-center lg:px-4 px-4 py-12 w-5/12 rounded-2xl shadow-2xl bg-white">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={formik.handleSubmit} className="space-y-6" action="#" method="POST">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm text-left font-medium leading-6 text-gray-900"
                            >
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    value={formik.values.username}
                                    onChange={handleOnChange}
                                    id="username"
                                    name="username"
                                    type="username"
                                    autoComplete="username"
                                    className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <label
                                htmlFor="username"
                                className="block text-sm text-left font-medium leading-6 text-red-400"
                            >
                                {formik.errors.username}
                            </label>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    value={formik.values.password}
                                    onChange={handleOnChange}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-red-400"
                                >
                                    {formik.errors.password}
                                </label>
                        </div>
                        <div>
                            <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                            Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0">
        <div className="card-body">
          <h1 className="text-5xl font-bold">Please Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                {...register("email", { required: true })}
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Please enter Your email</p>
              )}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "minLength" && (
                <p className="text-red-500"> password must be at last 6 characters </p>
              )}
              {errors.password?.type === "required" && (
                <p className="text-red-500">Please enter Your Password</p>
              )}
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              <button className="btn btn-primary text-black mt-4">Login</button>
            </fieldset>
            <p>
              <small>
                New to this website?{" "}
                <Link className="btn btn-link" to="/register">
                  Register
                </Link>
              </small>
            </p>
          </form>
        </div> 
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;

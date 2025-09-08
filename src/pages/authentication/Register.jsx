import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../hook/useAuth";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const { createUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0">
        <div className="card-body">
          <h1 className="text-5xl font-bold">Create an New Account !!</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <label className="label">Your Name</label>
              <input
                type="email"
                className="input"
                {...register("name", { required: true, minLength: 4 })}
                placeholder="Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Please enter Your email</p>
              )}

              {errors.name?.type === "minLength" && (
                <p className="text-red-500">
                  {" "}
                  password must be at last 4 characters{" "}
                </p>
              )}

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
                <p className="text-red-500">
                  {" "}
                  password must be at last 6 characters{" "}
                </p>
              )}
              {errors.password?.type === "required" && (
                <p className="text-red-500">Please enter Your Password</p>
              )}
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              <button className="btn btn-primary text-black mt-4">
                Register
              </button>
            </fieldset>
            <p>
              <small>
                New to this website?{" "}
                <Link className="btn btn-link" to="/login">
                  login
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

export default Register;

import { Link } from "react-router";
const Login = () => {
  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0">
        <div className="card-body">
          <h1 className="text-5xl font-bold">Please Login</h1>
          <form>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" />

              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password" />

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
      </div>
    </div>
  );
};

export default Login;

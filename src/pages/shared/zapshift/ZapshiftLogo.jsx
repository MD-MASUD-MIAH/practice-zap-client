import { Link } from "react-router";
import logo from "../../../../assets/logo.png";
const ZapshiftLogo = () => {
  return (
    <Link to={'/'}><div className="flex items-end ">
      <img className="mb-2" src={logo}></img>

      <h1 className="text-xl font-bold -ml-2">Zapshift</h1>
    </div></Link>
  );
};

export default ZapshiftLogo;

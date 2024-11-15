import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";

import { useNavigate } from "react-router-dom";

import { checkOTP, forgotPassword, signup, verifyForgotOTP } from "../../APIs/api";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [missing, setMissing] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);
  const [loading,setLoading]=useState(false)
  const {signupData,  isforgotPassword } = useSelector(
    (store) => store.credential
  );

 const userEmail= JSON.parse( localStorage.getItem("user_email"))

  useEffect(() => {
    if (!signupData && !isforgotPassword) {
      navigate("/login");
    }
  }, []);

  const handleChange = (otp) => {
    setOtp(otp);
    if (missing) setMissing(false);
  };

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (otp.length !== 6) {
        setMissing(true);
        if (toastShow) {
          toast.dismiss(toastShow);
          setToastShow(false);
        }
        const toastId = toast.error("Please fill all inputs");
        setToastShow(toastId);
        return;
      }
  
      const userInput = Number(otp);
      const data = { ...signupData, otp: userInput };
  
      if (!isforgotPassword) {
        dispatch(signup(data, navigate));
      } else {
        await verifyForgotOTP({ data, email: userEmail }, navigate);
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div
      
      className="flex flex-col min-h-[calc(100vh-(69px))] items-center justify-center"
    >
      <h1 className=" text-[2.1rem] vm:text-[2.3rem] oi:text-[2.7rem] px-1 overflow-hidden  md:text-[4em] -mt-[8rem] bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500  bg-clip-text text-transparent font-bold text-center">
      Enter Verification Code
      </h1>
      <div
        className="flex justify-center flex-wrap   px-2 relative gap-2 md:gap-4"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
      >
        <OTPInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          shouldAutoFocus
          inputType={"tel"}
          renderInput={(props) => <input {...props} />}
          inputStyle="bg-white/20 py-2  font-bold text-center max-w-[25px]  vm:w-[25px] rounded-md md:min-w-[60px] h-[50px] text-4xl  box-content overflow-hidden p-1 sm:p-3 outline-none"
          containerStyle={{ gap: ".5rem" }}
        />
        <div
          onClick={async () => {
            if (!isforgotPassword) {
              dispatch(checkOTP(signupData, navigate));
            } else {
              
              if(sendingOTP){
                return 
              }
             
              setSendingOTP(true)
              await forgotPassword({ email: userEmail }, navigate);
              setSendingOTP(false)

            }
          }}
          className="absolute right-2 -bottom-8 font-semibold text-lg"
        >
          <button className="text-white/50  sm:hover:text-white active:text-white">
            Resend OTP
          </button>
        </div>
      </div>
      <button
        onClick={()=>{
          if(!loading){
            handleSubmit()
          }
         
        }}
        disabled={loading}
        className={`sm:text-md mt-10 px-[30px] md:px-[50px] py-[6px] text-2xl  transition-all outline-none duration-200 rounded-md bg-blue-600 active:bg-blue-700 sm:hover:bg-blue-700 text-white font-bold uppercase ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
         {loading ? "Verifying..." : "Verify"}
      </button>
    </div>
  );
};

export default VerifyEmail;

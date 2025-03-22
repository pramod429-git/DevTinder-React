import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const verifyPayment = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });
    if (res.data.isPremium) {
      setIsPremiumUser(true);
    }
  };
  useEffect(() => {
    verifyPayment();
  }, []);
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipAmount: type },
      { withCredentials: true }
    );
    const { keyId, amount, currency, order_id, notes } = order.data;
    console.log(order);
    const options = {
      key: keyId, // Replace with your Razorpay key_id
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Dev Tinder",
      description: "Discuss with developers",
      order_id, // This is the order_id created in the backend
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPayment,
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return isPremiumUser ? (
    "You are already premium user"
  ) : (
    <div className="flex w-full flex-col lg:flex-row p-5">
      <div className="card bg-base-300 rounded-box grid h-60 grow place-items-center text-3xl font-serif">
        Silver
        <div className="text-base">
          <ul>
            <li>- 3 months unlimited Chat</li>
            <li>- 100 Request per day</li>
            <li>- screen Timing 1 hr per day</li>
            <li>- Blue Tick for 3 months</li>
          </ul>
        </div>
        <div>
          <button
            className="text-lg bg-secondary p-3 rounded-lg"
            onClick={() => {
              handleBuyClick("silver");
            }}
          >
            Silver
          </button>
        </div>
      </div>
      <div className="divider lg:divider-horizontal">OR</div>
      <div className="card bg-base-300 rounded-box grid h-60 grow place-items-center text-3xl font-serif">
        Gold
        <div className="text-base">
          <ul>
            <li>- unlimited Chat</li>
            <li>- 500 Request per day</li>
            <li>- unlimited screen Timing per day</li>
            <li>- Blue Tick for 6 months</li>
          </ul>
        </div>
        <div>
          <button
            className="text-lg bg-primary p-3 rounded-lg"
            onClick={() => {
              handleBuyClick("gold");
            }}
          >
            Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;

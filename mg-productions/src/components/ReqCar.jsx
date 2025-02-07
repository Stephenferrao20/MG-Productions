import { useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import PropTypes from 'prop-types';
import axios from 'axios';

function ReqCard({ request }) {


const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// In your component's useEffect:
useEffect(() => {
  loadRazorpayScript().then((loaded) => {
    if (!loaded) {
      alert("Razorpay SDK failed to load. Are you online?");
    }
  });
}, []);

useEffect(() =>{},[request])

  const handlePayment = async () => {
    const options = {
      key: "rzp_test_u2nOWe757arb2C",  // Replace with your actual key
      amount: request.orderAmount, // amount in paise (e.g., 100 paise for 1 rupee)
      currency: request.currency,
      order_id: request.orderId,
      name: "MG Productions",
      description: "Payment for requested music",
      handler: async function (response) {
        try {
          // Verify payment on the backend. Pass along the request id.
          console.log("Razorpay response:", response);
          const verifyResponse = await axios.post("http://localhost:4000/api/payment/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            requestId: request._id,
          });
          if (verifyResponse.data.success) {
            alert("Payment successful!");

            // Optionally, update local state or refresh data so that the request shows as paid.
          } else {
            alert("Payment verification failed.");
          }
        } catch (err) {
          console.error("Payment verification error:", err);
          alert("Error verifying payment.");
        }
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <article className="rounded-xl bg-white p-4 m-4 ring ring-indigo-50 sm:p-6 lg:p-8">
      <div className="flex items-center sm:gap-8 w-full">
        {request.isPaid ? (
          <div className='items-center w-full'>
            <a
              href={request.musicURL || ''}
              download
              className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
            >
              Download
            </a>
            <h3 className="mt-4 text-lg font-medium sm:text-xl">
              {request.name || 'Unknown Title'}
            </h3>
            <AudioPlayer
              src={request.musicURL || ''}
              onPlay={() => console.log('Playing music:', request.name)}
              autoPlay={false}
              showSkipControls={false}
              showJumpControls={false}
            className='w-full'
            />
          </div>
        ) : (
          <div className="h-full w-full flex flex-col">
            <p className="text-xl text-black p-2">
              Pay to access the requested music (₹{request.price})
            </p>
            <button
              onClick={handlePayment}
              className="bg-indigo-700 text-white text-xl p-2"
            >
              Pay Now
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

ReqCard.propTypes = {
  request: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string,
    musicURL: PropTypes.string,
    orderId: PropTypes.string,
    orderAmount: PropTypes.number,
    currency: PropTypes.string,
    price: PropTypes.number,
    isPaid: PropTypes.bool,
  }),
};

ReqCard.defaultProps = {
  request: {
    name: 'Unknown Title',
    musicURL: '',
    price: 0,
    isPaid: false,
  },
};

export default ReqCard;

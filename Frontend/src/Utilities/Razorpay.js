import axios from "axios";


  const BASEURL = import.meta.env.VITE_BASEURL;
   






    const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const openRazorpay = async ( token,user) => {
  try {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const { data: order } = await axios.post(
      `${BASEURL}/payment/create-order`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const options = {
      key: import.meta.env.VITE_RAZOR_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "Resumi",
      description: "Unlock unlimited candidate emails",
      order_id: order.id,
      handler: async function (response) {
        await axios.post(`${BASEURL}/payment/verify-payment`, response, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Payment Successful! You can now send unlimited emails.");
      },
      prefill: {
        email:user.email,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  } catch (error) {
    console.error("Razorpay Error:", error);
  }
};


export default openRazorpay;
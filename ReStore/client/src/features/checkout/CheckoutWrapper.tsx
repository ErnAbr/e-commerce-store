import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OMnkFFIaoBS7GQ3xlQ9glLpy5mF5D0dWmBTDijHZPNSzJImnj1COEPrc40q3ly6ffFSLBlmH1N1UNUKihu2WwpS00attsJIMn"
);

export default function CheckoutWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
}

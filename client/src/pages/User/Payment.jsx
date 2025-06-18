import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [paying, setPaying] = useState(false);

  // Format card number as XXXX-XXXX-XXXX-XXXX
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    value = value.slice(0, 16); // Max 16 digits
    let formatted =
      value
        .match(/.{1,4}/g)
        ?.join("-")
        .substr(0, 19) || "";
    setCardNumber(formatted);
  };

  // Format expiry as MM/YY
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    value = value.slice(0, 4); // Max 4 digits
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiry(value);
  };

  const handlePay = (e) => {
    e.preventDefault();
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      alert("Payment successful!");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto h-[85vh] flex flex-col items-center justify-center px-1 py-4">
      {/* Back button above the card, clearly visible */}
      <div className="w-full flex justify-start mb-2">
        <button
          className="flex text-sm items-center gap-1 text-primary cursor-pointer"
          onClick={() => navigate("/dashboard/search")}
        >
          <span className="text-sm">&larr;</span> Back to Search
        </button>
      </div>
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-5 sm:p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Payment</h2>
        {book ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <img
                src={book.image || book.coverUrl}
                alt={book.title}
                className="w-24 h-32 object-cover rounded-md shadow"
              />
            </div>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <strong>Title:</strong> {book.title}
              </p>
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Category:</strong> {book.categoryTitle || book.category}
              </p>
              <p>
                <strong>Price:</strong> ₦ {book.price} {/* Add price here */}
              </p>
            </div>
            {/* Card form */}
            <form className="space-y-3 mt-4" onSubmit={handlePay}>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Card Number"
                value={cardNumber}
                onChange={handleCardNumberChange}
                required
                maxLength={19} // 16 digits + 3 dashes
                inputMode="numeric"
                autoComplete="cc-number"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  className="w-full sm:w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={handleExpiryChange}
                  required
                  maxLength={5} // 4 digits + 1 slash
                  inputMode="numeric"
                  autoComplete="cc-exp"
                />
                <input
                  type="text"
                  className="w-full sm:w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="CVC"
                  value={cvc}
                  onChange={(e) =>
                    setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  required
                  maxLength={3}
                  inputMode="numeric"
                  autoComplete="cc-csc"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md cursor-pointer transition-colors duration-200"
                disabled={paying}
              >
                {paying
                  ? "Processing..."
                  : `Pay ₦${book?.price ? book.price : ""}`}
              </button>
            </form>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No book selected for payment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Payment;

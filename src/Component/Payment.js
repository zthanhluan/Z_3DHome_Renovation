// // import React, { useState } from "react";

// // const PaymentPage = () => {
// //   const [amount, setAmount] = useState("");
// //   const [orderId, setOrderId] = useState("");
// //   const [transactions, setTransactions] = useState([]);

// //   const handleAmountChange = (event) => {
// //     setAmount(event.target.value);
// //   };

// //   const handleOrderIdChange = (event) => {
// //     setOrderId(event.target.value);
// //   };

// //   const handlePayment = async (event) => {
// //     event.preventDefault();

// //     try {
// //       // initiate transaction using JazzCash API
// //       const response = await fetch("/api/ApplicationAPI/API/Payment/DoTransaction", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           amount: amount,
// //           orderId: orderId,
// //           transactionType: "Payment",
// //           token: "YOUR_JAZZCASH_API_TOKEN",
// //         }),
// //       });
// //       const data = await response.json();
// //       console.log("JazzCash API response:", data);

// //       // handle response from JazzCash API
// //       if (data.ResponseCode === "000") {
// //         // payment was successful
// //         console.log("Payment successful");
// //         // save transaction details in state
// //         const transaction = {
// //           orderId: orderId,
// //           amount: amount,
// //           status: "success",
// //           transactionId: data.TransactionID,
// //           transactionDate: new Date().toISOString(),
// //         };
// //         setTransactions([...transactions, transaction]);
// //       } else {
// //         // payment failed
// //         console.log("Payment failed");
// //         // save transaction details in state
// //         const transaction = {
// //           orderId: orderId,
// //           amount: amount,
// //           status: "failed",
// //           transactionId: data.TransactionID,
// //           transactionDate: new Date().toISOString(),
// //         };
// //         setTransactions([...transactions, transaction]);
// //       }
// //     } catch (error) {
// //       console.error("Error making payment:", error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Make a Payment</h1>
// //       <form onSubmit={handlePayment}>
// //         <div>
// //           <label>Amount:</label>
// //           <input type="number" value={amount} onChange={handleAmountChange} />
// //         </div>
// //         <div>
// //           <label>Order ID:</label>
// //           <input type="text" value={orderId} onChange={handleOrderIdChange} />
// //         </div>
// //         <button type="submit">Pay with JazzCash</button>
// //       </form>

// //       <h2>Transactions</h2>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Order ID</th>
// //             <th>Amount</th>
// //             <th>Status</th>
// //             <th>Transaction ID</th>
// //             <th>Transaction Date</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {transactions.map((transaction) => (
// //             <tr key={transaction.transactionId}>
// //               <td>{transaction.orderId}</td>
// //               <td>{transaction.amount}</td>
// //               <td>{transaction.status}</td>
// //               <td>{transaction.transactionId}</td>
// //               <td>{transaction.transactionDate}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default PaymentPage;

// import React, { useState } from 'react';
// import Jazzcash from 'jazzcash-checkout';



// function PaymentPage() {
//   const [paymentStatus, setPaymentStatus] = useState('pending');
//   const productModel = { productName: 'Product 1', productPrice: '100' };
//   const integritySalt = 'z0tuxsb14f';
//   const merchantID = 'MC56744';
//   const merchantPassword = '0hgvye2f79';
//   const cnic = "345678"
//   const mobileNumber = "03123456789"
//   const transactionUrl = 'Your Return Url';

//   const payViaJazzCash = () => {
//     Jazzcash.credentials({
//       config: {
//         merchantId: merchantID,
//         password: merchantPassword,
//         hashKey: integritySalt,
//       },
//       environment: 'sandbox'
//     });

//     Jazzcash.setData({
//       pp_Amount: parseInt(productModel.productPrice) * 100,
//       pp_BillReference: `refbill${Date.now()}`,
//       pp_MobileNumber:mobileNumber,
//       pp_Description: `Product details  ${productModel.productName} - ${productModel.productPrice}`,
//       pp_CNIC:cnic,
//     });

//     Jazzcash.createRequest('WALLET').then((res) => {
//       console.log(res);
//       setPaymentStatus('completed');
//     }).catch((err) => {
//       console.error(err);
//       setPaymentStatus('failed');
//     });
//   };



//   return (
//     <div>
//       <h1>Jazzcash React Example</h1>
//       <div>
//         <p>Product Name: {productModel.productName}</p>
//         <p>Product Price: {productModel.productPrice}</p>
//         {paymentStatus === 'pending' && (
//           <button onClick={payViaJazzCash}>Purchase Now !</button>
//         )}
//         {paymentStatus === 'completed' && <p>Payment completed successfully!</p>}
//         {paymentStatus === 'failed' && <p>Payment failed, please try again later.</p>}
//       </div>
//     </div>
//   );
// }

// export default PaymentPage;

import Payment from './Payment';
import React, { useEffect } from 'react';
import GooglePayButton from '@google-pay/button-react'
const GooglePayBtn = () => {
  return <GooglePayButton
  environment="TEST"
  paymentRequest={{
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '100.00',
      currencyCode: 'USD',
      countryCode: 'US',
    },
  }}
  onLoadPaymentData={paymentRequest => {
    console.log('load payment data', paymentRequest);
  }}
/>
};

export default GooglePayBtn;
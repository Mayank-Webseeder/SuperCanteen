import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFetchBlob from 'react-native-blob-util';

export const generateAndSaveInvoice = async (order) => {
  try {
    if (!order || !order.orderId) {
      throw new Error('Invalid order data');
    }

 const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <style>
        html, body {
          background-color: white;
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }

        .invoice-container {
          padding: 20px;
          width: 100%;
          box-sizing: border-box;
          background-color: white;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
        }

        h2 {
          margin: 0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }

        th, td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        .section {
          margin-bottom: 25px;
        }

        .section h3 {
          margin-bottom: 10px;
          font-size: 16px;
          border-bottom: 1px solid #ccc;
          padding-bottom: 5px;
        }

        .summary-row, .total-row {
          display: flex;
          justify-content: space-between;
          margin: 5px 0;
        }

        .total-row {
          font-weight: bold;
          font-size: 16px;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <!-- Header -->
        <div class="header">
          <h2>Invoice #${order.orderId}</h2>
          <p>Date: ${new Date().toLocaleDateString()}</p>
        </div>

        <!-- Order Summary -->
        <div class="section">
          <h3>Order Summary</h3>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.orderItems.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.qty}</td>
                  <td>₹${item.price.toFixed(2)}</td>
                  <td>₹${(item.price * item.qty).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Payment Summary -->
        <div class="section">
          <h3>Payment Summary</h3>
          <div class="summary-row"><span>Subtotal:</span><span>₹${order.itemsPrice.toFixed(2)}</span></div>
          <div class="summary-row"><span>Shipping:</span><span>₹${order.shippingPrice.toFixed(2)}</span></div>
          <div class="summary-row"><span>Tax:</span><span>₹${order.taxPrice.toFixed(2)}</span></div>
          <div class="total-row"><span>Total:</span><span>₹${order.totalPrice.toFixed(2)}</span></div>
        </div>

        <!-- Delivery Info -->
        <div class="section">
          <h3>Delivery Information</h3>
          <p><strong>Name:</strong> ${order.shippingAddress.name}</p>
          <p><strong>Address:</strong> ${order.shippingAddress.address}</p>
          <p><strong>City/State:</strong> ${order.shippingAddress.city}, ${order.shippingAddress.state}</p>
        </div>
      </div>
    </body>
  </html>
`;


    const options = {
      html: htmlContent,
      fileName: `Invoice_${order.orderId}`,
      directory: 'Download',
    };

    const file = await RNHTMLtoPDF.convert(options);
    return file.filePath; // this is the full path to the saved PDF

  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  }
};

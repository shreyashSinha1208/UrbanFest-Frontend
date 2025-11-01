import React, { forwardRef } from 'react';
import html2pdf from 'html2pdf.js';
const InvoiceTemplate = forwardRef(({ order, formatDate }, ref) => {


  const subtotal = order.cartItems.reduce((sum, item) => 
    sum + (item.quantity * item.productId.price), 0
  );

  const discount = subtotal * 0.10;
  const deliveryFee = subtotal < 10000 ? 200 : 0;
  const finalTotal = subtotal - discount + deliveryFee;
  
  return (
    <div ref={ref}>
      <div className="invoice-header">
        <h1 className="invoice-title">INVOICE</h1>
        <div className="invoice-details">
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Order Date:</strong> {formatDate(order.date)}</p>
          <p><strong>Status:</strong> {order.status ? 'Paid' : 'Payment Failed'}</p>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.cartItems.map((item, i) => (
            <tr key={i}>
              <td>{item.productId.name}</td>
              <td>{item.size}</td>
              <td>{item.quantity}</td>
              <td>₹{parseInt(item.productId.price).toLocaleString('en-IN')}</td>
              <td>₹{(item.quantity * item.productId.price).toLocaleString('en-IN')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-section">
        <div className="calculation-row">
          <span>Subtotal:</span>
          <span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="calculation-row discount">
          <span>Discount (10%):</span>
          <span>- ₹{discount.toLocaleString('en-IN')}</span>
        </div>
        <div className="calculation-row">
          <span>Delivery Fee:</span>
          <span className={deliveryFee === 0 ? 'free-delivery' : ''}>
            ₹{deliveryFee.toLocaleString('en-IN')} {deliveryFee === 0 && '(Free)'}
          </span>
        </div>
        <div className="total">
          Total: ₹{finalTotal.toLocaleString('en-IN')}
        </div>
      </div>
      <div className="footer">
        <p>Thank you for your purchase!</p>
        <p>For any queries, please contact our customer support.</p>
      </div>
    </div>
  );
});

InvoiceTemplate.displayName = 'InvoiceTemplate';

export default InvoiceTemplate;

export const handlePrint = async (order, formatDate, printContentRef) => {
  const printContent = printContentRef;
  
  // Check if device is mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    // For mobile: Generate PDF and download
    try {
      const element = document.createElement('div');
      element.style.padding = '40px';
      element.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      element.innerHTML = `
        <style>
          .invoice-header { 
            border-bottom: 3px solid #B88E2F; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
          }
          .invoice-title { 
            color: #B88E2F; 
            font-size: 32px; 
            font-weight: 700; 
            margin-bottom: 10px;
          }
          .invoice-details { 
            color: #4a5568; 
            font-size: 14px; 
          }
          .invoice-details p { margin: 5px 0; }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 30px 0; 
          }
          th, td { 
            padding: 12px; 
            text-align: left; 
            border-bottom: 1px solid #e2e8f0; 
          }
          th { 
            background-color: #f7fafc; 
            font-weight: 600;
            color: #2d3748;
            font-size: 14px;
          }
          td { font-size: 14px; color: #4a5568; }
          .total-section { 
            margin-top: 30px; 
            padding-top: 20px; 
            border-top: 2px solid #e2e8f0;
          }
          .calculation-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            font-size: 15px;
            color: #4a5568;
          }
          .calculation-row.discount { color: #16a34a; font-weight: 500; }
          .calculation-row .free-delivery { color: #16a34a; font-weight: 500; }
          .total { 
            font-size: 20px; 
            font-weight: 700; 
            text-align: right; 
            color: #B88E2F;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 2px solid #e2e8f0;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            color: #718096;
            font-size: 12px;
          }
          .footer p { margin: 5px 0; }
        </style>
        ${printContent.innerHTML}
      `;
      
      document.body.appendChild(element);
      
      const opt = {
        margin: 10,
        filename: `Invoice-${order.orderId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      await html2pdf().set(opt).from(element).save();
      document.body.removeChild(element);
    } catch (error) {
      console.error('PDF generation failed:', error);
      // Fallback to print dialog
      window.print();
    }
  } else {
    // For desktop: Open print dialog
    const winPrint = window.open('', '', 'width=800,height=600');
    winPrint.document.write(`
      <html>
        <head>
          <title>Invoice - ${order.orderId}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
              padding: 40px; 
              color: #1a202c;
              line-height: 1.6;
            }
            .invoice-header { 
              border-bottom: 3px solid #B88E2F; 
              padding-bottom: 20px; 
              margin-bottom: 30px; 
            }
            .invoice-title { 
              color: #B88E2F; 
              font-size: 32px; 
              font-weight: 700; 
              margin-bottom: 10px;
              letter-spacing: -0.5px;
            }
            .invoice-details { 
              color: #4a5568; 
              font-size: 14px; 
            }
            .invoice-details p {
              margin: 5px 0;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 30px 0; 
            }
            th, td { 
              padding: 12px; 
              text-align: left; 
              border-bottom: 1px solid #e2e8f0; 
            }
            th { 
              background-color: #f7fafc; 
              font-weight: 600;
              color: #2d3748;
              font-size: 14px;
            }
            td {
              font-size: 14px;
              color: #4a5568;
            }
            .total-section { 
              margin-top: 30px; 
              padding-top: 20px; 
              border-top: 2px solid #e2e8f0;
            }
            .calculation-row {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              font-size: 15px;
              color: #4a5568;
            }
            .calculation-row.discount {
              color: #16a34a;
              font-weight: 500;
            }
            .calculation-row .free-delivery {
              color: #16a34a;
              font-weight: 500;
            }
            .total { 
              font-size: 20px; 
              font-weight: 700; 
              text-align: right; 
              color: #B88E2F;
              margin-top: 15px;
              padding-top: 15px;
              border-top: 2px solid #e2e8f0;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              text-align: center;
              color: #718096;
              font-size: 12px;
            }
            .footer p {
              margin: 5px 0;
            }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
    winPrint.document.close();
    winPrint.focus();
    setTimeout(() => {
      winPrint.print();
      winPrint.close();
    }, 250);
  }
};
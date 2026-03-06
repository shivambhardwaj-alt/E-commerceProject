import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets, winterProducts } from '../assets/assets';

const Order = () => {
  const { currency } = useContext(ShopContext);
  
  const orders = [
    {
      _id: "order789",
      items: [
        {
          productId: "aaaab",
          variantId: "BLK-M",
          quantity: 2,
          price: 200
        },
        {
          productId: "bbbbb",
          variantId: "GRY-L",
          quantity: 1,
          price: 250
        }
      ],
      pricing: {
        subtotal: 650,
        discount: 50,
        shipping: 0,
        tax: 35,
        total: 635
      },
      payment: {
        method: "UPI",
        status: "Paid",
        transactionId: "txn123"
      },
      orderStatus: "Shipped",
      timeline: {
        orderedAt: 1716621345448,
        shippedAt: 1716621349999,
        deliveredAt: null
      }
    },
    {
      _id: "order788",
      items: [
        {
          productId: "ccccc",
          variantId: "BLK-XL",
          quantity: 1,
          price: 299
        }
      ],
      pricing: {
        subtotal: 299,
        discount: 0,
        shipping: 0,
        tax: 18,
        total: 317
      },
      payment: {
        method: "Card",
        status: "Paid",
        transactionId: "txn122"
      },
      orderStatus: "Delivered",
      timeline: {
        orderedAt: 1716000000000,
        shippedAt: 1716200000000,
        deliveredAt: 1716400000000
      }
    }
  ];

  const getProduct = (productId) => winterProducts.find(p => p._id === productId);
  
  
  const formatDate = (timestamp) => new Date(timestamp).toLocaleDateString('en-IN');
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders</h1>
          <p className="text-lg text-gray-600">Track, return, or buy those winter clothes again</p>
        </div>

        {/* Orders List - Flipkart Style */}
        <div className="space-y-6">
          {orders.map((order) => (
            <section key={order._id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              
              {/* Order Header - Flipkart Blue Bar */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </span>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span>Order Date: {formatDate(order.timeline.orderedAt)}</span>
                    <span className="hidden sm:block">Order Total: {currency === 'INR' ? '₹' : '$'}{order.pricing.total}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item, idx) => {
                    const product = getProduct(item.productId);
                    return (
                      <div key={idx} className="flex gap-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 p-3 rounded-lg">
                        <div className="w-20 h-24 flex-shrink-0">
                          <img 
                            src={product?.image?.[0] || assets.placeholder} 
                            alt={product?.name}
                            className="w-full h-full object-contain rounded-lg border"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-base line-clamp-2 mb-1">
                            {product?.name || `Winter ${item.variantId} Item`}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Size/Color: <span className="font-medium">{item.variantId}</span> • 
                            Qty: <span className="font-medium">{item.quantity}</span>
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-gray-900">
                              {currency === 'INR' ? '₹' : '$'}{item.price * item.quantity}
                            </p>
                            <div className="flex items-center gap-2">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Buy Again</button>
                              <span className="w-px h-4 bg-gray-300"></span>
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Invoice</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Footer - Pricing & Actions */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-lg">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                  
                  {/* Pricing Breakdown */}
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({order.items.length} items):</span>
                      <span className="font-semibold">{currency === 'INR' ? '₹' : '$'}{order.pricing.subtotal}</span>
                    </div>
                    {order.pricing.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                        <span>-{currency === 'INR' ? '₹' : '$'}{order.pricing.discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span>{currency === 'INR' ? '₹' : '$'}{order.pricing.shipping}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax:</span>
                      <span>{currency === 'INR' ? '₹' : '$'}{order.pricing.tax}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total:</span>
                        <span>{currency === 'INR' ? '₹' : '$'}{order.pricing.total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="px-6 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-md text-sm font-medium transition-colors">
                      Track Order
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-sm font-semibold transition-colors">
                      Order Details
                    </button>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500 flex flex-wrap items-center justify-between">
                  <span>Paid via {order.payment.method} • {order.payment.status}</span>
                  <span className="font-mono">TXN: {order.payment.transactionId}</span>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-24 border-2 border-dashed border-gray-200 rounded-3xl bg-white">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">📦</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-8 max-w-sm mx-auto">
              Your winter clothing orders will show up here.
            </p>
            <a href="/" className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Continue Shopping
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;

import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Package, Truck, CheckCircle, XCircle, Calendar, Download, MapPin, Star } from 'lucide-react';
import InvoiceTemplate, { handlePrint } from './InvoiceTemplate';

export default function OrderCard({
          order,
          index,
          isExpanded,
          onToggle,
          onOpenRating,
          formatDate,
          formatShortDate,
          calculateDeliveredByDate,
          getOrderProgress
}) {
          const printContentRef = useRef(null);
          const progress = getOrderProgress(order.date);
          const firstThreeItems = order.cartItems.slice(0, 3);
          const remainingCount = order.cartItems.length - 3;
          const isDelivered = progress === 'delivered';

          const OrderTimeline = ({ order }) => {
                    const progress = getOrderProgress(order.date);
                    const orderedDate = new Date(order.date);

                    const shippedDate = new Date(orderedDate);
                    shippedDate.setDate(shippedDate.getDate() + 2);

                    const inTransitDate = new Date(orderedDate);
                    inTransitDate.setDate(inTransitDate.getDate() + 5);

                    const deliveredDate = calculateDeliveredByDate(order.date);

                    const stages = [
                              { key: 'ordered', label: 'Order Confirmed', date: orderedDate, icon: CheckCircle },
                              { key: 'shipped', label: 'Shipped', date: shippedDate, icon: Package },
                              { key: 'in-transit', label: 'In Transit', date: inTransitDate, icon: Truck },
                              { key: 'delivered', label: 'Delivered', date: deliveredDate, icon: MapPin }
                    ];

                    const stageOrder = ['ordered', 'shipped', 'in-transit', 'delivered'];
                    const currentStageIndex = stageOrder.indexOf(progress);

                    return (
                              <div className="py-8 px-4 tracking-tight sm:px-8">
                                        <div className="relative">
                                                  {/* Desktop Timeline */}
                                                  <div className="hidden sm:block">
                                                            <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200"></div>
                                                            <motion.div
                                                                      className="absolute top-6 left-0 h-0.5 bg-[#B88E2F]"
                                                                      initial={{ width: 0 }}
                                                                      animate={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
                                                                      transition={{ duration: 0.7, ease: "easeOut" }}
                                                            />

                                                            <div className="relative flex justify-between">
                                                                      {stages.map((stage, index) => {
                                                                                const Icon = stage.icon;
                                                                                const stageIndex = stageOrder.indexOf(stage.key);
                                                                                const isCompleted = stageIndex < currentStageIndex || (progress === 'delivered' && stage.key === 'delivered');
                                                                                const isCurrent = stage.key === progress && progress !== 'delivered';
                                                                                const isPending = stageIndex > currentStageIndex;

                                                                                return (
                                                                                          <motion.div
                                                                                                    key={stage.key}
                                                                                                    className="flex flex-col items-center flex-1"
                                                                                                    initial={{ opacity: 0, y: 20 }}
                                                                                                    animate={{ opacity: 1, y: 0 }}
                                                                                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                                                                          >
                                                                                                    <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 ${isCompleted
                                                                                                              ? 'bg-[#B88E2F] border-[#B88E2F] text-white'
                                                                                                              : isCurrent
                                                                                                                        ? 'bg-white border-2 border-[#B88E2F] text-[#B88E2F]'
                                                                                                                        : 'bg-white border-2 border-gray-300 text-gray-400'
                                                                                                              }`}>
                                                                                                              <Icon className="w-5 h-5" />
                                                                                                              {isCurrent && (
                                                                                                                        <span className="absolute inline-flex h-full w-full rounded-full border-2 border-[#B88E2F] animate-ping opacity-40"></span>
                                                                                                              )}
                                                                                                    </div>

                                                                                                    <div className="mt-3 text-center">
                                                                                                              <p className={`font-semibold text-sm ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>
                                                                                                                        {stage.label}
                                                                                                              </p>
                                                                                                              <p className={`text-xs mt-1 ${isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'}`}>
                                                                                                                        {formatShortDate(stage.date)}
                                                                                                              </p>
                                                                                                              {isCompleted && (
                                                                                                                        <p className="text-xs text-green-600 mt-1 font-medium">Completed</p>
                                                                                                              )}
                                                                                                              {isCurrent && (
                                                                                                                        <p className="text-xs text-[#B88E2F] mt-1 font-medium">In Progress</p>
                                                                                                              )}
                                                                                                    </div>
                                                                                          </motion.div>
                                                                                );
                                                                      })}
                                                            </div>
                                                  </div>

                                                  {/* Mobile Timeline */}
                                                  <div className="sm:hidden">
                                                            <div className="absolute top-0 left-6 h-full w-0.5 bg-gray-200"></div>
                                                            <motion.div
                                                                      className="absolute top-0 left-6 w-0.5 bg-[#B88E2F]"
                                                                      initial={{ height: 0 }}
                                                                      animate={{ height: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
                                                                      transition={{ duration: 0.7, ease: "easeOut" }}
                                                            />

                                                            <div className="relative space-y-6">
                                                                      {stages.map((stage, index) => {
                                                                                const Icon = stage.icon;
                                                                                const stageIndex = stageOrder.indexOf(stage.key);
                                                                                const isCompleted = stageIndex < currentStageIndex || (progress === 'delivered' && stage.key === 'delivered');
                                                                                const isCurrent = stage.key === progress && progress !== 'delivered';

                                                                                return (
                                                                                          <motion.div
                                                                                                    key={stage.key}
                                                                                                    className="flex items-start relative pl-16"
                                                                                                    initial={{ opacity: 0, x: -20 }}
                                                                                                    animate={{ opacity: 1, x: 0 }}
                                                                                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                                                                          >
                                                                                                    <div className={`absolute left-0 flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 ${isCompleted
                                                                                                              ? 'bg-[#B88E2F] border-[#B88E2F] text-white'
                                                                                                              : isCurrent
                                                                                                                        ? 'bg-white border-2 border-[#B88E2F] text-[#B88E2F]'
                                                                                                                        : 'bg-white border-2 border-gray-300 text-gray-400'
                                                                                                              }`}>
                                                                                                              <Icon className="w-5 h-5" />
                                                                                                              {isCurrent && (
                                                                                                                        <span className="absolute inline-flex h-full w-full rounded-full border-2 border-[#B88E2F] animate-ping opacity-40"></span>
                                                                                                              )}
                                                                                                    </div>

                                                                                                    <div>
                                                                                                              <p className={`font-semibold text-sm ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>
                                                                                                                        {stage.label}
                                                                                                              </p>
                                                                                                              <p className={`text-xs mt-1 ${isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'}`}>
                                                                                                                        {formatShortDate(stage.date)}
                                                                                                              </p>
                                                                                                              {isCompleted && (
                                                                                                                        <p className="text-xs text-green-600 mt-1 font-medium">Completed</p>
                                                                                                              )}
                                                                                                              {isCurrent && (
                                                                                                                        <p className="text-xs text-[#B88E2F] mt-1 font-medium">In Progress</p>
                                                                                                              )}
                                                                                                    </div>
                                                                                          </motion.div>
                                                                                );
                                                                      })}
                                                            </div>
                                                  </div>
                                        </div>
                              </div>
                    );
          };

          return (
                    <motion.div
                              className="bg-white tracking-tight rounded-xl my-4 border border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05, duration: 0.3 }}
                              layout
                    >
                              {/* Order Header - Clickable */}
                              <motion.div
                                        onClick={onToggle}
                                        className="cursor-pointer p-4 lg:p-5 hover:bg-gray-50 transition-colors"
                                        whileHover={{ backgroundColor: 'rgba(249, 241, 231, 0.3)' }}
                                        whileTap={{ scale: 0.995 }}
                              >
                                        {/* Top Section: Order Info & Actions */}
                                        <div className="flex items-start justify-between mb-4 gap-3">
                                                  <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                                                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                                                                {firstThreeItems[0].productId.name} {order.cartItems.length > 1 && `+ ${order.cartItems.length - 1} more`}
                                                                      </h3>
                                                                      {!order.status && (
                                                                                <motion.span
                                                                                          className="px-2 py-0.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded"
                                                                                          initial={{ scale: 0 }}
                                                                                          animate={{ scale: 1 }}
                                                                                          transition={{ type: "spring", stiffness: 500 }}
                                                                                >
                                                                                          Payment Failed
                                                                                </motion.span>
                                                                      )}
                                                                      {order.status && isDelivered && (
                                                                                <motion.span
                                                                                          className="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded"
                                                                                          initial={{ scale: 0 }}
                                                                                          animate={{ scale: 1 }}
                                                                                          transition={{ type: "spring", stiffness: 500 }}
                                                                                >
                                                                                          Delivered
                                                                                </motion.span>
                                                                      )}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                      <Calendar className="w-4 h-4" />
                                                                      <span>{formatDate(order.date)}</span> <span>•</span>  {order.paymentMethod && <span className="capitalize">{order.paymentMethod}</span>}

                                                            </div>
                                                  </div>

                                                  <div className="flex items-center gap-2">
                                                            {order.status && (
                                                                      <motion.button
                                                                                onClick={async (e) => {
                                                                                          e.stopPropagation();
                                                                                          await handlePrint(order, formatDate, printContentRef.current);
                                                                                }}
                                                                                className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
                                                                                whileHover={{ scale: 1.05 }}
                                                                                whileTap={{ scale: 0.95 }}
                                                                      >
                                                                                <Download className="w-4 h-4" />
                                                                                <span className="hidden sm:inline">Invoice</span>
                                                                      </motion.button>
                                                            )}
                                                            <motion.div
                                                                      animate={{ rotate: isExpanded ? 180 : 0 }}
                                                                      transition={{ duration: 0.2 }}
                                                            >
                                                                      <ChevronDown className="w-5 h-5 text-gray-500" />
                                                            </motion.div>
                                                  </div>
                                        </div>

                                        {/* Product Preview Section */}
                                        <div className="flex items-center gap-4">
                                                  {/* Product Images */}
                                                  <div className="flex items-center -space-x-2">
                                                            {firstThreeItems.map((item, idx) => (
                                                                      <motion.div
                                                                                key={idx}
                                                                                className="relative"
                                                                                whileHover={{ scale: 1.1, zIndex: 10 }}
                                                                                transition={{ type: "spring", stiffness: 400 }}
                                                                      >
                                                                                {item.productId.img ? (
                                                                                          <a href={`/products/show/${item.productId?._id}`}>
                                                                                                    <img
                                                                                                              src={item.productId.img}
                                                                                                              alt={item.productId.name}
                                                                                                              className={`rounded-lg object-cover border-2 border-white shadow-sm ${order.cartItems.length > 3
                                                                                                                        ? 'w-10 h-14 sm:w-16 sm:h-16'
                                                                                                                        : 'w-14 h-14 sm:w-16 sm:h-16'
                                                                                                                        }`} />
                                                                                          </a>
                                                                                ) : (
                                                                                          <div
                                                                                                    className={`rounded-lg object-cover border-2 border-white shadow-sm ${order.cartItems.length > 3
                                                                                                              ? 'w-10 h-14 sm:w-16 sm:h-16'
                                                                                                              : 'w-14 h-14 sm:w-16 sm:h-16'
                                                                                                              }`}
                                                                                                    style={{ backgroundColor: item.color || '#e5e7eb' }}
                                                                                          />
                                                                                )}
                                                                      </motion.div>
                                                            ))}
                                                            {remainingCount > 0 && (
                                                                      <div className="w-10 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center">
                                                                                <span className="text-xs sm:text-sm font-semibold text-gray-600">
                                                                                          +{remainingCount}
                                                                                </span>
                                                                      </div>
                                                            )}
                                                  </div>

                                                  {/* Order Summary */}
                                                  <div className="flex-1 min-w-0">
                                                            <p className="text-sm text-gray-600 truncate">
                                                                      {order.cartItems.length} {order.cartItems.length === 1 ? 'item' : 'items'}
                                                            </p>
                                                            <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">
                                                                      ₹{parseInt(order.totalPrice).toLocaleString('en-IN')}
                                                            </p>
                                                  </div>

                                                  {order.paymentMethod && (
                                                            <div className="hidden justify-between items-center md:flex text-sm">
                                                                      <span className="text-gray-600 ">
                                                                                Payment Method: &nbsp;
                                                                      </span>
                                                                      <span className="font-medium text-gray-900 capitalize">
                                                                                {order.paymentMethod}
                                                                      </span>
                                                            </div>
                                                  )}

                                                  {/* Status Icon */}
                                                  <motion.div
                                                            className={`flex items-center justify-center w-8 h-8 rounded-full border ${order.status
                                                                      ? 'bg-green-50 border-green-200'
                                                                      : 'bg-red-50 border-red-200'
                                                                      }`}
                                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                                            transition={{ type: "spring", stiffness: 400 }}
                                                  >
                                                            {order.status ? (
                                                                      <CheckCircle className="w-5 h-5 text-green-600" />
                                                            ) : (
                                                                      <XCircle className="w-5 h-5 text-red-600" />
                                                            )}
                                                  </motion.div>
                                        </div>
                              </motion.div>

                              {/* Expanded Content */}
                              <AnimatePresence>
                                        {isExpanded && (
                                                  <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            className="overflow-hidden"
                                                  >
                                                            <div className="border-t border-gray-200">
                                                                      {/* Timeline - Only for successful orders */}
                                                                      {order.status && (
                                                                                <motion.div
                                                                                          className="bg-gray-50 border-b border-gray-200"
                                                                                          initial={{ opacity: 0 }}
                                                                                          animate={{ opacity: 1 }}
                                                                                          transition={{ delay: 0.1 }}
                                                                                >
                                                                                          <OrderTimeline order={order} />
                                                                                </motion.div>
                                                                      )}

                                                                      {/* Items List */}
                                                                      <motion.div
                                                                                className="p-4 sm:p-6"
                                                                                initial={{ opacity: 0, y: 10 }}
                                                                                animate={{ opacity: 1, y: 0 }}
                                                                                transition={{ delay: 0.2 }}
                                                                      >
                                                                                <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                                                                                          Order Items
                                                                                </h4>
                                                                                <div className="space-y-3">
                                                                                          {order.cartItems.map((item, itemIndex) => (
                                                                                                    <motion.div
                                                                                                              key={itemIndex}
                                                                                                              className="flex items-center gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                                                                                                              initial={{ opacity: 0, x: -20 }}
                                                                                                              animate={{ opacity: 1, x: 0 }}
                                                                                                              transition={{ delay: 0.3 + itemIndex * 0.05 }}
                                                                                                              whileHover={{ scale: 1.01 }}
                                                                                                    >
                                                                                                              {/* Product Image */}

                                                                                                              <motion.div
                                                                                                                        className="flex-shrink-0"
                                                                                                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                                                                                              >

                                                                                                                        {item.productId.img ? (
                                                                                                                                  <a href={`/products/show/${item.productId?._id}`}>
                                                                                                                                            <img
                                                                                                                                                      src={item.productId.img}
                                                                                                                                                      alt={item.productId.name}
                                                                                                                                                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-gray-200"
                                                                                                                                            />
                                                                                                                                  </a>
                                                                                                                        ) : (
                                                                                                                                  <div
                                                                                                                                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg border border-gray-200"
                                                                                                                                            style={{ backgroundColor: item.color || '#e5e7eb' }}
                                                                                                                                  />
                                                                                                                        )}

                                                                                                              </motion.div>

                                                                                                              {/* Product Details */}
                                                                                                              <div className="flex-1 min-w-0">
                                                                                                                        <p className="font-medium text-gray-900 tracking-tight text-sm sm:text-base truncate">
                                                                                                                                  {item.productId.name}
                                                                                                                        </p>
                                                                                                                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                                                                                                                                  Size: {item.size} • Qty: {item.quantity} • Color:
                                                                                                                                  <span
                                                                                                                                            className="w-3 h-3 rounded-full inline-block ml-1 align-middle"
                                                                                                                                            style={{ backgroundColor: item.color || '#e5e7eb' }}
                                                                                                                                  ></span>
                                                                                                                        </p>

                                                                                                                        <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                                                                                                                                  ₹{parseInt(item.productId.price).toLocaleString('en-IN')} each
                                                                                                                        </p>
                                                                                                              </div>

                                                                                                              {/* Price and Rating Button */}
                                                                                                              <div className="text-right flex flex-col items-end gap-2">
                                                                                                                        <p className="font-semibold text-gray-900 text-sm sm:text-base whitespace-nowrap">
                                                                                                                                  ₹{(item.quantity * item.productId.price).toLocaleString('en-IN')}
                                                                                                                        </p>
                                                                                                                        {isDelivered && !item.reviewId && (
                                                                                                                                  <motion.button
                                                                                                                                            onClick={(e) => {
                                                                                                                                                      e.stopPropagation();
                                                                                                                                                      onOpenRating(item, order.orderId);
                                                                                                                                            }}
                                                                                                                                            className="flex items-center gap-1 px-3 py-1.5 bg-[#B88E2F] text-white text-xs font-medium rounded hover:bg-[#a07a28] transition-colors"
                                                                                                                                            whileHover={{ scale: 1.05 }}
                                                                                                                                            whileTap={{ scale: 0.95 }}
                                                                                                                                  >
                                                                                                                                            <Star className="w-3 h-3" />
                                                                                                                                            Rate
                                                                                                                                  </motion.button>
                                                                                                                        )}
                                                                                                                        {isDelivered && item.reviewId && (
                                                                                                                                  <div className="flex flex-col items-end gap-2">
                                                                                                                                            {/* Star rating */}
                                                                                                                                            <div className="flex items-center gap-1">
                                                                                                                                                      {[...Array(5)].map((_, i) => (
                                                                                                                                                                <Star
                                                                                                                                                                          key={i}
                                                                                                                                                                          className={`w-3 h-3 ${i < item.reviewId.rating
                                                                                                                                                                                    ? 'fill-yellow-400 text-yellow-400'
                                                                                                                                                                                    : 'text-gray-300'
                                                                                                                                                                                    }`}
                                                                                                                                                                />
                                                                                                                                                      ))}
                                                                                                                                            </div>

                                                                                                                                            {/* Review text preview */}
                                                                                                                                            {/* {item.reviewId.reviewText && (
                                                                                                                                                      <p className="text-xs text-gray-600 italic max-w-[200px] truncate">
                                                                                                                                                                "{item.reviewId.reviewText}"
                                                                                                                                                      </p>
                                                                                                                                            )} */}
                                                                                                                                  </div>
                                                                                                                        )}
                                                                                                              </div>
                                                                                                    </motion.div>
                                                                                          ))}
                                                                                </div>

                                                                                {/* Order Summary */}
                                                                                <motion.div
                                                                                          className="mt-6 pt-6 border-t border-gray-200"
                                                                                          initial={{ opacity: 0 }}
                                                                                          animate={{ opacity: 1 }}
                                                                                          transition={{ delay: 0.4 }}
                                                                                >
                                                                                          <div className="flex justify-between items-center">
                                                                                                    <span className="text-base font-semibold text-gray-900">
                                                                                                              Total Amount
                                                                                                    </span>
                                                                                                    <span className="text-xl font-bold text-gray-900">
                                                                                                              ₹{parseInt(order.totalPrice).toLocaleString('en-IN')}
                                                                                                    </span>
                                                                                          </div>
                                                                                          {order.status && !isDelivered && (
                                                                                                    <p className="text-sm text-gray-600 mt-3 text-right">
                                                                                                              Expected delivery by {formatDate(calculateDeliveredByDate(order.date))}
                                                                                                    </p>
                                                                                          )}
                                                                                </motion.div>
                                                                      </motion.div>
                                                            </div>
                                                  </motion.div>
                                        )}
                              </AnimatePresence>

                              {/* Hidden print content */}
                              <div className="hidden">
                                        <InvoiceTemplate
                                                  ref={printContentRef}
                                                  order={order}
                                                  formatDate={formatDate}
                                        />
                              </div>
                    </motion.div>
          );
}
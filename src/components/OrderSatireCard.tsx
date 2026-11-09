import React, { useState } from 'react';
import { Package, Truck, MessageSquare, AlertCircle, RefreshCw, X, Send } from 'lucide-react';
import { TimeBreakdown } from '../types';

interface OrderSatireCardProps {
  timeData: TimeBreakdown;
}

interface ChatMessage {
  sender: 'eddie' | 'support';
  text: string;
  time: string;
}

export const OrderSatireCard: React.FC<OrderSatireCardProps> = ({ timeData }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: 'support',
      text: "Hello Eddie! Thank you for contacting Apple Priority Support. I see your order for the iPhone Duo placed on 10/16/2026 08:04 EST. How can I assist your patience today?",
      time: '08:05 EST',
    },
    {
      sender: 'eddie',
      text: "Where is my iPhone Duo? It's been over 24 days!",
      time: 'Just now',
    },
    {
      sender: 'support',
      text: "We hear you! Our artisans are currently hand-forging the dual titanium hinge with the courage of 10,000 engineers. Your order is safely in Stage 1 'Processing' status.",
      time: 'Just now',
    },
  ]);
  const [deliveryNotification, setDeliveryNotification] = useState<string | null>(null);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;

    const newHistory: ChatMessage[] = [
      ...chatHistory,
      {
        sender: 'eddie',
        text: customMsg,
        time: 'Just now',
      },
    ];
    setChatHistory(newHistory);
    setCustomMsg('');

    // Canned humorous Apple support responses
    const responses = [
      "We've escalated this to Tim Cook's personal to-do list. He has acknowledged the vibe.",
      "The iPhone Duo requires a special dual-dimensional courier. Standard physics take time to warp.",
      "Good news: your credit card was successfully charged on October 16. The rest is a spiritual journey.",
      "Have you considered admiring the tracking page for another 48 hours? Studies show it makes the package travel 0.00% faster.",
      "Our supply chain is experiencing unprecedented elegance. We expect your tracking number to update in a future fiscal quarter.",
    ];
    const pickedResponse = responses[Math.floor(Math.random() * responses.length)];

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'support',
          text: pickedResponse,
          time: 'Just now',
        },
      ]);
    }, 600);
  };

  const handleCheckCarrier = () => {
    const statuses = [
      "Carrier Notice: Package was spotted taking a nap at the sorting facility in Louisville.",
      "Carrier Notice: Driver walked past Eddie's house, thought about ringing the bell, then drove away.",
      "Carrier Notice: Package status updated to 'In Limbo - Out for Soul-Searching'.",
      "Carrier Notice: Weather delay: Sunny with a 100% chance of continued waiting.",
      "Carrier Notice: Courier is waiting for the iPhone Duo 2 to be announced first.",
    ];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setDeliveryNotification(randomStatus);
    setTimeout(() => {
      setDeliveryNotification(null);
    }, 6000);
  };

  return (
    <section id="apple-order" className="py-12 px-6 max-w-6xl mx-auto border-t border-black">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-black">
            Official Store Dispatch
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-black mt-1">
            Order Status: #W10162026-DUO-EDDIE
          </h2>
        </div>
        <div className="text-xs font-mono text-black">
          <span>Placed: 10/16/2026 @ 08:04:00 EST</span>
        </div>
      </div>

      {/* Main Order Card */}
      <div className="border-2 border-black bg-white p-6 sm:p-8">
        {/* Product Headline Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-black gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 border border-black flex items-center justify-center shrink-0">
              <Package className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-black uppercase">
                Apple iPhone Duo (1TB · Space Black & Dual OLED)
              </h3>
              <p className="text-xs font-mono text-neutral-600 mt-0.5">
                Serial: <span className="text-black font-bold">UNASSIGNED-FACTORY-QUEUE-00921</span> · Engraving: &quot;Please ship to Eddie&quot;
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="border border-black px-3 py-1 text-xs font-bold uppercase tracking-wider bg-black text-white">
              Status: Still Processing
            </span>
          </div>
        </div>

        {/* 4-Stage Stepper Bar */}
        <div className="py-8 border-b border-black">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2 relative">
            {/* Step 1 */}
            <div className="border border-black p-3 bg-neutral-100">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-black">
                <span>01. ORDER PLACED</span>
                <span>✓</span>
              </div>
              <div className="text-xs font-mono mt-1 text-neutral-600">
                Oct 16, 2026 08:04 EST
              </div>
              <div className="text-[11px] text-black font-semibold mt-1">Payment Authorized</div>
            </div>

            {/* Step 2 (Active forever) */}
            <div className="border-2 border-black p-3 bg-black text-white">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span>02. PROCESSING</span>
                <span className="animate-spin text-xs">⟳</span>
              </div>
              <div className="text-xs font-mono mt-1 text-neutral-300">
                {timeData.days}d {timeData.hours}h elapsed
              </div>
              <div className="text-[11px] font-bold text-white mt-1">Stuck indefinitely</div>
            </div>

            {/* Step 3 */}
            <div className="border border-neutral-300 p-3 opacity-60">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-500">
                <span>03. PREPARING</span>
                <span>—</span>
              </div>
              <div className="text-xs font-mono mt-1 text-neutral-400">
                Pending factory signoff
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">Courier unassigned</div>
            </div>

            {/* Step 4 */}
            <div className="border border-neutral-300 p-3 opacity-60">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-500">
                <span>04. DELIVERED</span>
                <span>—</span>
              </div>
              <div className="text-xs font-mono mt-1 text-neutral-400">
                Estimated: Unknown
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">Eddie still waiting</div>
            </div>
          </div>
        </div>

        {/* Detailed Shipping Breakdown & Actions */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-black p-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 block mb-1">
              Delivery Method
            </span>
            <p className="text-sm font-bold text-black">Express Glacial Ground</p>
            <p className="text-xs text-neutral-600 mt-1 font-mono">
              Estimated transit duration: Until morale improves
            </p>
          </div>

          <div className="border border-black p-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 block mb-1">
              Package Contents
            </span>
            <p className="text-sm font-bold text-black">1x iPhone Duo Box (Theoretical)</p>
            <p className="text-xs text-neutral-600 mt-1 font-mono">
              Includes braided cable &amp; infinite patience
            </p>
          </div>

          <div className="border border-black p-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 block mb-1">
              Customer Notes
            </span>
            <p className="text-sm font-bold text-black">Eddie</p>
            <p className="text-xs text-neutral-600 mt-1 font-mono">
              Has checked mailbox 140+ times since 10/16
            </p>
          </div>
        </div>

        {/* Notification Toast */}
        {deliveryNotification && (
          <div className="mt-6 border-2 border-black bg-neutral-100 p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-black shrink-0" />
            <p className="text-xs font-mono font-bold text-black">{deliveryNotification}</p>
          </div>
        )}

        {/* Interactive Action Buttons */}
        <div className="mt-6 pt-6 border-t border-black flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border-2 border-black bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Pester Apple Support ({chatHistory.length} messages)</span>
          </button>

          <button
            onClick={handleCheckCarrier}
            className="flex items-center gap-2 px-4 py-2 border border-black bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <span>Ping Carrier Satellite</span>
          </button>
        </div>
      </div>

      {/* Support Chat Modal Drawer */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black w-full max-w-lg shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            {/* Modal Header */}
            <div className="bg-black text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-white inline-block"></span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  Apple Support · Order #W10162026-EDDIE
                </span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:opacity-75 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 max-h-80 overflow-y-auto space-y-3 font-mono text-xs">
              {chatHistory.map((item, i) => (
                <div
                  key={i}
                  className={`p-3 border ${
                    item.sender === 'eddie'
                      ? 'border-black bg-neutral-100 ml-8 text-black'
                      : 'border-black bg-white mr-8 text-black'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                    <span>{item.sender === 'eddie' ? 'Eddie (Customer)' : 'Apple Senior Advisor (Tim)'}</span>
                    <span>{item.time}</span>
                  </div>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendChat} className="p-4 border-t border-black flex gap-2">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Ask where Eddie's iPhone Duo is..."
                className="flex-1 border border-black px-3 py-2 text-xs font-mono text-black focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 cursor-pointer flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

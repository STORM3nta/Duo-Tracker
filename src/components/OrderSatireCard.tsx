import React, { useState } from 'react';
import { PackageCheck, CheckCircle2, MessageSquare, Send, X, Smartphone, Award } from 'lucide-react';

interface ChatMessage {
  sender: 'eddie' | 'support';
  text: string;
  time: string;
}

export const OrderSatireCard: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: 'support',
      text: "Apple Order Resolution Team: Ticket #W10162026-EDDIE is officially marked DELIVERED! We confirm the package was handed directly to Eddie on November 9, 2026 at 02:48 PM EST.",
      time: '14:48 EST',
    },
    {
      sender: 'eddie',
      text: "I HAVE IT! The dual screen is incredible. Was the 24-day wait worth it? Yes. Will I ever forgive you? Maybe.",
      time: '14:49 EST',
    },
    {
      sender: 'support',
      text: "That's what we call Courage™. Please peel the factory film at an exact 45-degree angle for maximum resonance.",
      time: '14:50 EST',
    },
  ]);

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

    const responses = [
      "Tim Cook says: 'Welcome to the fold, Eddie.'",
      "Notice how smooth that titanium hinge feels? That was 24 days of precision calibration.",
      "Now that Eddie has the iPhone Duo, rumors for iPhone Duo 2 can officially commence.",
      "Support Ticket Closed. Reason: Customer currently mesmerized by folding phone over and over.",
      "Reminder: The dual OLED displays require at least 8 hours of continuous awe today.",
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
    }, 500);
  };

  return (
    <section id="delivery-dossier" className="py-12 px-6 max-w-6xl mx-auto border-t border-black">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-black">
            Official Store Dispatch · Delivered
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-black mt-1">
            Order Receipt &amp; Proof of Delivery
          </h2>
        </div>
        <div className="text-xs font-mono text-black">
          <span>Final Disposition: <strong className="underline">SIGNED &amp; RECEIVED</strong></span>
        </div>
      </div>

      {/* Main Order Card */}
      <div className="border-2 border-black bg-white p-6 sm:p-8">
        {/* Product Headline Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-black gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 border-2 border-black bg-black text-white flex items-center justify-center shrink-0">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-black uppercase">
                  Apple iPhone Duo (1TB · Space Black &amp; Dual OLED)
                </h3>
              </div>
              <p className="text-xs font-mono text-neutral-600 mt-0.5">
                Order #W10162026-DUO-EDDIE · Serial #DUO-2026-EDDIE-FINAL · Engraving: &quot;Please ship to Eddie&quot;
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="border-2 border-black px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-black text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Delivered (Nov 9, 2026)</span>
            </span>
          </div>
        </div>

        {/* 4-Stage Stepper Bar: All Completed! */}
        <div className="py-8 border-b border-black">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2">
            {/* Step 1 */}
            <div className="border border-black p-3 bg-neutral-100">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-black">
                <span>01. ORDER PLACED</span>
                <span>✓</span>
              </div>
              <div className="text-xs font-mono mt-1 text-neutral-600">
                Oct 16, 2026 08:04 EST
              </div>
              <div className="text-[11px] text-black font-semibold mt-1">Payment Processed</div>
            </div>

            {/* Step 2 */}
            <div className="border border-black p-3 bg-neutral-100">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-black">
                <span>02. 24-DAY PROCESSING</span>
                <span>✓</span>
              </div>
              <div className="text-xs font-mono mt-1 text-neutral-600">
                Oct 16 – Nov 7
              </div>
              <div className="text-[11px] text-black font-semibold mt-1">Hinges Hand-Forged</div>
            </div>

            {/* Step 3 */}
            <div className="border border-black p-3 bg-neutral-100">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-black">
                <span>03. IN TRANSIT</span>
                <span>✓</span>
              </div>
              <div className="text-xs font-mono mt-1 text-neutral-600">
                Nov 8, 2026
              </div>
              <div className="text-[11px] text-black font-semibold mt-1">Courier Dispatched</div>
            </div>

            {/* Step 4 */}
            <div className="border-2 border-black p-3 bg-black text-white">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span>04. DELIVERED</span>
                <span>✓✓</span>
              </div>
              <div className="text-xs font-mono mt-1 text-neutral-300">
                Nov 9, 2026 14:48 EST
              </div>
              <div className="text-[11px] font-bold text-white mt-1">Possession Taken!</div>
            </div>
          </div>
        </div>

        {/* Detailed Delivery Proof */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-black p-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 block mb-1">
              Proof of Signature
            </span>
            <p className="text-sm font-bold text-black">Signed by: EDDIE</p>
            <p className="text-xs text-neutral-600 mt-1 font-mono">
              Courier note: &quot;Recipient was already standing on porch waiting.&quot;
            </p>
          </div>

          <div className="border border-black p-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 block mb-1">
              Package Disposition
            </span>
            <p className="text-sm font-bold text-black">Unboxed &amp; Activated</p>
            <p className="text-xs text-neutral-600 mt-1 font-mono">
              Dual screens: Flawless · Hinge: Snappy
            </p>
          </div>

          <div className="border border-black p-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 block mb-1">
              Customer Verdict
            </span>
            <p className="text-sm font-bold text-black">10/10 Patience Rewarded</p>
            <p className="text-xs text-neutral-600 mt-1 font-mono">
              Never doubt the shipment
            </p>
          </div>
        </div>

        {/* Chat / Support Button */}
        <div className="mt-6 pt-6 border-t border-black flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-black">
            <Award className="w-4 h-4 text-black" />
            <span>Apple Support Ticket #W10162026-EDDIE: RESOLVED</span>
          </div>

          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border-2 border-black bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>View Apple Support Transcript &amp; Chat</span>
          </button>
        </div>
      </div>

      {/* Support Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black w-full max-w-lg shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-black text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Apple Support Transcript · Ticket Resolved
                </span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:opacity-75 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

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
                    <span>{item.sender === 'eddie' ? 'Eddie' : 'Apple Support (Tim)'}</span>
                    <span>{item.time}</span>
                  </div>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="p-4 border-t border-black flex gap-2">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Ask about Eddie's new phone or celebrate..."
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

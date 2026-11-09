import React, { useState, useEffect } from 'react';
import { PartyPopper, Send, ThumbsUp, Sparkles } from 'lucide-react';
import { VictoryMessage } from '../types';

const INITIAL_MESSAGES: VictoryMessage[] = [
  {
    id: 'msg-1',
    author: 'Sam (The Apple Believer)',
    message: 'HE ACTUALLY GOT IT! Congratulations Eddie! May your hinge never creak and your battery never drain.',
    timestamp: 'Just now',
    upvotes: 49,
    tag: 'Victory',
  },
  {
    id: 'msg-2',
    author: 'Dave from IT',
    message: 'I can confirm: turning the tracking off and waiting 24 days finally worked! Enjoy the dual screen, legend.',
    timestamp: '15 mins ago',
    upvotes: 36,
    tag: 'Technical',
  },
  {
    id: 'msg-3',
    author: 'Elena',
    message: 'Now the real question: does it fold flat? Don’t let anyone breathe on it for the first 48 hours!',
    timestamp: '1 hour ago',
    upvotes: 28,
    tag: 'Celebration',
  },
  {
    id: 'msg-4',
    author: 'Marcus R.',
    message: '24 days of waiting for a phone you’ll look at 300 times a day. Worth every second. Congrats Eddie!',
    timestamp: '2 hours ago',
    upvotes: 21,
    tag: 'Support',
  },
];

const PRESETS = [
  "CONGRATS EDDIE! The wait is over!",
  "Please put a case on it immediately!",
  "How does the dual OLED screen look?",
  "We survived the great iPhone Duo wait of 2026!",
  "Don't drop it on the concrete today!",
];

export const SympathyWall: React.FC = () => {
  const [messages, setMessages] = useState<VictoryMessage[]>(() => {
    try {
      const saved = localStorage.getItem('eddie_iphone_duo_victory');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_MESSAGES;
  });

  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('eddie_iphone_duo_victory', JSON.stringify(messages));
    } catch {
      // Ignore
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMsg: VictoryMessage = {
      id: `msg-${Date.now()}`,
      author: author.trim() || 'Fellow Celebrant',
      message: text.trim(),
      timestamp: 'Just now',
      upvotes: 1,
      tag: 'Congrats',
    };

    setMessages([newMsg, ...messages]);
    setText('');
    setAuthor('');
  };

  const handleUpvote = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, upvotes: msg.upvotes + 1 } : msg))
    );
  };

  const handleUsePreset = (presetText: string) => {
    setText(presetText);
  };

  return (
    <section id="guestbook" className="py-12 px-6 max-w-6xl mx-auto border-t border-black">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-black mb-1">
            <PartyPopper className="w-3.5 h-3.5" />
            <span>Community Congratulations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-black">
            Congratulate Eddie On His Delivery!
          </h2>
          <p className="text-sm text-neutral-700 mt-1">
            He waited 24 days, 7 hours, and 44 minutes. Leave your congratulations, folding advice, or celebrate the arrival.
          </p>
        </div>
      </div>

      {/* Message Submission Form */}
      <div className="border-2 border-black p-6 mb-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs font-mono font-bold uppercase text-black mb-1">
                Your Name / Alias
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Relieved Friend"
                className="w-full border border-black p-2.5 text-xs font-mono text-black focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-black mb-1">
              Your Congratulatory Message for Eddie
            </label>
            <textarea
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Send Eddie some love for his shiny new iPhone Duo..."
              className="w-full border border-black p-2.5 text-xs font-mono text-black focus:outline-none"
            />
          </div>

          {/* Quick Presets */}
          <div>
            <span className="text-[11px] font-mono text-neutral-600 block mb-1.5">
              Quick celebratory tags:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleUsePreset(p)}
                  className="text-[11px] font-mono border border-black px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-black cursor-pointer transition-colors"
                >
                  &quot;{p}&quot;
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={!text.trim()}
              className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Congratulations</span>
            </button>
          </div>
        </form>
      </div>

      {/* Messages List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className="border border-black p-4 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-neutral-200 mb-2">
                <span className="font-bold text-black">{msg.author}</span>
                <span className="text-neutral-500">{msg.timestamp}</span>
              </div>
              <p className="text-xs text-black leading-relaxed font-sans">{msg.message}</p>
            </div>

            <div className="mt-4 pt-2 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-500 text-[11px] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-black" />
                <span>Celebration</span>
              </span>
              <button
                onClick={() => handleUpvote(msg.id)}
                className="flex items-center gap-1.5 border border-black px-2.5 py-1 text-[11px] font-bold text-black hover:bg-neutral-100 cursor-pointer transition-colors"
              >
                <ThumbsUp className="w-3 h-3" />
                <span>{msg.upvotes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

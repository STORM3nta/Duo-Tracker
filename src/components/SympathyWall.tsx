import React, { useState, useEffect } from 'react';
import { Heart, MessageSquarePlus, Send, ThumbsUp } from 'lucide-react';
import { SympathyMessage } from '../types';

const INITIAL_MESSAGES: SympathyMessage[] = [
  {
    id: 'msg-1',
    author: 'Sam (Fellow Apple Enthusiast)',
    message: 'Stay strong Eddie! It will make unboxing that dual display feel 100x sweeter.',
    timestamp: '2 hours ago',
    upvotes: 24,
  },
  {
    id: 'msg-2',
    author: 'Dave from IT',
    message: 'Have you tried turning the order status off and on again?',
    timestamp: 'Yesterday',
    upvotes: 42,
  },
  {
    id: 'msg-3',
    author: 'Elena',
    message: 'Maybe the real iPhone Duo was the patience you developed along the way.',
    timestamp: '3 days ago',
    upvotes: 38,
  },
  {
    id: 'msg-4',
    author: 'Marcus R.',
    message: 'Don’t worry Eddie, my iPhone 4 bumper case took 3 weeks in 2010. Tradition lives on!',
    timestamp: '4 days ago',
    upvotes: 19,
  },
];

const PRESETS = [
  "Stay strong Eddie! We believe in the shipment!",
  "Have you checked behind the porch bushes?",
  "Tim Cook is personally inspecting your screen hinge.",
  "At this rate the iPhone Duo 2 will beat it there.",
  "Sending thoughts, prayers, and tracking refreshes.",
];

export const SympathyWall: React.FC = () => {
  const [messages, setMessages] = useState<SympathyMessage[]>(() => {
    try {
      const saved = localStorage.getItem('eddie_iphone_duo_sympathy');
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
      localStorage.setItem('eddie_iphone_duo_sympathy', JSON.stringify(messages));
    } catch {
      // Ignore storage errors
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMsg: SympathyMessage = {
      id: `msg-${Date.now()}`,
      author: author.trim() || 'Anonymous Well-Wisher',
      message: text.trim(),
      timestamp: 'Just now',
      upvotes: 1,
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
            <Heart className="w-3.5 h-3.5" />
            <span>Community Solidarity</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-black">
            Send Eddie Words of Encouragement
          </h2>
          <p className="text-sm text-neutral-700 mt-1">
            Waiting since October 16, 2026 is a team sport. Leave Eddie a message or a piece of advice.
          </p>
        </div>
      </div>

      {/* Message Submission Form */}
      <div className="border-2 border-black p-6 mb-8 bg-white">
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
                placeholder="e.g. Fellow Patient Customer"
                className="w-full border border-black p-2.5 text-xs font-mono text-black focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-black mb-1">
              Your Message for Eddie
            </label>
            <textarea
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Leave some reassurance or your best tracking conspiracy theory..."
              className="w-full border border-black p-2.5 text-xs font-mono text-black focus:outline-none"
            />
          </div>

          {/* Quick Click Presets */}
          <div>
            <span className="text-[11px] font-mono text-neutral-600 block mb-1.5">
              Quick encouragement tags:
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
              <span>Post to Eddie&apos;s Wall</span>
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
              <span className="text-neutral-500 text-[11px]">Moral Support</span>
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

"use client";

export default function ContactForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <input
        type="email"
        placeholder="Email Address"
        className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <select className="w-full border border-primary/20 rounded px-4 py-3 text-sm text-primary/60 focus:outline-none focus:ring-2 focus:ring-accent">
        <option value="">Subject</option>
        <option value="general">General Inquiry</option>
        <option value="membership">Membership Question</option>
        <option value="volunteer">Volunteering</option>
        <option value="candidates">Running for Office</option>
        <option value="convention">Convention X</option>
        <option value="press">Press / Media</option>
        <option value="other">Other</option>
      </select>
      <textarea
        placeholder="Your Message"
        rows={5}
        className="w-full border border-primary/20 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
      />
      <button
        type="submit"
        className="w-full bg-cta hover:bg-cta-light text-white font-bold py-3 rounded transition-colors"
      >
        SEND MESSAGE
      </button>
    </form>
  );
}

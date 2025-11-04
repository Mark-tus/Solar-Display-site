import React from 'react';

export default function ContactForm() {
  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="max-w-xl mx-auto p-4 bg-white dark:bg-gray-800 rounded shadow"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>Don’t fill this out: <input name="bot-field" /></label>
      </p>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-300">Name</label>
        <input name="name" type="text" required className="w-full border px-3 py-2 rounded bg-gray-50 dark:bg-gray-900" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-300">Email</label>
        <input name="email" type="email" required className="w-full border px-3 py-2 rounded bg-gray-50 dark:bg-gray-900" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 dark:text-gray-300">Message</label>
        <textarea name="message" required className="w-full border px-3 py-2 rounded h-32 bg-gray-50 dark:bg-gray-900"></textarea>
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded">Send Message</button>
        <div className="text-sm text-gray-600 dark:text-gray-300">Or email: <strong>your-email@example.com</strong></div>
      </div>
    </form>
  );
}
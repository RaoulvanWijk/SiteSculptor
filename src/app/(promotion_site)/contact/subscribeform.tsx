import React from 'react';

const ContactForm: React.FC = () => {
  return (
    <form action="https://formspree.io/f/mpzvgdkb" method="POST">
      <label>
        Your email:
        <input type="email" name="email" required />
      </label>
      <label>
        Your message:
        <textarea name="message" required></textarea>
      </label>
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;
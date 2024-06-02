import React from 'react';

const ContactForm: React.FC = () => {
  return (
    <form id="fs-frm" name="simple-contact-form" acceptCharset="utf-8" action="https://formspree.io/f/mpzvgdkb" method="post">
      <fieldset id="fs-frm-inputs">
        <label htmlFor="full-name">Full Name</label>
        <input type="text" name="name" id="full-name" placeholder="First and Last" required />
        <label htmlFor="email-address">Email Address</label>
        <input type="email" name="_replyto" id="email-address" placeholder="email@domain.tld" required />
        <label htmlFor="message">Message</label>
        <textarea rows={5} name="message" id="message" placeholder=" Your Message ..." required></textarea>
        <input type="hidden" name="_subject" id="email-subject" value="Contact Form Submission" />
      </fieldset>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default ContactForm;
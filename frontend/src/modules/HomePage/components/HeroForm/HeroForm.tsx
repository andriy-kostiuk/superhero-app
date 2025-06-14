import { useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

export const HeroForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    commentary: '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setFormData({ name: '', email: '', commentary: '' });
  };

  return (
    <section className={styles.contact}>
      <div className='container'>
        <h2 className={classNames(styles.contact__title, 'title')}>
          Let’s Talk Solar ☀️
        </h2>
        <form className={styles.contact__form} onSubmit={handleSubmit}>
          <div className={styles.contact__group}>
            <label htmlFor='name'>Full Name</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Your name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.contact__group}>
            <label htmlFor='email'>E-mail Address</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='you@example.com'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.contact__group}>
            <label htmlFor='commentary'>How can we help you?</label>
            <textarea
              id='commentary'
              name='commentary'
              placeholder='Tell us about your solar needs...'
              value={formData.commentary}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type='submit' className={styles.contact__submit}>
            Send Message
          </button>
          {success && (
            <div className={styles.contact__success}>
              <p>Your message has been sent successfully!</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

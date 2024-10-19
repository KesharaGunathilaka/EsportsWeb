import HeaderC from '../Components/HeaderC/HeaderC';
import FooterC from '../Components/FooterC/FooterC';
import './ContactUs.css'; 

function ContactUs() {
  return (
    <div>
      <HeaderC />
      <div className="contactus-section bg-background font-sidebar text-lg text-white p-6 md:p-8 lg:p-10">
        <h1 className="text-3xl font-bold mb-6 md:text-4xl">Contact Us</h1>
        <p className="mb-4 text-base md:text-lg">We&apos;d love to hear from you! Feel free to reach out with any questions or feedback.</p>
        
        <div className="flex flex-col md:flex-row items-center gap-y-4 md:gap-x-4 contact-container">
          <div className="contact-item w-full md:w-1/3">
            <h2 className="text-xl font-bold mb-2">Email</h2>
            <p>support@knightsgaming.com</p>
          </div>
          <div className="contact-item w-full md:w-1/3">
            <h2 className="text-xl font-bold mb-2">Phone</h2>
            <p>+1 234 567 890</p>
          </div>
          <div className="contact-item w-full md:w-1/3">
            <h2 className="text-xl font-bold mb-2">Social Media</h2>
            <p>Follow us on: 
              <a href="https://twitter.com/knightsgaming" className="text-blue-500 ml-2">Twitter</a>, 
              <a href="https://instagram.com/knightsgaming" className="text-pink-500 ml-2">Instagram</a>
            </p>
          </div>
        </div>
      </div>
      <FooterC />
    </div>
  );
}

export default ContactUs;

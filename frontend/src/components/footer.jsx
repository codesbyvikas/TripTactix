import { FaGithub, FaTwitter, FaLinkedin,FaEnvelope  } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; 2025 TripTactix. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
        <a href="mailto:vikaskewat025@gmail.com" className="hover:text-white transition-colors duration-200">
            <FaEnvelope className="w-5 h-5" />
          </a>
          <a href="https://github.com/codesbyvikas/TripTactix" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
            <FaGithub className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/vikaskewat/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
            <FaLinkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

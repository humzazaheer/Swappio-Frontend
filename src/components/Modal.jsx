import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react'; 

const Modal = ({
  // label,
  title,
  children,
  isOpen,
  onClose
}) => {
  // const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  // const toggleModal = () => setIsOpen(!isOpen);
  
  const closeModal = () => onClose && onClose(); 

  
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  if (!isOpen) return null;


  return (
    <>
      {/* 1. Trigger Button */}
      {/* <button
        onClick={toggleModal}
        className="bg-indigo-600 text-white px-5 py-2 rounded-full text-md font-medium hover:bg-indigo-700 transition cursor-pointer"
      >
        {label}
      </button> */}

      {/* 2. Modal Overlay and Content */}
      
        
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'visible' : 'invisible'}`}>
          {/* The Modal Content Container (Ref is attached here) */}
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 transform transition-all overflow-hidden"
            // Stop click events on the modal content from bubbling up to the overlay
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              <button
                onClick={closeModal} // Use the dedicated closeModal handler
                className="text-gray-500 hover:text-red-500 transition-colors"
                aria-label="Close Modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      
    </>
  );
};
export default Modal;

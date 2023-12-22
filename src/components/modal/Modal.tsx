interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className="bg-gray-800 bg-opacity-75 absolute inset-0"
        onClick={onClose}
      ></div>

      <div className="bg-white rounded-lg z-50">
        <div className="text-2xl font-bold mb-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

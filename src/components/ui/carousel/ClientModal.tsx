
import { AnimatePresence, motion } from "framer-motion"

interface ClientModalProps {
  activeClient: {
    image: string;
    name: string;
    type: string;
  } | null;
  handleClose: () => void;
}

const ClientModal: React.FC<ClientModalProps> = ({ activeClient, handleClose }) => {
  return null; // Modal no longer used with the grid layout
};

export default ClientModal;

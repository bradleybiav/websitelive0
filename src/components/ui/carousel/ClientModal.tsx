
import {
  AnimatePresence,
  motion,
} from "framer-motion"

const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

interface ClientModalProps {
  activeClient: {
    image: string;
    name: string;
    type: string;
  } | null;
  handleClose: () => void;
}

const ClientModal: React.FC<ClientModalProps> = ({ activeClient, handleClose }) => {
  if (!activeClient) return null;
  
  return (
    <AnimatePresence mode="sync">
      {activeClient && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          layoutId={`img-container-${activeClient.image}`}
          layout="position"
          onClick={handleClose}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 m-5 md:m-36 lg:mx-[19rem] rounded-3xl"
          style={{ willChange: "opacity" }}
          transition={transitionOverlay}
        >
          <div className="bg-black p-8 rounded-xl max-w-2xl text-center">
            <motion.img
              layoutId={`img-${activeClient.image}`}
              src={activeClient.image}
              className="max-w-full max-h-[50vh] rounded-lg shadow-lg mx-auto"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{
                willChange: "transform",
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.3 }}
              className="mt-6 text-white"
            >
              <h3 className="text-2xl font-display font-semibold">{activeClient.name}</h3>
              <p className="text-gray-300 mt-2">{activeClient.type}</p>
              <p className="mt-4 text-gray-200">
                We collaborated with {activeClient.name} to redefine their sonic identity and create immersive listening experiences.
              </p>
              <button className="mt-6 px-6 py-2 border border-white rounded-full text-sm hover:bg-white hover:text-black transition-colors">
                View Full Case Study
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClientModal;

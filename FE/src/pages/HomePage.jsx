import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore.js";
import { formatDate } from "../utils/date.js";
import video from "../assets/bg.mp4"

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.4 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 60, damping: 12 },
  },
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0px 0px 8px rgba(34, 197, 94, 0.7)" },
  tap: { scale: 0.95 },
};

const HomePage = () => {
  const { user, logout } = useAuthStore();
  const controls = useAnimation();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <AnimatePresence>
      <motion.div
        className="bg-gradient-to-br from-gray-900 via-green-950 to-emerald-900 text-white relative overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero Section */}
        <section className="h-svh w-screen relative flex flex-col items-center justify-center text-center px-4">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          >
            <source src={video} type="video/mp4" />
          </video>

          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text z-10"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Welcome, {user.name} 🌟
          </motion.h1>

          <motion.p
            className="text-lg max-w-xl mx-auto z-10 text-gray-300"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Explore your dashboard and access insights, activity, and more with a touch of elegance and performance.
          </motion.p>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 flex flex-col items-center justify-center bg-gray-950 bg-opacity-60 backdrop-blur-md">
          <motion.h2
            className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Your Activity Overview
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            exit="exit"
            className="max-w-xl w-full mx-auto p-8 bg-gray-900 bg-opacity-70 backdrop-blur-md rounded-xl shadow-2xl border border-gray-800"
          >
            <motion.div variants={cardVariants} className="space-y-6">
              <motion.div
                variants={cardVariants}
                className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-green-400 mb-3">Profile Information</h3>
                <p className="text-gray-300">Name: {user.name}</p>
                <p className="text-gray-300">Email: {user.email}</p>
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-green-400 mb-3">Account Activity</h3>
                <p className="text-gray-300">
                  <span className="font-bold">Joined: </span>
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-300">
                  <span className="font-bold">Last Login: </span>
                  {formatDate(user.lastLogin)}
                </p>
              </motion.div>
            </motion.div>

            <motion.div className="mt-6" variants={cardVariants}>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleLogout}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Logout
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer/CTA Section */}
        <section className="py-20 px-6 text-center bg-gray-900 bg-opacity-80">
          <motion.h2
            className="text-4xl font-bold bg-gradient-to-r from-emerald-300 to-green-400 text-transparent bg-clip-text mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Ready to take the next step?
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover more advanced features and customize your experience with our powerful tools.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full shadow-xl hover:from-green-600 hover:to-emerald-700"
          >
            Explore More
          </motion.button>
        </section>
      </motion.div>
    </AnimatePresence>
  );
};

export default HomePage;

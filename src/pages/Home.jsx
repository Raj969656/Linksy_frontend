import UrlForm from "../components/UrlForm";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100">
      <section
        id="home"
        className="min-h-screen flex items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold">
            Shorten URLs{" "}
            <span className="text-indigo-600">instantly</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            No signup required. Paste your long URL and get a short link in seconds.
            Track clicks, generate QR codes, and manage links when you log in.
          </p>

          <div className="mt-12">
            <UrlForm />
          </div>

          <SignedOut>
            <SignInButton mode="modal">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg"
              >
                Login to unlock dashboard →
              </motion.button>
            </SignInButton>
          </SignedOut>
        </motion.div>
      </section>
      <Section id="about" title="Why LinkSy?">
        <p>
          Long URLs look messy and are hard to share. LinkSy helps you create
          clean, short, and reliable links instantly — with optional analytics
          and dashboard access.
        </p>
      </Section>
      <section
        id="features"
        className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <Feature
          title="⚡ Super Fast"
          text="Short links are generated instantly using a highly optimized backend."
        />
        <Feature
          title="📊 Analytics"
          text="Track clicks and performance when you log in."
        />
        <Feature
          title="🔒 Secure"
          text="Authentication powered by Clerk with modern security."
        />
      </section>
      <Section id="how" title="How It Works">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <Step number="1" text="Paste your long URL" />
          <Step number="2" text="Get a short link instantly" />
          <Step number="3" text="Login to track analytics & manage links" />
        </div>
      </Section>
      <Section id="pricing" title="Pricing">
        <p>
          Free for everyone. Premium features like custom domains and advanced
          analytics are coming soon 🚀
        </p>
      </Section>
      <Section id="contact" title="Contact">
        <p>
          Questions or feedback?
          <br />
          📧 support@linksy.app
        </p>
      </Section>
      <footer className="text-center py-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} LinkSy. All rights reserved.
      </footer>
    </div>
  );
}

function Section({ id, title, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-6 py-24 text-center"
    >
      <h2 className="text-4xl font-bold mb-6">{title}</h2>
      <div className="text-gray-600 text-lg space-y-4">
        {children}
      </div>
    </motion.section>
  );
}
function Feature({ title, text }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition text-center"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </motion.div>
  );
}

function Step({ number, text }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center">
      <div className="text-indigo-600 text-3xl font-bold mb-2">{number}</div>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}

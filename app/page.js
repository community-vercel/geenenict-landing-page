import Head from 'next/head';
import styles from './styles/Home.module.scss';
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className="bg-gradient-to-b from-gray-300 to-white py-4 px-6 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/logo.png" width={320} height={64} alt="Geenen ICT Logo" className="w-80 h-16 max-w-full" />
        </div>

        {/* Contact Button */}
        <a href="#contact" className="bg-orange-500 text-white text-sm font-semibold px-5 py-2 rounded-md shadow-md hover:bg-orange-600 transition">
          GET IN TOUCH
        </a>
      </header>

      <section className="flex flex-col items-center text-center py-24 bg-gradient-to-b from-gray-300 to-white px-4">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-600 mt-10 max-w-3xl leading-normal">
          Splunk Certified Architect & Web Developer
        </h1>

        {/* Avatar Image */}
        <div className="mt-6 relative w-48 h-48 md:w-52 md:h-52">
          <Image src="/Geenenict.png" alt="Frans Geenen" width={1000} height={1000} className="rounded-full border-4 object-cover w-full h-full" />
        </div>

        {/* Name and Subtitle */}
        <h2 className="text-lg md:text-2xl font-semibold text-orange-500 mt-12">
          Hi, I am Frans Geenen.
        </h2>
        <p className="italic text-gray-600">Nice to meet you!</p>
      </section>

      <section className="bg-[#3D4A46] text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <p className="max-w-3xl mx-auto text-white text-lg leading-relaxed">
            As a Splunk specialist and web developer with 12+ years of experience, I have worked on diverse projects for agencies, startups, and clients...
          </p>
        </div>
      </section>

      <div className="bg-white text-gray-800 py-16 px-4">
        <h2 className="text-center text-3xl font-semibold">What I can do for you:</h2>

        <div className="flex flex-col md:flex-row justify-center gap-12 mt-10 text-center">
          <div className="max-w-xs mx-auto">
            <h3 className="text-xl font-semibold bg-orange-100 text-orange-600 px-3 py-1 inline-block rounded-md">
              Splunk
            </h3>
            <p className="mt-4 text-gray-600">
              Over the past 12 years, I have been working with Splunk Core Enterprise...
            </p>
          </div>

          <div className="max-w-xs mx-auto">
            <h3 className="text-xl font-semibold italic bg-orange-100 text-orange-600 px-3 py-1 inline-block rounded-md">
              Webdesign & eCommerce
            </h3>
            <p className="mt-4 text-gray-600">
              At a very young age, I started exploring HTML, CSS, and JavaScript...
            </p>
          </div>

          <div className="max-w-xs mx-auto">
            <h3 className="text-xl font-semibold italic bg-orange-100 text-orange-600 px-3 py-1 inline-block rounded-md">
              Web Development
            </h3>
            <p className="mt-4 text-gray-600">
              As with many web developers, I started out with PHP...
            </p>
          </div>
        </div>
      </div>

      <hr className="h-px my-8 bg-red-500 border-0 dark:bg-gray-700" />

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-xl font-semibold text-gray-500 tracking-wide">
            Some companies I am happy to have collaborated with:
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-6 mt-10">
            <img src="https://images.squarespace-cdn.com/content/v1/65329494635176698cea5737/f0612a0c-e14a-4645-9680-589a0d1578ec/vanderlande_logo.png?format=300w" alt="Vanderlande" className="h-10 md:h-14" />
            <img src="https://images.squarespace-cdn.com/content/v1/65329494635176698cea5737/ce6aa4c4-ba50-4b4a-b68b-c323b4236b88/rechtspraak_logo.png?format=300w" alt="Rechtspraak" className="h-10 md:h-14" />
            <img src="https://images.squarespace-cdn.com/content/v1/65329494635176698cea5737/082042f5-a65d-492d-b801-26cac5543f6a/ASML-Logo.png?format=300w" alt="ASML" className="h-10 md:h-14" />
          </div>
        </div>
      </section>

      <footer className="bg-[#3D4A46] text-white text-center py-12 px-4">
        <p className="italic text-lg text-gray-200">
          “We are committed to nurturing lasting partnerships...”
        </p>

        <div className="mt-6 text-gray-300 text-sm">
          <p>Sint Jansstraat 19</p>
          <p>6071 JG Swalmen</p>
          <p>The Netherlands</p>
        </div>

        <div className="mt-3 text-gray-300 text-sm">
          <p>+31 851 091 065</p>
          <p>info@geenenict.nl</p>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="bg-orange-500 w-10 h-10 flex items-center justify-center rounded-full">
            <img src="https://images.squarespace-cdn.com/content/v1/65329494635176698cea5737/55eda09b-8721-490d-b862-58bd23797789/linkedin_icon-1-150x150.png?format=100w" alt="LinkedIn" className="w-5 h-5" />
          </a>
        </div>

        <div className="mt-6 text-gray-400 text-sm">
          <p><strong>KvK:</strong> 87555840 | <strong>BTW:</strong> NL864328837B01</p>
        </div>

        <div className="mt-2 text-gray-400 text-xs">
          <p>Copyright © 2025 Geenen ict B.V.</p>
        </div>
      </footer>
    </div>
  );
}
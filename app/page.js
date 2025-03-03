import Head from 'next/head';
import styles from './styles/Home.module.scss';
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.container}>
    <header className="bg-gradient-to-b from-gray-300 to-white py-4 px-6 flex items-center justify-between">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/logo.png"
        width={320} 
        height={64} 
         alt="Geenen ICT Logo" className="w-80 h-16" />
        
      </div>

      {/* Contact Button */}
      <a 
        href="#contact" 
        className="bg-orange-500 text-white text-sm font-semibold px-5 py-2 rounded-md shadow-md hover:bg-orange-600 transition">
        GET IN TOUCH
      </a>
      </header>
   

    <section className="flex flex-col items-center text-center py-24 bg-gradient-to-b from-gray-300 to-white">
      {/* Logo and Button */}
   
      
      {/* Title */}
      <h1 className="text-5xl md:text-5xl font-semibold  text-gray-600  mt-10 w-[900px] leading-normal	">
        Splunk Certified Architect & Webdeveloper
      </h1>
      
      {/* Avatar Image */}
      <div className="mt-6 relative w-64 h-64 md:w-52 md:h-52">
      <Image
        src="/Geenenict.png"
        alt="Frans Geenen"
        width={1000} 
        height={1000} 
        className="rounded-full border-4  object-cover w-[600px] h-[250px]"
      />
    </div>
      
      {/* Name and Subtitle */}
      <h2 className="text-xl md:text-2xl font-semibold text-orange-500 mt-24">
        Hi, I’m Frans Geenen.
      </h2>
      <p className="italic text-gray-600">Nice to meet you!</p>
    </section>
    <section className="bg-[#3D4A46]  text-white py-12">
      <div className="container mx-auto  text-center">
        <p className="max-w-3xl mx-auto text-white text-lg leading-relaxed">
          As a Splunk specialist and web developer with 12+ years of experience, I’ve worked on diverse projects for agencies, startups, and clients. I’m skilled in unlocking data insights using Splunk and creating captivating websites and e-commerce solutions. Automation and integrations are my forte, streamlining workflows for improved efficiency. My quiet confidence and curiosity drive me to seek innovative design solutions. I’m constantly improving my skills to deliver tailored products that exceed expectations.
        </p>
      </div>
      </section>
      <div className="bg-white text-gray-800 py-16">
        <h2 className="text-center text-3xl font-semibold">What I can do for you:</h2>

        <div className="flex flex-col md:flex-row justify-center gap-12 mt-10 text-center">
          <div>
            {/* <FaChevronDown className="text-orange-500 mx-auto mb-2" /> */}
            <h3 className="text-xl font-semibold bg-orange-100 text-orange-600 px-3 py-1 inline-block rounded-md">
              Splunk
            </h3>
            <p className="mt-4 max-w-xs mx-auto text-gray-600">
              Over the past 12 years, I’ve been working with Splunk Core Enterprise, Splunk IT Service Intelligence, Splunk Enterprise Security, and many more Splunk products like AR, TV, Mobile, Add-on Builder, Dashboard Studio, HEC, etc.
            </p>
          </div>

          <div>
            {/* <FaChevronDown className="text-orange-500 mx-auto mb-2" /> */}
            <h3 className="text-xl font-semibold italic bg-orange-100 text-orange-600 px-3 py-1 inline-block rounded-md">
              Webdesign & eCommerce
            </h3>
            <p className="mt-4 max-w-xs mx-auto text-gray-600">
              At a very young age, I started exploring HTML, CSS, and JavaScript to build online services like websites and webshops. This has evolved into professional websites and webshops that are responsive, SEO-optimized, high-performing, and multilingual.
            </p>
          </div>

          <div>
            {/* <FaChevronDown className="text-orange-500 mx-auto mb-2" /> */}
            <h3 className="text-xl font-semibold italic bg-orange-100 text-orange-600 px-3 py-1 inline-block rounded-md">
              Webdevelopment
            </h3>
            <p className="mt-4 max-w-xs mx-auto text-gray-600">
              As with many web developers, I started out with PHP. This is still useful today to create custom WordPress solutions. For high-performance and highly available web applications, I use Node.js and React.js or Vue.js.
            </p>
          </div>
        </div>
      </div>
      <hr className="h-px my-8 bg-red-500 border-0 dark:bg-gray-700" />

    <section className="py-0 bg-white">
      <div className="max-w-6xl mx-auto text-center px-6">
        {/* Heading */}
        <h2 className="text-xl font-semibold text-gray-500 tracking-wide">
          Some companies I am happy to have collaborated with:
        </h2>

        {/* Logos Section */}
        <div className="flex flex-wrap justify-center items-center gap-12 mt-10">
          <img src="https://images.squarespace-cdn.com/content/v1/65329494635176698cea5737/f0612a0c-e14a-4645-9680-589a0d1578ec/vanderlande_logo.png?format=300w" 
               alt="Vanderlande" className="h-14 transition" />
          <img src="https://images.squarespace-cdn.com/content/v1/65329494635176698cea5737/ce6aa4c4-ba50-4b4a-b68b-c323b4236b88/rechtspraak_logo.png?format=300w" 
               alt="Rechtspraak" className="h-14 transition" />
          <img src="https://images.squarespace-cdn.com/content/v1/65329494635176698cea5737/082042f5-a65d-492d-b801-26cac5543f6a/ASML-Logo.png?format=300w" 
               alt="ASML" className="h-14  transition" />
          <img src="https://images.squarespace-cdn.com/content/v1/65329494635176698cea5737/992c2810-67a1-427f-82c0-fdd8af6c3f92/belastingdienst_logo.png?format=300w" 
               alt="Belastingdienst" className="h-14  transition" />
          <img src="https://images.squarespace-cdn.com/content/v1/65329494635176698cea5737/6013590a-298d-4532-bc0d-b02d6d912f2c/zalando_logo.png?format=300w" 
               alt="Zalando" className="h-14 transition" />
          <img src="https://images.squarespace-cdn.com/content/v1/65329494635176698cea5737/6d5f8ef7-c6fc-4720-a1f3-219fc683d858/jeans_barn_logo.png?format=300w" 
               alt="Jeans Barn" className="h-14  transition" />
        </div>
      </div>

      {/* Recent Projects Section */}
      <div className="bg-[#3D4A46]  text-white py-20 mt-20">
      <div className="max-w-6xl mx-auto px-0 flex items-center">
  <h2 className="text-4xl italic font-semibold text-white tracking-tight mr-10">
    My recent <span className="text-orange-500">Projects</span>
  </h2>
  <p className="max-w-3xl text-lg leading-relaxed mt-6 text-white font-light">
    Below you can find a concise overview of the most recent projects I have
    completed. This ranges from Splunk projects to building websites and eCommerce solutions.
    Don’t hesitate to reach out so we can see how I can help your company. 
    I’m looking forward to hearing about your company's project!
  </p>
</div>
      </div>
    </section>
    <section className="bg-[#ECEEEE] py-8">
      <div className="max-w-2xl mx-auto text-center px-6">
        
        {/* Profile Image */}
        <div className="relative mx-auto mb-4">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden ">
            <img 
              src="https://images.squarespace-cdn.com/content/v1/65329494635176698cea5737/6cc45b64-5492-4e36-af7a-ad5eda3f91de/Proyek-500-2-1024x1024.png?format=500w" 
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 bg-orange-500 rounded-full -z-10"></div>
        </div>

        {/* Title */}
        <h2 className="text-2xl italic text-gray-700 font-serif">
          Contact me to discuss your project!
        </h2>

        {/* Form */}
        <form className="mt-8">
          
          {/* Name Fields */}
          <div className="text-left mb-5">
            <label className="text-gray-700 text-sm font-semibold">Name <span className="text-gray-500 text-xs">(required)</span></label>
            <div className="flex gap-4 mt-1">
              <input 
                type="text" 
                className="w-1/2 px-4 py-2 border border-gray-400 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              
              <input 
                type="text" 
                className="w-1/2 px-4 py-2 border border-gray-400 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="text-left mb-5">
            <label className="text-gray-700 text-sm font-semibold">Email <span className="text-gray-500 text-xs">(required)</span></label>
            <input 
              type="email" 
              className="w-full px-4 py-2 mt-1 border border-gray-400 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Message */}
          <div className="text-left mb-6">
            <label className="text-gray-700 text-sm font-semibold">Message <span className="text-gray-500 text-xs">(required)</span></label>
            <textarea 
              className="w-full px-4 py-2 mt-1 h-28 border border-gray-400 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button className="bg-orange-500 text-white font-semibold text-lg py-3 px-6 rounded-md hover:bg-orange-600 transition">
              Start your project!
            </button>
          </div>
        </form>
      </div>
    </section>
    <footer className="bg-[#3D4A46] text-white text-center py-12">
      <div className="max-w-2xl mx-auto px-6">

        {/* Quote */}
        <p className="italic text-lg text-gray-200">
          “We are committed to nurturing lasting partnerships, ensuring our mutual growth and success alongside our valued customers.”
        </p>

        {/* Address */}
        <div className="mt-6 text-gray-300 text-sm">
          <p>Sint Jansstraat 19</p>
          <p>6071 JG Swalmen</p>
          <p>The Netherlands</p>
        </div>

        {/* Contact Info */}
        <div className="mt-3 text-gray-300 text-sm">
          <p>+31 851 091 065</p>
          <p>info@geenenict.nl</p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="bg-orange-500 w-10 h-10 flex items-center justify-center rounded-full">
            <img src="https://images.squarespace-cdn.com/content/v1/65329494635176698cea5737/55eda09b-8721-490d-b862-58bd23797789/linkedin_icon-1-150x150.png?format=100w" alt="LinkedIn" className="w-5 h-5" />
          </a>
          <a href="#" className="bg-orange-500 w-10 h-10 flex items-center justify-center rounded-full">
            <img src="https://images.squarespace-cdn.com/content/v1/65329494635176698cea5737/7dbe0f63-0530-4fd5-a34d-f3b403574595/credly_icon-1-150x150.png?format=100w" alt="Credly" className="w-5 h-5" />
          </a>
        </div>

        {/* Business Info */}
        <div className="mt-6 text-gray-400 text-sm">
          <p><strong>KvK:</strong> 87555840  |  <strong>BTW:</strong> NL864328837B01</p>
        </div>

        {/* Copyright */}
        <div className="mt-2 text-gray-400 text-xs">
          <p>Copyright © 2025 Geenen ict B.V. - Website by <a href="#" className="text-orange-400 hover:underline">Webamigo</a></p>
        </div>

      </div>
    </footer>
    </div>
  );
}
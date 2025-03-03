import Head from 'next/head';
import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div >
     <header  className="bg-gradient-to-b from-gray-300 to-white py-4 px-6 flex items-center justify-between flex-wrap">
  {/* Logo */}
  <div className="flex items-center justify-center gap-4 mx-auto lg:mx-0">
  <span className="text-5xl font-extrabold text-[#3D4A46] tracking-tight hover:text-orange-500 transition duration-500 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-orange-400">
    Digidaal
  </span>
</div> 
 {/* <Image 
    src="/logo.png"
    width={320} 
    height={64} 
    alt="Geenen ICT Logo" 
    className="w-80 h-16"
  /> */}
  {/* <span className=" flex items-center text-5xl font-extrabold text-[#3D4A46] tracking-tight hover:text-orange-500 transition duration-500 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-orange-400">
    Digidaal
  </span>
</div> */}


  {/* Contact Button */}
  <Link
    href="#contact" 
    className="bg-orange-500 text-white text-sm font-semibold px-5 py-3 rounded-md shadow-md hover:bg-orange-600 transition mt-3 xs:mt-5 sm:mt-4 lg:mt-0 md:mt-0 mx-auto md:ml-auto md:mr-0 "
  >
    GET IN TOUCH
  </Link>
</header>
<section className="flex flex-col items-center text-center py-24 bg-gradient-to-b from-gray-200 to-white">
  {/* Title */}
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-700 mt-10 w-full max-w-4xl leading-tight">
    Your Specialist in <span className="text-orange-500">IT Security & Application Management</span>
  </h1>

  {/* Avatar Image with Glow Effect */}
  <div className="relative mt-10">
    <div className="w-48 h-48 md:w-52 md:h-52 rounded-full ">
      <Image
        src="/brayner_daal.jpeg"
        alt="Frans Geenen"
        width={1000} 
        height={1000} 
        priority
        className="rounded-full object-cover w-full h-full"
      />
    </div>
    {/* Subtle Glowing Effect */}
    {/* <div className="absolute inset-0 w-full h-full rounded-full animate-pulse bg-orange-400 opacity-20 blur-lg"></div> */}
  </div>

  {/* Name and Subtitle */}
  <h2 className="text-2xl md:text-3xl font-semibold text-orange-500 mt-8 animate-fade-in">
    Welcome to <span className="underline decoration-orange-400">Digidaal</span>
  </h2>    
        <p className="italic text-gray-600">Nice to meet you!</p>
      </section>

      <section className="bg-[#3D4A46] text-white py-12">
      <div className="container mx-auto text-center py-16 px-6 bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-lg">
  <h2 className="text-4xl font-bold text-white mb-6">
    About <span className="text-orange-500">Me</span>
  </h2>
  
  <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed">
    With over <span className="font-semibold text-white">25 years of experience</span> in IT management, consultancy, and security management, I help organizations optimize and secure their IT environment. My expertise lies at the intersection of <span className="text-orange-400 font-medium">ITIL processes</span>, ITSM tools like <span className="text-orange-400 font-medium">TOPdesk</span>, and managing <span className="text-orange-400 font-medium">Microsoft 365 & Google Workspace</span> environments.
  </p>

  <div className="grid md:grid-cols-2 gap-8 mt-12 text-left">
    <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg shadow-md border-l-4 border-orange-500">
      <h3 className="text-2xl font-semibold text-white mb-3">Who am I?</h3>
      <p className="text-gray-300">
        I am <span className="font-bold text-orange-400">Brayner Daal</span>, an experienced and certified IT professional and security consultant. I've collaborated with large and medium-sized companies across finance, healthcare, and technology sectors. My focus is on designing, implementing, and managing <span className="text-orange-400">secure and efficient IT infrastructures.</span>
      </p>
    </div>

    <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg shadow-md border-l-4 border-orange-500">
      <h3 className="text-2xl font-semibold text-white mb-3">Key Expertise</h3>
      <ul className="text-gray-300 space-y-2">
        <li className="flex items-center">
          <span className="text-orange-400 text-xl mr-2">✔</span> IT Security & Compliance (CIS benchmarks, NEN 7510, ISO 27001)
        </li>
        <li className="flex items-center">
          <span className="text-orange-400 text-xl mr-2">✔</span> Microsoft 365 & Google Workspace Management
        </li>
        <li className="flex items-center">
          <span className="text-orange-400 text-xl mr-2">✔</span> Application Management & ITSM Solutions
        </li>
        <li className="flex items-center">
          <span className="text-orange-400 text-xl mr-2">✔</span> Network Management & Cybersecurity Audits
        </li>
        <li className="flex items-center">
          <span className="text-orange-400 text-xl mr-2">✔</span> Secure Workflows & Cloud Solutions Implementation
        </li>
      </ul>
    </div>
  </div>
  </div>
      </section>

      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
  <h2 className="text-center text-4xl font-bold mb-12">
    My <span className="text-orange-500">Services</span>
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
    {/* Service 1 */}
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
      <div className="text-orange-400 text-4xl mb-4">
        🚀
      </div>
      <h3 className="text-xl font-semibold text-orange-400">
        IT Security Management
      </h3>
      <p className="mt-3 text-gray-300">
        Implementation of cybersecurity frameworks, including CIS compliance and security governance.
      </p>
    </div>

    {/* Service 2 */}
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
      <div className="text-orange-400 text-4xl mb-4">
        🖥️
      </div>
      <h3 className="text-xl font-semibold text-orange-400">
        Application Management
      </h3>
      <p className="mt-3 text-gray-300">
        Support and management of ITSM systems, such as TOPdesk.
      </p>
    </div>

    {/* Service 3 */}
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
      <div className="text-orange-400 text-4xl mb-4">
        ☁️
      </div>
      <h3 className="text-xl font-semibold text-orange-400">
        Microsoft 365 & Google Workspace
      </h3>
      <p className="mt-3 text-gray-300">
        Optimization and security of cloud-based IT environments.
      </p>
    </div>

    {/* Service 4 */}
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
      <div className="text-orange-400 text-4xl mb-4">
        🌐
      </div>
      <h3 className="text-xl font-semibold text-orange-400">
        Network & Office IT Management
      </h3>
      <p className="mt-3 text-gray-300">
        Configuration and maintenance of firewalls, WiFi networks, and endpoint security.
      </p>
    </div>
  </div>
</div>

      {/* <hr className="h-px my-8 bg-red-500 border-0 dark:bg-gray-700" /> */}
      <section className="bg-[#3D4A46] text-white py-12 mt-8">

<div className="max-w-7xl mx-auto text-center px-6 py-16 bg-gradient-to-r from-[#2C3E50] to-[#34495E] rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">

  {/* Work Method Title */}
  <h2 className="text-4xl font-extrabold text-orange-500 mt-6 tracking-wide">
    <span className="text-white">Work</span> <strong className="text-orange-600">Method</strong>
  </h2>

  {/* Independence & DBA-Proof Approach */}
  <h4 className="text-3xl font-semibold text-white tracking-wide mt-6">
    <span className="text-orange-500">Independence</span> & DBA-Proof Approach
  </h4>

  <p className="mt-4 text-white text-lg max-w-4xl mx-auto leading-relaxed opacity-90">
    To ensure clarity for clients and compliance with Dutch regulations, I operate as an independent contractor through my BV. My work structure follows these principles:
  </p>

  {/* List with Checkmarks */}
  <ul className="list-none mt-8 text-white text-lg max-w-4xl mx-auto opacity-90">
    <li className="relative pl-6 hover:text-orange-400 transition duration-300 transform hover:scale-105">
      <span className="absolute left-0 top-1/2 transform -translate-y-1/2 text-green-500 text-xl">&#10003;</span>
      <strong>Full control</strong> over my working hours and assignments.
    </li>
    <li className="relative pl-6 hover:text-orange-400 transition duration-300 transform hover:scale-105">
      <span className="absolute left-0 top-1/2 transform -translate-y-1/2 text-green-500 text-xl">&#10003;</span>
      Specialized services offered to multiple clients.
    </li>
    <li className="relative pl-6 hover:text-orange-400 transition duration-300 transform hover:scale-105">
      <span className="absolute left-0 top-1/2 transform -translate-y-1/2 text-green-500 text-xl">&#10003;</span>
      No employer-employee relationship; work is based on clear agreements and project contracts.
    </li>
    <li className="relative pl-6 hover:text-orange-400 transition duration-300 transform hover:scale-105">
      <span className="absolute left-0 top-1/2 transform -translate-y-1/2 text-green-500 text-xl">&#10003;</span>
      Full responsibility for execution and results.
    </li>
  </ul>

</div>
</section>
      <section className="py-8 bg-gradient-to-b from-[#2C3E50] to-[#34495E] mt-6">


  {/* Recent Projects Title */}
  <div className="text-white  ">
    <h2 className="text-4xl md:text-5xl  font-extrabold tracking-tight text-center mb-0 lg:mb-10">
      My recent <span className="text-orange-500">Projects</span>
    </h2>
  </div>

  {/* Project List */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 sm:mt-5 px-6">
    <div className="transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-[#1E2A33] p-6 bg-white rounded-lg text-black">
      <strong className="text-lg text-orange-500">Sonova Group</strong>
      <p className="mt-2 text-gray-600">Management of server infrastructure, vulnerability management, and incident response.</p>
    </div>

    <div className="transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-[#1E2A33] p-6 bg-white rounded-lg text-black">
      <strong className="text-lg text-orange-500">Aevitas</strong>
      <p className="mt-2 text-gray-600">Security optimization and compliance for Microsoft 365 & Google Workspace.</p>
    </div>

    <div className="transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-[#1E2A33] p-6 bg-white rounded-lg text-black">
      <strong className="text-lg text-orange-500">Nictiz</strong>
      <p className="mt-2 text-gray-600">ITSM optimization and implementation of TOPdesk, including workplace management.</p>
    </div>

    <div className="transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-[#1E2A33] p-6 bg-white rounded-lg text-black">
      <strong className="text-lg text-orange-500">SpeedCovidTest</strong>
      <p className="mt-2 text-gray-600">Migration from Google Workspace to Microsoft 365 and NEN 7510 certification.</p>
    </div>

    <div className="transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-[#1E2A33] p-6 bg-white rounded-lg text-black">
      <strong className="text-lg text-orange-500">Schoonenberg</strong>
      <p className="mt-2 text-gray-600">Implementation and management of ITSM systems and migration to a new IT architecture.</p>
    </div>

    <div className="transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-[#1E2A33] p-6 bg-white rounded-lg text-black">
      <strong className="text-lg text-orange-500">Euroshell (Shell Cards B.V.)</strong>
      <p className="mt-2 text-gray-600">Establishment of an ITIL-based service desk and management of euroShell applications.</p>
    </div>

    <div className="transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-[#1E2A33] p-6 bg-white rounded-lg text-black">
      <strong className="text-lg text-orange-500">Corus (Tata Steel)</strong>
      <p className="mt-2 text-gray-600">ITIL optimization and management of IT projects and authorizations.</p>
    </div>

    <div className="transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-[#1E2A33] p-6 bg-white rounded-lg text-black">
      <strong className="text-lg text-orange-500">Mattel Europe Holdings B.V.</strong>
      <p className="mt-2 text-gray-600">IT management and support for European offices.</p>
    </div>
  </div>

  
</section>
      <section className="bg-[#ECEEEE] py-8">
        <div className="max-w-2xl mx-auto text-center px-6">
          {/* Profile Image */}
          <div className="relative mx-auto mb-4">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden">
      <Image
        src="/brayner_daal.jpeg"
        alt="Frans Geenen"
        width={1000} 
        height={1000} 
        priority
        className="rounded-full object-cover w-full h-full"
      />
    
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 bg-orange-500 rounded-full -z-10"></div>
          </div>

          {/* Title */}
          <h2 className="text-2xl italic text-gray-700 font-serif">
          Contact Would you like to make your IT environment more secure and efficient?           </h2>

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

   <footer className="bg-[#2C3E50] text-white text-center py-12">
  <div className="max-w-6xl mx-auto px-6">
    {/* Quote */}
    <p className="italic text-xl text-gray-300 mb-6">
      “We are committed to nurturing lasting partnerships, ensuring our mutual growth and success alongside our valued customers.”
    </p>

    {/* Address */}
    <div className="mt-6 text-gray-300 text-sm">
      <p>2718 SB Zoetermeer</p>
      <p>Koraalrood 153</p>
      <p>2718 SB Zoetermeer</p>
      <p>The Netherlands</p>
    </div>

    {/* Contact Info */}
    <div className="mt-6 text-gray-300 text-sm">
      <p><strong>Get in touch via:</strong></p>
      <p>📧 Email: <a href="mailto:brayner@digidaal.nl" className="text-orange-400 hover:underline">brayner@digidaal.nl</a></p>
      <p>📞 Phone: <a href="tel:+31612345678" className="text-orange-400 hover:underline">+31(0)6 12345678</a></p>
      <p>🌍 LinkedIn: <a href="https://linkedin.com/in/brayner-daal-358a5375" target="_blank" className="text-orange-400 hover:underline">linkedin.com/in/brayner-daal-358a5375</a></p>
    </div>

    {/* Social Icons */}
    {/* <div className="flex justify-center gap-6 mt-6">
      <a href="https://linkedin.com/in/brayner-daal-358a5375" target="_blank" className="bg-orange-500 w-12 h-12 flex items-center justify-center rounded-full hover:bg-orange-400 transition duration-300">
        <img src="https://images.squarespace-cdn.com/content/v1/65329494635176698cea5737/55eda09b-8721-490d-b862-58bd23797789/linkedin_icon-1-150x150.png?format=100w" alt="LinkedIn" className="w-6 h-6" />
      </a>
      <a href="https://credly.com" target="_blank" className="bg-orange-500 w-12 h-12 flex items-center justify-center rounded-full hover:bg-orange-400 transition duration-300">
        <img src="https://images.squarespace-cdn.com/content/v1/65329494635176698cea5737/7dbe0f63-0530-4fd5-a34d-f3b403574595/credly_icon-1-150x150.png?format=100w" alt="Credly" className="w-6 h-6" />
      </a>
    </div> */}

    {/* Business Info */}
    <div className="mt-8 text-gray-400 text-sm">
      <p><strong>KvK:</strong> 96387238 | <strong>BTW:</strong> NL867589371B01</p>
    </div>

    {/* Copyright */}
    <div className="mt-4 text-gray-400 text-xs">
      <p>Copyright © 2025 Digidaal ict B.V. | Website by <a href="https://sharplogicians.com/" className="text-orange-400 hover:underline"> Sharplogicians </a></p>
    </div>
  </div>
</footer>
    </div>
  );
}
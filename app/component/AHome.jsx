'use client';
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { H1, H2, H3, H4 } from './Typrography';
import { FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsPhoneFill } from 'react-icons/bs';

export default function Home({ homeDetail }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage("");

        try {
            const response = await fetch(`${serverurl}contact/send`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMessage("Message sent successfully!");
                setFormData({ firstName: "", lastName: "", email: "", message: "" });
            } else {
                setResponseMessage(data.error || "Something went wrong!");
            }
        } catch (error) {
            setResponseMessage("Failed to send message.");
        }

        setLoading(false);
    };
    const [sanitizedHTML, setsanitizedhtml] = useState()
    const [sanitizedHTML2, setsanitizedhtml2] = useState()

    const [sanitizedHTML3, setsanitizedhtml3] = useState()

    const [sanitizedHTML4, setsanitizedhtml4] = useState()

    const serverurl = process.env.NEXT_PUBLIC_DJANGO_URLS;
    useEffect(() => {
        if (homeDetail?.sliders?.[0]?.title) {
            const sanitizedContent = sanitizeHTML(homeDetail.sliders[0].title);
            setsanitizedhtml(sanitizedContent);
        }

        // setsanitizedhtml(homeDetail?.sliders[0].title)
        setsanitizedhtml2(homeDetail?.sliders[0].description)
        setsanitizedhtml3(homeDetail?.sliders[0].whoIAm)
        setsanitizedhtml4(homeDetail?.sliders[0].expertise)




    }), [homeDetail]
    const sanitizeHTML = (html) => {
        // For example, using a simple replace or a proper sanitizer library
        return html.replace(/<script[^>]*>([\S\s]*?)<\/script>/g, '');
    };
    const metadata = {
        title: homeDetail.seo[0]?.metaname
            ? String(homeDetail?.seo[0].metaname)
            : "Mak Security UK | Professional Security Solutions",
        description: homeDetail.seo[0]?.metaDescription
            ? String(homeDetail.seo[0]?.metaDescription)
            : "Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.",
        keywords: homeDetail.seo[0]?.keywords
            ? String(homeDetail.seo[0]?.keywords)
            : "security services, manned guarding, CCTV surveillance, alarm response, security consultancy, UK security, property security, commercial security, event security, Mak Security UK",
        openGraph: {
            title:
                homeDetail.seo[0]?.metaname ||
                "Mak Security UK | Professional Security Solutions",
            description:
                homeDetail.seo[0]?.metaDescription || "Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.",
            url: `${serverurl} || "mak-security-uk"}`,
            images: ["/images/mak-security-logo.png"], // Replace with the actual logo or an image
        },
        twitter: {
            card: "summary_large_image",
            title:
                homeDetail.seo[0]?.metaname ||
                "Mak Security UK | Professional Security Solutions",
            description:
                homeDetail.seo[0]?.metaname || "Mak Security UK provides reliable and tailored security services, including manned guarding, CCTV surveillance, and more.",
            url: `${serverurl} || "mak-security-uk"}`,
            images: ["/Geenenict"], // Replace with the actual logo or an image
        },
    };
    return (
        <> <title>{metadata.title}</title>

            <meta name="title" content={metadata.title} />
            <meta name="description" content={metadata.description} />
            <meta name="keywords" content={metadata.keywords} />
            <meta property="og:title" content={metadata.openGraph.title} />
            <meta
                property="og:description"
                content={metadata.openGraph.description}
            />
            <meta property="og:url" content={metadata.openGraph.url} />
            <meta property="og:image" content={metadata.openGraph.images} />
            <meta name="twitter:title" content={metadata.twitter.title} />
            <meta name="twitter:description" content={metadata.twitter.description} />
            <meta name="twitter:image" content={metadata.twitter.images} />
            <div >

                <header className="bg-gradient-to-b from-gray-300 to-white py-0 px-6 flex items-center justify-between flex-wrap">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-4 mx-auto lg:mx-0">
                        <Link href="/">
                            {homeDetail?.homeDetail[0].logo ?

                                <Image

                                    src={`${homeDetail?.homeDetail[0].logo}`}
                                    alt="DigiDaal"
                                    width={56}
                                    height={56}
                                    priority
                                    className="rounded-full object-contain w-32 h-32"
                                />


                                : <span className="text-5xl font-extrabold text-[#3D4A46] tracking-tight hover:text-[#
#040414] transition duration-500 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-[#
#040414]">
                                    {homeDetail?.homeDetail[0].logoText
                                    }

                                </span>

                            }
                        </Link>
                    </div>

                    <Link
                        href="#contact"
                        className="bg-[#0063ad] text-white text-sm font-semibold px-5 py-3 rounded-md shadow-md hover:bg-[#040414] transition mt-3 xs:mt-5 sm:mt-4 lg:mt-0 md:mt-0 mx-auto md:ml-auto md:mr-0 "
                    >
                        {homeDetail?.homeDetail[0].buttonText}
                    </Link>
                </header>
                <section className="flex flex-col items-center text-center py-24 bg-gradient-to-b from-gray-200 to-white">
                    {/* Title */}

                    <H1
                        className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-700 mt-2 w-full  max-w-6xl leading-tight"
                        dangerouslySetInnerHTML={{ __html: sanitizedHTML || "Your Specialist in Cloud Security & Application Management" }} />


                    {/* Avatar Image with Glow Effect */}
                    <div className="relative mt-10">
                        <div className="w-80 h-80 md:w-72 md:h-72 rounded-full ">
                            <Image

                                src={`data:image/png;base64,${homeDetail?.sliders[0].image}`}
                                alt={homeDetail?.sliders[0].subtitle}
                                width={400}
                                height={400}
                                priority={true}
                                quality={85}
                                className="rounded-full object-cover w-full h-full"
                            />
                        </div>
                        {/* Subtle Glowing Effect */}
                        {/* <div className="absolute inset-0 w-full h-full rounded-full animate-pulse bg-orange-400 opacity-20 blur-lg"></div> */}
                    </div>





                    {/* Name and Subtitle */}
                    <H2 className="text-2xl md:text-3xl font-semibold text-[#0464af] mt-8 animate-fade-in">
                        {homeDetail && homeDetail ? homeDetail?.sliders[0].subtitle : 'Welcome to Digidaal'}   </H2>
                    <Link href="#contact">
                        <H3 className="italic text-gray-600 text-3xl font-semibold transform transition-all duration-300 hover:scale-105 hover:text-[#0464af] relative group">
                            <span className="relative z-10">
                                {homeDetail && homeDetail?.sliders[0]?.subsubtitle
                                    ? ` ${homeDetail.sliders[0].subsubtitle} `
                                    : '"Nice to meet you!'}
                            </span>

                            <span className="absolute inset-0 border-b-2 border-transparent transition-all duration-300"></span>

                            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                        </H3>
                    </Link>          </section>

                <section className="bg-[#041c5c] text-white mb-6 min-h-[50vh]">  {/* Use a fixed min-height */}
                    <div className="container max-w-full w-full mx-auto text-center py-7 px-6 bg-[#041c5c] rounded-2xl shadow-lg">
                        <div className="container max-w-full w-6xl mx-auto text-center py-2 px-6 bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-lg">

                            <H3 className="max-w-full w-full min-h-[30vh] mx-auto  text-lg leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: sanitizedHTML2 }}

                            />


                        </div>



                        <div className="grid md:grid-cols-2 gap-8   min-h-screen/2 text-left">

                            <div className="min-h-[250px] bg-gray-700 bg-opacity-50 mt-12 p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                                <div dangerouslySetInnerHTML={{ __html: sanitizedHTML3 }} />
                            </div>

                            <div className="min-h-[250px] bg-gray-700 bg-opacity-50 mt-12 p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                                <H3
                                    dangerouslySetInnerHTML={{ __html: sanitizedHTML4 }}

                                />


                            </div>
                        </div>
                    </div>
                </section>

                <div className="bg-[#041c5c] text-white py-16">
                    <H2 className="text-center text-4xl font-bold mb-12">
                        My <span className="text-[#0464af]">Services</span>
                    </H2>
                    <div className="grid grid-cols-1 max-w-full w-full  sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">

                        {homeDetail?.services.data.map((service) => (
                            <div key={service._id} className="bg-gray-800  p-6 rounded-xl shadow-lg hover:bg-[#040414] transform hover:scale-105 transition duration-300">
                                <div className="text-[#0464af] text-4xl mb-4">
                                    <Image
                                        src={`data:image/png;base64,${service.image}`}

                                        alt={service.title}
                                        width={20}
                                        height={20}
                                        loading="lazy"
                                        className="w-12 h-12" />
                                    {/* <img src={serverurl.replace('api/','')+service.image} alt={service.title} className="w-12 h-12" /> */}
                                </div>
                                <h3 className="text-xl font-semibold text-[#0464af]">
                                    {service.title}
                                </h3>
                                <div
                                    dangerouslySetInnerHTML={{ __html: service.description }}

                                />
                            </div>

                        ))}
                    </div>

                </div>

                {/* <hr className="h-px my-8 bg-red-500 border-0 dark:bg-gray-700" /> */}
                {/* <section className="bg-[#041c5c] text-white py-8 mt-2 lg:mt-8">

                    <div className="mx-auto text-center px-6 py-4 lg:py-14  rounded-lg  ">
                        <div

                            dangerouslySetInnerHTML={{ __html: homeDetail?.workmethod[0].description }}

                        />


                    </div>
                </section> */}

                <hr className="h-px my-8 bg-[#0460a3] border-0 dark:bg-gray-700" />
                <section className="py-8 bg-white">
                    <div className="max-w-6xl mx-auto text-center px-6">
                        {/* Heading */}
                        <H4 className="text-2xl font-extrabold text-gray-700 tracking-wide">
                            Companies I’m Certified By:
                        </H4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5 sm:mt-5 px-6">
                            {homeDetail?.certificate.map((certificate, index) => (
                                <div
                                    key={index}
                                    className="transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-[#0460a3] hover:text-white p-6 bg-white rounded-lg group"
                                >

                                    
<Link
  href={certificate.link !== '' ? certificate?.link : '#'}
  target={certificate.link === '' || certificate?.link.includes('/#') ? undefined : '_blank'}
  rel={certificate.link !== '' ? 'noopener noreferrer' : undefined}
>                                <div className="flex-shrink-0">
                                            <Image
                                                src={certificate?.image} // Assuming the certificate has an imageUrl field
                                                alt="certificates"
                                                width={150} // Set width of 150px
                                                height={150} // Set height of 150px
                                                loading="lazy"
                                                className="w-full max-h-72 object-contain transition-transform duration-300 ease-in-out transform hover:scale-110"
                                            />
                                        </div>
                                    </Link>
                                    {/* Certificate Title */}
                                    <strong className="text-lg text-orange-500 mt-4 block group-hover:text-white">
                                        {certificate.title}
                                    </strong>

                                    {/* Certificate Description */}
                                    <p className="mt-2 text-gray-500 hover:text-white">{certificate.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-8 bg-[#041c5c] mt-6">


                    {/* Recent Projects Title */}
                    <div className="text-white  ">
                        <H2 className="text-3xl lg:text-4xl md:text-5xl sm:text:2xl xs:tex font-extrabold tracking-tight text-center mb-0 lg:mb-10">
                            My Recent <span className="text-[#0464af]">Projects</span>
                        </H2>
                    </div>

                    {/* Project List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 sm:mt-5 px-6 hover:text-white">
                        {homeDetail?.allproject.map((project, index) => (
                            <div
                                key={index}
                                className="transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-bg-[white] hover:text-white p-6 bg-white rounded-lg group"
                            >
                                {/* Project Image */}
                                <div className="flex-shrink-0">
                                    <Image
                                        src={project.image} // Assuming the project has an imageUrl field
                                        alt={project?.title}
                                        width={150} // Set width of 150px
                                        height={150} // Set height of 150px
                                        loading="lazy"
                                        className="w-full max-h-72 hover:bg-[white] object-contain transition-transform duration-300 ease-in-out transform hover:scale-110"
                                    />
                                </div>

                                {/* Project Title */}
                                <strong className="text-lg text-[#0460a3] mt-4 block group-hover:text-[#0460a3]">
                                    {project.title}
                                </strong>

                                {/* Project Description */}
                                <p className="mt-2 text-[#040414] hover:text-#000 group-hover:text-[#040414]">{project.description}</p>
                            </div>
                        ))}
                    </div>




                </section>
                <section className="bg-[#ECEEEE] py-8">
                    <div className="max-w-2xl mx-auto text-center px-6">
                        {/* Profile Image */}
                        <div className="relative mx-auto mb-4">
                            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden">
                                {/* <img src={`data:image/png;base64,${homeDetail?.contact[0].image}`} alt="Hero Section"   className="rounded-full object-cover w-full h-full" /> */}

                                <Image
                                    src={`${homeDetail?.contact[0].image}`}

                                    // src={serverurl.replace('/api', '') + homeDetail?.contact[0].image}
                                    alt="Brayner Daal"
                                    width={1000}
                                    height={1000}
                                    loading="lazy"
                                    className="rounded-full object-cover w-full h-full"
                                />

                            </div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 bg-orange-500 rounded-full -z-10"></div>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl italic text-gray-700 font-serif">
                            {homeDetail?.contact[0].title}

                        </h2>
                        {/* Form */}
                        <form onSubmit={handleSubmit} className="mt-8" id="contact">
                            {/* Name Fields */}
                            <div className="text-left mb-5">
                                <label className="text-gray-700 text-sm font-semibold">
                                    Name <span className="text-gray-500 text-xs">(required)</span>
                                </label>
                                <div className="flex gap-4 mt-1">
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="First Name"
                                        className="w-1/2 px-4 py-2 border border-gray-400 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        required
                                    />

                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Last Name"
                                        className="w-1/2 px-4 py-2 border border-gray-400 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="text-left mb-5">
                                <label className="text-gray-700 text-sm font-semibold">
                                    Email <span className="text-gray-500 text-xs">(required)</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    className="w-full px-4 py-2 mt-1 border border-gray-400 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>

                            {/* Message */}
                            <div className="text-left mb-6">
                                <label className="text-gray-700 text-sm font-semibold">
                                    Message <span className="text-gray-500 text-xs">(required)</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your Message"
                                    className="w-full px-4 py-2 mt-1 h-28 border border-gray-400 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[#0063ad]  text-white font-semibold text-lg py-3 px-6 rounded-md hover:bg-[#040414] transition"
                                >
                                    {loading ? "Sending..." : "Start your project!"}
                                </button>
                            </div>

                            {/* Response Message */}
                            {responseMessage && (
                                <p className="text-center mt-4 text-sm text-gray-700">{responseMessage}</p>
                            )}
                        </form>
                    </div>
                </section>

                <footer className="bg-[#041c5c] text-white text-center py-12">
                    <div className="max-w-6xl mx-auto px-6">
                        {/* Quote */}
                        <p className="italic text-xl text-gray-300 mb-6">
                            {homeDetail?.footer.data.title}
                        </p>

                        {/* Address */}
                        <div className="mt-6 text-gray-300 text-sm">
                            <p>    {homeDetail?.footer.data.address.slice(0, 15)}
                            </p>
                            <p>    {homeDetail?.footer.data.address.slice(15, 34)}
                            </p>
                            <p>    {homeDetail?.footer.data.address.slice(34, 60)}
                            </p>
                            <p>    {homeDetail?.footer.data.address.slice(60, 80)}
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="mt-6 text-gray-300 text-sm text-center flex flex-col items-center space-y-3">
                            {homeDetail?.footer?.data?.subtitle && (
                                <p><strong>{homeDetail.footer.data.subtitle}</strong></p>
                            )}

                            <div className="flex flex-col items-center space-y-3">

                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-3 sm:space-y-0">
                                    {homeDetail?.footer?.data?.email && (
                                        <Link
                                            href={`mailto:${homeDetail.footer.data.email}`}
                                            className="flex items-center space-x-2 text-white hover:text-blue-400 transition duration-300"
                                        >
                                            <MdEmail className="text-xl" />
                                            <span>{homeDetail.footer.data.email}</span>
                                        </Link>
                                    )}

                                    {homeDetail?.footer?.data?.phone && (
                                        <Link
                                            href={`tel:${homeDetail.footer.data.phone}`}
                                            className="flex items-center space-x-2 text-white hover:text-green-400 transition duration-300"
                                        >
                                            <BsPhoneFill className="text-xl" />
                                            <span>{homeDetail.footer.data.phone}</span>
                                        </Link>
                                    )}

                                    {homeDetail?.footer?.data?.linkedin && (
                                        <Link
                                            href={homeDetail.footer.data.linkedin}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            className="flex items-center space-x-2 text-white hover:text-blue-500 transition duration-300"
                                        >
                                            <FaLinkedin className="text-xl" />
                                            <span>LinkedIn</span>
                                        </Link>
                                    )}
                                </div>
                            </div>
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
                            <p><strong>KvK:</strong> {homeDetail?.footer.data.kvk} | <strong>BTW:</strong> {homeDetail?.footer.data.btw}</p>
                        </div>

                        {/* Copyright */}
                        <div className="mt-4 text-gray-400 text-xs">
                            <p>{homeDetail?.footer.data.copyright} <Link href="https://plenbright.com/" className="text-[#498f96] font-extrabold hover:underline"> Plenbright B.V.</Link></p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
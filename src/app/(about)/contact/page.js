import ContactForm from "@/src/components/Contact/ContactForm";
import LottieAnimation from "@/src/components/Contact/LottieAnimation";
import siteMetadata from "@/src/utils/siteMetaData";


export const metadata = {
  title: "Contact Me",
  description: `Contact me through the form available on this page or email me at ${siteMetadata.email}`,
};



export default function About() {
  return (
    <>
    <ContactForm />
    </>
  );
}


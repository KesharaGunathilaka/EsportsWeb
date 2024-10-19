import HeaderC from '../Components/HeaderC/HeaderC';
import FooterC from '../Components/FooterC/FooterC';

function AboutUs() {
  return (
    <div>
      <HeaderC />
      <div className="bg-background text-white text-lg font-sidebar p-6 md:p-8 lg:p-10">
        <h1 className="text-3xl font-bold font-title mb-6 md:text-4xl">About Us</h1>
        <p className="mb-4 text-base md:text-lg">
          Knights Gaming Community (KGC) is a vibrant hub for passionate gamers. Our mission is to bring together gamers from all corners of the world to engage in epic battles, exchange knowledge, and form lasting connections.
        </p>
        <p className="mb-4 text-base md:text-lg">
          Whether you&apos;re into competitive gaming, casual play, or streaming your best moments, KGC is the place for you. With a focus on inclusivity, we provide a space for gamers of all skill levels and backgrounds.
        </p>
        <div className="mt-8">
          <h1 className="text-2xl font-bold font-title mb-6 md:text-3xl">Our Values</h1>
          <ul className="list-disc list-inside ml-8 text-white space-y-2 text-base md:text-lg">
            <li>Community-first approach</li>
            <li>Fair play and sportsmanship</li>
            <li>Innovation in gaming events</li>
            <li>
              Our website showcases a variety of games and their details, including upcoming games and esports competitions. Users can:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>Create and read blogs</li>
                <li>Gain knowledge about games</li>
                <li>Stay updated on major upcoming gaming events</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <FooterC />
    </div>
  );
}

export default AboutUs;

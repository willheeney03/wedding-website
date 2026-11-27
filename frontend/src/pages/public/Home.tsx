import PhotoboothScroll from '../../components/public/PhotoboothScroll';

export function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Photobooth Scroll Section */}
      <section className="w-full py-16">
        <PhotoboothScroll delay={0.8} duration={3}>
          <h2 className="font-serif text-3xl">We're getting married!</h2>
        </PhotoboothScroll>
      </section>
    </div>
  );
}
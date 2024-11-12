import Image from "next/image";

const ImagesShow = ({ images, imageAlt }) => {
  return (
    <section className="bg-gray-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt={imageAlt}
            width={1800}
            height={400}
            sizes="100vw"
            className="mx-auto h-[400px] object-cover rounded-xl"
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`${
                  images.length === 3 && index === 2
                    ? "col-span-2"
                    : "col-span-1"
                }`}
              >
                <Image
                  src={image}
                  alt={imageAlt}
                  width={1800}
                  height={400}
                  sizes="100vw"
                  className="mx-auto h-[400px] object-cover rounded-xl w-full  "
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImagesShow;

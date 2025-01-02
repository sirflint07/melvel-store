import ReviewCard from './ReviewCard';

const Reviews = () => {
  return (
    <div className="w-[100vw] bg-blue-300 py-2 bg-opacity-10 max-md:mt-8 mx-auto pt-4">
      <h2 className="text-4xl text-center font-bold max-lg:mt-16 max-lg:mb-8 lg:mb-10 poppins-black">
        Client{"'s"} <span className="text-orangey">Reviews</span>
      </h2>

      {/* Render the ReviewCard component directly without extra div wrappers */}
      <ReviewCard />
    </div>
  );
};

export default Reviews;
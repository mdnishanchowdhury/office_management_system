import { Parallax } from 'react-parallax';

function SectionCover({ bgImage, subHeading, heading }) {
    return (
        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage={bgImage}
            bgImageAlt="section background"
            strength={-200}
        >
            <div className="hero h-[600px] lg:min-h-[800px]">
                <div className="hero-content text-neutral-content text-center bg-[#15151599] h-[300px] lg:h-[450px] flex items-center justify-center px-6 md:px-[100px] lg:px-[300px]">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-4xl md:text-6xl lg:text-7xl font-bold">
                            {heading}
                        </h1>
                        <p className="mb-5 text-xl md:text-2xl font-semibold">
                            {subHeading}
                        </p>
                    </div>
                </div>
            </div>
        </Parallax>
    );
}

export default SectionCover;
